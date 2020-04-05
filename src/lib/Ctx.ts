import { Polyfill as Set } from "minimal-polyfills/dist/lib/Set";
import { Polyfill as WeakMap } from "minimal-polyfills/dist/lib/WeakMap";
import { assert } from "../tools/typeSafety/assert";
import { typeGuard } from "../tools/typeSafety/typeGuard";
import { LazyEvtFactory } from "./util/LazyEvtFactory";
import { importProxy } from "./importProxy";
import /*type*/ { Handler } from "./types/Handler";
import { defineAccessors } from "../tools/defineAccessors";
import { id } from "../tools/typeSafety/id";

type EvtLike<T> = import("./Evt").EvtLike<T>;
type Evt<T> = import("./Evt").Evt<T>;

export interface CtxLike<Result = any> {
    done(result: Result): void;
    abort(error: Error): void;
    zz__addHandler<T>(handler: Handler<T, any, CtxLike<Result>>, evt: EvtLike<T>): void;
    zz__removeHandler<T>(handler: Handler<T, any, CtxLike<Result>>): void;
}

/** https://docs.evt.land/api/ctx */
export class Ctx<Result> implements CtxLike<Result>{





    /** https://docs.evt.land/api/ctx#ctx-evtdoneoraborted */
    declare public readonly evtDoneOrAborted: Evt<Ctx.DoneOrAborted<Result>>;

    /** 
     * https://docs.evt.land/api/ctx#ctx-evtattach
     * 
     * Posted every time a handler is bound to this context 
     * */
    declare public readonly evtAttach: Evt<Handler.WithEvt<any, Result>>;

    /** 
     * https://docs.evt.land/api/ctx#ctx-evtdetach
     * 
     * Posted every time a handler bound to this context is detached from it's Evt 
     * */
    declare public readonly evtDetach: Evt<Handler.WithEvt<any, Result>>;


    private lazyEvtAttachFactory = new LazyEvtFactory<Handler.WithEvt<any, Result>>();
    private lazyEvtDetachFactory = new LazyEvtFactory<Handler.WithEvt<any, Result>>();
    private lazyEvtDoneOrAbortedFactory = new LazyEvtFactory<Ctx.DoneOrAborted<Result>>();

    private onDoneOrAborted(doneEvtData: Ctx.DoneOrAborted<Result>): void {
        this.lazyEvtDoneOrAbortedFactory.post(doneEvtData);
    }

    private onHandler(isAttach: boolean, handler: Handler.WithEvt<any, Result>): void {
        isAttach ?
            this.lazyEvtAttachFactory.post(handler) :
            this.lazyEvtDetachFactory.post(handler)
            ;
    }


    private static __1: void = (() => {

        if (false) { Ctx.__1 }

        defineAccessors(
            Ctx.prototype,
            "evtDoneOrAborted",
            {
                "get": function () {
                    return id<Ctx<any>>(this).lazyEvtDoneOrAbortedFactory.getEvt();
                }
            }
        );

        defineAccessors(
            Ctx.prototype,
            "evtAttach",
            {
                "get": function () {
                    return id<Ctx<any>>(this).lazyEvtAttachFactory.getEvt();
                }
            }
        );

        defineAccessors(
            Ctx.prototype,
            "evtDetach",
            {
                "get": function () {
                    return id<Ctx<any>>(this).lazyEvtDetachFactory.getEvt();
                }
            }
        );




    })();

    /** 
     * https://docs.evt.land/api/ctx#ctx-waitfor-timeout 
     * 
     * Return a promise that resolve next time ctx.done(result) is invoked
     * Reject if ctx.abort(error) is invoked.
     * Optionally a timeout can be passed, if so the returned promise will reject 
     * with EvtError.Timeout if done(result) is not called within [timeout]ms.
     * If the timeout is reached ctx.abort(timeoutError) will be invoked.
     */
    public waitFor(timeout?: number): Promise<Result> {
        return this.evtDoneOrAborted
            .waitFor(timeout)
            .then(
                data => {
                    if (data.type === "ABORTED") {
                        throw data.error;
                    }
                    return data.result;
                },
                timeoutError => {
                    this.abort(timeoutError);
                    throw timeoutError;
                }
            )
            ;
    }


