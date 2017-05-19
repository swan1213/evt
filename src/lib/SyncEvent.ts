import { EventEmitter as NodeJS_EventEmitter } from "events";
import { execQueue } from "ts-exec-queue";

export interface Postable<T> {
    post(data: T): void;
}

export type AttachParams<T>= {
        matcher(data: T): boolean;
        boundTo: Object;
        handler(data: T):void;
}


export class SyncEvent<T> {

    private static readonly defaultEvtMatcher = () => true;

    public postCount = 0;

    public readonly evtAttach: SyncEvent<
    "attach" | "attachOnce" | "waitFor" | "attachExtract" | "attachOnceExtract" | "waitForExtract"
    >;

    private readonly callbackHandlers: (AttachParams<T> & { once: boolean; extract: boolean; })[] = [];

    private readonly promiseHandlers: {
        matcher: AttachParams<T>['matcher'];
        timer: NodeJS.Timer | undefined;
        resolve: AttachParams<T>['handler'];
        extract: boolean;
    }[] = [];

    public stopWaiting(): void {

        for (let { timer } of this.promiseHandlers)
            if (timer) clearTimeout(timer);

        this.promiseHandlers.splice(0, this.promiseHandlers.length)

    }


    public get handlerCount(): number {
        return this.callbackHandlers.length + this.promiseHandlers.length;
    }

    public get waiterCount(): number {
        return this.promiseHandlers.length;
    }

    public get permanentHandlerCount(): number {

        return this.callbackHandlers.filter( ({ once }) => !once ).length;

    }

    public get onceHandlerCount(): number {

        return this.callbackHandlers.length - this.permanentHandlerCount;

    }

    constructor() {

        if (arguments.length === 0)
            this.evtAttach = new (SyncEvent as any)("no recursion");

    }





    public createProxy<Q extends T>(matcher: (data: T) => data is Q): SyncEvent<Q>;
    public createProxy(matcher?: (data: T) => boolean): SyncEvent<T>;
    public createProxy(matcher?: (data: T) => boolean): SyncEvent<any> {

        return this.__createProxy__(matcher, false);

    }

    public createProxyExtract<Q extends T>(matcher: (data: T) => data is Q): SyncEvent<Q>;
    public createProxyExtract(matcher?: (data: T) => boolean): SyncEvent<T>;
    public createProxyExtract(matcher?: (data: T) => boolean): SyncEvent<any> {

        return this.__createProxy__(matcher, true);

    }

    private __createProxy__(
        matcher: ((data: T) => boolean )| undefined,
        extract: boolean
    ): SyncEvent<any> {

        matcher = matcher || SyncEvent.defaultEvtMatcher;

        let evt = new SyncEvent<any>();

        if( extract ) this.attachExtract(matcher, evt);
        else this.attach(matcher, evt);

        return evt;


    }




    public waitFor<Q extends T>(matcher: (data: T) => data is Q, timeout?: number): Promise<Q>;
    public waitFor(timeout?: number): Promise<T>;
    public waitFor(matcher: (data: T) => boolean, timeout?: number): Promise<T>;
    public waitFor(...inputs: any[]): Promise<any> {

        return this.__waitFor__(inputs, false);

    }

    public waitForExtract<Q extends T>(matcher: (data: T) => data is Q, timeout?: number): Promise<Q>;
    public waitForExtract(timeout?: number): Promise<T>;
    public waitForExtract(matcher: (data: T) => boolean, timeout?: number): Promise<T>;
    public waitForExtract(...inputs: any[]): Promise<any> {

        return this.__waitFor__(inputs, true);

    }


    private readWaitForParams(inputs: any[]): { matcher: AttachParams<T>['matcher']; timeout: number | undefined } {

        inputs = inputs.filter(v => v);

        if (inputs.length === 0)
            return { "matcher": SyncEvent.defaultEvtMatcher, "timeout": undefined }
        else if (inputs.length === 1 && typeof inputs[0] === "number")
            return { "matcher": SyncEvent.defaultEvtMatcher, "timeout": inputs[0] }
        else if (inputs.length === 1)
            return { "matcher": inputs[0], "timeout": undefined }
        else
            return { "matcher": inputs[0], "timeout": inputs[1] };

    }

    private __waitFor__(inputs: any[], extract: boolean): Promise<any> {

        return new Promise<any>((resolve, reject) => {

            let { matcher, timeout } = this.readWaitForParams(inputs);

            let timer: NodeJS.Timer | undefined = undefined;

            if (timeout) {

                timer = setTimeout(() => {

                    let index = this.promiseHandlers.indexOf(promiseHandler);

                    this.promiseHandlers.splice(index, 1);

                    reject(new Error(`waitFor() timeout after ${timeout} ms`));

                }, timeout);

            }

            let promiseHandler = { matcher, timer, resolve, extract };

            this.promiseHandlers.push(promiseHandler);

            if (!this.evtAttach) return;

            this.evtAttach.post("waitFor" + extract?"Extract":"" as any);

        });


    }









    public attachOnce<Q extends T>(matcher: (data: T) => data is Q, handler: (data: Q) => void): void;
    public attachOnce<Q extends T>(matcher: (data: T) => data is Q, boundTo: Object, handler: (data: Q) => void): void;
    public attachOnce<Q extends T>(matcher: (data: T) => data is Q, event: Postable<Q>): void;

    public attachOnce(event: Postable<T>): void; //1 Post
    public attachOnce(handler: (data: T) => void): void; //1 Function

    public attachOnce(matcher: (data: T) => boolean, event: Postable<T>): void; //2 Function Post
    public attachOnce(matcher: (data: T) => boolean, handler: (data: T) => void): void; //2 Function Function
    public attachOnce(boundTo: Object, handler: (data: T) => void): void; //2 any Function

    public attachOnce(matcher: (data: T) => boolean, boundTo: Object, handler: (data: T) => void): void; //3


    public attachOnce(...inputs: any[]): any {

        this.__attach__(inputs, true, false);

    }



    public attacheOnceExtract<Q extends T>(matcher: (data: T) => data is Q, handler: (data: Q) => void): void;
    public attacheOnceExtract<Q extends T>(matcher: (data: T) => data is Q, boundTo: Object, handler: (data: Q) => void): void;
    public attacheOnceExtract<Q extends T>(matcher: (data: T) => data is Q, event: Postable<Q>): void;

    public attacheOnceExtract(event: Postable<T>): void; //1 Post
    public attacheOnceExtract(handler: (data: T) => void): void; //1 Function

    public attacheOnceExtract(matcher: (data: T) => boolean, event: Postable<T>): void; //2 Function Post
    public attacheOnceExtract(matcher: (data: T) => boolean, handler: (data: T) => void): void; //2 Function Function
    public attacheOnceExtract(boundTo: Object, handler: (data: T) => void): void; //2 any Function

    public attacheOnceExtract(matcher: (data: T) => boolean, boundTo: Object, handler: (data: T) => void): void; //3


    public attacheOnceExtract(...inputs: any[]): any {

        this.__attach__(inputs, true, true);

    }



    public attach<Q extends T>(matcher: (data: T) => data is Q, handler: (data: Q) => void): void;
    public attach<Q extends T>(matcher: (data: T) => data is Q, boundTo: Object, handler: (data: Q) => void): void;
    public attach<Q extends T>(matcher: (data: T) => data is Q, event: Postable<Q>): void;

    public attach(event: Postable<T>): void; //1 Post
    public attach(handler: (data: T) => void): void; //1 Function

    public attach(matcher: (data: T) => boolean, event: Postable<T>): void; //2 Function Post
    public attach(matcher: (data: T) => boolean, handler: (data: T) => void): void; //2 Function Function
    public attach(boundTo: Object, handler: (data: T) => void): void; //2 any Function

    public attach(matcher: (data: T) => boolean, boundTo: Object, handler: (data: T) => void): void; //3


    public attach(...inputs: any[]): any {

        this.__attach__(inputs, false, false);

    }


    public attachExtract<Q extends T>(matcher: (data: T) => data is Q, handler: (data: Q) => void): void;
    public attachExtract<Q extends T>(matcher: (data: T) => data is Q, boundTo: Object, handler: (data: Q) => void): void;
    public attachExtract<Q extends T>(matcher: (data: T) => data is Q, event: Postable<Q>): void;

    public attachExtract(event: Postable<T>): void; //1 Post
    public attachExtract(handler: (data: T) => void): void; //1 Function

    public attachExtract(matcher: (data: T) => boolean, event: Postable<T>): void; //2 Function Post
    public attachExtract(matcher: (data: T) => boolean, handler: (data: T) => void): void; //2 Function Function
    public attachExtract(boundTo: Object, handler: (data: T) => void): void; //2 any Function

    public attachExtract(matcher: (data: T) => boolean, boundTo: Object, handler: (data: T) => void): void; //3


    public attachExtract(...inputs: any[]): any {

        this.__attach__(inputs, false, true);

    }

    private readAttachParams(inputs: any[]): AttachParams<T> {


        let outAsArray: [
            AttachParams<T>['matcher'],
            AttachParams<T>['boundTo'],
            AttachParams<T>['handler']
        ] | undefined = undefined;


        if (
            inputs.length === 1 &&
            (
                inputs[0] instanceof Object &&
                typeof inputs[0].post === "function"
            )
        ) outAsArray = [
            SyncEvent.defaultEvtMatcher,
            inputs[0],
            inputs[0].post
        ]
        else if (
            inputs.length === 1
        ) outAsArray = [
            SyncEvent.defaultEvtMatcher,
            this,
            inputs[0]
        ]
        else if (
            inputs.length === 2 &&
            (
                inputs[1] instanceof Object &&
                typeof inputs[1].post === "function"
            )
        ) outAsArray = [
            inputs[0],
            inputs[1],
            inputs[1].post
        ]
        else if (
            inputs.length === 2 &&
            typeof inputs[0] === "function"
        ) outAsArray = [
            inputs[0],
            this,
            inputs[1]
        ]
        else if (
            inputs.length === 2
        ) outAsArray = [
            SyncEvent.defaultEvtMatcher,
            inputs[0],
            inputs[1]
        ]
        else if (
            inputs.length === 3
        ) outAsArray = [
            inputs[0],
            inputs[1],
            inputs[2]
        ];

        let [matcher, boundTo, handler] = outAsArray!;

        return { matcher, boundTo, handler };

    }