    /** 
     * https://docs.evt.land/api/ctx#ctx-abort-error
     * 
     * All the handler will be detached.
     * evtDone will post [ error, undefined, handlers (detached) ]
     * if getPrDone() was invoked the promise will reject with the error
     */
    public abort(error: Error) {
        return this.__done(error);
    }

    /**
     * https://docs.evt.land/api/ctx#ctx-done-result
     * 
     * Detach all handlers.
     * evtDone will post [ null, result, handlers (detached) ]
     * If getPrDone() was invoked the promise will result with result
     */
    public done(result: Result) {
        return this.__done(undefined, result);
    }

    /** Detach all handler bound to this context from theirs respective Evt and post getEvtDone() */
    private __done(error: Error | undefined, result?: Result): Handler.WithEvt<any, Result>[] {

        const handlers: Handler.WithEvt<any, Result>[] = [];

        for (const handler of this.handlers.values()) {

            const evt = this.evtByHandler.get(handler)!;

            const wasStillAttached = handler.detach();

            //NOTE: It should not be possible
            if (!wasStillAttached) {
                continue;
            }

            handlers.push({ handler, evt });
        }

        this.onDoneOrAborted({
            ...(!!error ?
                { type: "ABORTED", error } :
                { type: "DONE", "result": result as NonNullable<typeof result> }
            ),
            handlers
        });


        return handlers;

    }

    private handlers = new Set<
        Handler<any, any, Ctx<Result>>
    >();
    private evtByHandler = new WeakMap<
        Handler<any, any, Ctx<Result>>,
        EvtLike<any>
    >();

    /** https://docs.evt.land/api/ctx#ctx-gethandlers */
    public getHandlers(): Handler.WithEvt<any, Result>[] {
        return Array.from(this.handlers.values())
            .map(handler => ({ handler, "evt": this.evtByHandler.get(handler)! }))
            ;
    }


    /** 
     * Exposed to enable safe interoperability between mismatching EVT versions. 
     * Should be considered private
     * */
    public zz__addHandler<T>(
        handler: Handler<T, any, CtxLike<Result>>,
        evt: EvtLike<T>
    ) {
        assert(handler.ctx === this);
        assert(typeGuard<Handler<T, any, Ctx<Result>>>(handler));
        this.handlers.add(handler);
        this.evtByHandler.set(handler, evt);
        this.onHandler(true, { handler, evt });
    }

    /** 
     * Exposed to enable safe interoperability between EVT versions. 
     * Should be considered private
     * */
    public zz__removeHandler<T>(
        handler: Handler<T, any, CtxLike<Result>>,
    ) {
        assert(handler.ctx === this);
        assert(typeGuard<Handler<T, any, Ctx<Result>>>(handler));

        this.onHandler(false, { handler, "evt": this.evtByHandler.get(handler)! });
        this.handlers.delete(handler);
    }

}

export namespace Ctx {
    export type DoneOrAborted<Result> = DoneOrAborted.Done<Result> | DoneOrAborted.Aborted<Result>;

    export namespace DoneOrAborted {

        type Common<Result> = {
            handlers: Handler.WithEvt<any, Result>[];
        }

        export type Done<Result> = Common<Result> & {
            type: "DONE";
            result: Result;
            error?: undefined;
        };

        export type Aborted<Result> = Common<Result> & {
            type: "ABORTED";
            error: Error;
            result?: undefined;
        };




    }
}

importProxy.Ctx = Ctx;

export interface VoidCtxLike extends CtxLike<void> {
    done(): void;
}

/** https://docs.evt.land/api/ctx */
export class VoidCtx extends Ctx<void> implements VoidCtxLike {

    /**
     * Detach all handlers.
     * evtDone will post [ null, undefined, handlers (detached) ]
     * If getPrDone() was invoked the promise will resolve
     */
    public done(): Handler.WithEvt<any, void>[] {
        return super.done(undefined);
    }

}

importProxy.VoidCtx = VoidCtx;