    private __attach__(
        inputs: any[],
        once: boolean,
        extract: boolean
    ): void {

        let { matcher, boundTo, handler } = this.readAttachParams(inputs);

        this.callbackHandlers.push({ matcher, boundTo, handler, once, extract });

        if (!this.evtAttach) return;

        this.evtAttach.post("attach" + once?"Once":"" + extract?"Extract":"" as any);

    }



    private readDetachParams(inputs: any[]): Partial<AttachParams<T>> {

        if (
            inputs.length === 0
        ) return {};
        else if (
            inputs.length === 1 &&
            (
                inputs[0] instanceof Object &&
                typeof inputs[0].post === "function"
            )
        ) return { "boundTo": inputs[0], "handler": inputs[0].post }
        else if (
            inputs.length === 1 &&
            (
                inputs[0].hasOwnProperty("matcher") ||
                inputs[0].hasOwnProperty("boundTo") ||
                inputs[0].hasOwnProperty("handler")
            )
        ) {

            let out: Partial<AttachParams<T>> = {};

            if (inputs[0].hasOwnProperty("matcher"))
                out.matcher = inputs[0].matcher;

            if (inputs[0].hasOwnProperty("boundTo"))
                out.boundTo = inputs[0].boundTo;

            if (inputs[0].hasOwnProperty("handler"))
                out.handler = inputs[0].handler;

            return out;

        } else if (
            inputs.length === 1 &&
            typeof inputs[0] !== "function"
        ) return { "boundTo": inputs[0] }
        else if (
            inputs.length === 1
        ) return { "handler": inputs[0] }
        else if (
            inputs.length === 2
        ) return { "boundTo": inputs[0], "handler": inputs[1] };


        return null as any;

    }




    public detach(): void; //0

    public detach(event: Postable<T>): void; //1
    public detach(by: Partial<AttachParams<T>>): void; //1
    public detach(boundTo: Object): void; //1
    public detach(handler: (data: T) => void): void; //1

    public detach(boundTo: Object, handler: (data: T) => void): void; //2
    public detach(...inputs: any[]): void {

        let by = this.readDetachParams(inputs);

        [ ...this.callbackHandlers ].forEach( ({matcher, boundTo, handler}, index)=>{

            if (
                (by.hasOwnProperty("matcher") ? (by.matcher === matcher) : true) &&
                (by.hasOwnProperty("boundTo") ? (by.boundTo === boundTo) : true) &&
                (by.hasOwnProperty("handler") ? (by.handler === handler) : true)
            ) this.callbackHandlers.splice(index, 1);


        });

        if (!Object.keys(by).length) this.stopWaiting();


    }

    public post(data: T): void {

        this.postCount++;

        this.postPromise(data);


    }


    private postPromise = execQueue(
        (data: T, callback?: () => void) => {

            let match_run_detach = (index: number, promiseHandler: typeof SyncEvent.prototype.promiseHandlers[number]) => {

                let { matcher, timer, resolve } = promiseHandler;

                if (!matcher(data)) return false;

                if (timer) clearTimeout(timer);

                this.promiseHandlers.splice(index, 1);

                resolve(data);

                return true;

            };

            let extracted = false;

            [...this.promiseHandlers].forEach((promiseHandler, index) => {

                if (!promiseHandler.extract) return;

                extracted = match_run_detach(index, promiseHandler);

            });

            let matched= extracted;

            if (!extracted) {

                [...this.promiseHandlers].forEach((promiseHandler, index) => {

                    if (promiseHandler.extract) return;

                    matched = match_run_detach(index, promiseHandler);

                });

                this.postCallback(data);

            }

            if (matched) setImmediate( ()=> callback!());
            else callback!();

        }
    );


    private postCallback(data: T) {

        let match_run_detach= (index: number, callbackHandler: typeof SyncEvent.prototype.callbackHandlers[number] ): boolean=> {

            let { matcher, boundTo, handler, once } = callbackHandler;

            if (!matcher(data)) return false;

            if ( once ) this.callbackHandlers.splice(index, 1);

            handler.call(boundTo, data);

            return true;

        }


        let extracted = false;

        [ ...this.callbackHandlers ].forEach( (callbackHandler, index)=> {

            if( !callbackHandler.extract ) return;

            extracted= match_run_detach(index, callbackHandler);

        });

        if( extracted ) return;

        [ ...this.callbackHandlers ].forEach( (callbackHandler, index)=> {

            if( callbackHandler.extract ) return;

            match_run_detach(index, callbackHandler);

        });

    }


}

export class VoidSyncEvent extends SyncEvent<void> {
    public post(): void {
        super.post(undefined);
    }
}