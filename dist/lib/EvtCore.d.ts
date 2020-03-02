import "minimal-polyfills/dist/lib/Array.prototype.find";
import { Bindable, Handler, $Matcher } from "./types";
/** Evt without evtAttach property, attachOnceMatched, createDelegate and without overload */
export declare class EvtCore<T> {
    /** https://garronej.github.io/ts-evt/#evtpostcount */
    readonly postCount: number;
    private incrementPostCount;
    private traceId;
    private traceFormatter;
    private log;
    /** https://garronej.github.io/ts-evt/#evtenabletrace */
    enableTrace(id: string, formatter?: (data: T) => string, log?: (message?: any, ...optionalParams: any[]) => void): void;
    /** https://garronej.github.io/ts-evt/#evtenabletrace */
    disableTrace(): void;
    private readonly handlers;
    private readonly handlerTriggers;
    private readonly asyncHandlerChronologyMark;
    private readonly asyncHandlerChronologyExceptionRange;
    private readonly getChronologyMark;
    private readonly previousDadaOfStateful$Matchers;
    protected onHandlerAdded(handler: Handler<T, any>): void;
    private addHandler;
    private trace;
    /**
     * https://garronej.github.io/ts-evt/#evtattach-evtattachonce-and-evtpost
     *
     * Returns post count
     * */
    post(data: T): number;
    /** If the matcher is not $ then the transformedData will be the input data */
    protected invokeMatcher<U>(matcher: $Matcher<T, U> | ((data: T) => boolean), data: T, cbInvokedIfMatched?: true): $Matcher.Result<T | U>;
    /** Return isExtracted */
    private postSync;
    private readonly postAsync;
    protected __waitFor<U>(attachParams: Handler.PropsFromArgs<T, U>): Promise<U>;
    protected __attach<U>(attachParams: Handler.PropsFromArgs<T, U>): Promise<U>;
    protected __attachExtract<U>(attachParams: Handler.PropsFromArgs<T, U>): Promise<U>;
    protected __attachPrepend<U>(attachParams: Handler.PropsFromArgs<T, U>): Promise<U>;
    protected __attachOnce<U>(attachParams: Handler.PropsFromArgs<T, U>): Promise<U>;
    protected __attachOncePrepend<U>(attachParams: Handler.PropsFromArgs<T, U>): Promise<U>;
    protected __attachOnceExtract<U>(attachParams: Handler.PropsFromArgs<T, U>): Promise<U>;
    /**
     * https://garronej.github.io/ts-evt/#evtishandleddata
     *
     * Test if posting a given event data will have an effect.
     *
     * Return true if:
     * -There is at least one handler matching
     * this event data ( at least one handler's callback function
     * will be invoked if the data is posted. )
     * -There is at least one handler that will be detached
     * if the event data is posted.
     *
     */
    isHandled(data: T): boolean;
    /** https://garronej.github.io/ts-evt/#evtgethandlers */
    getHandlers(): Handler<T, any>[];
    protected onHandlerDetached(handler: Handler<T, any>): void;
    /** Detach every handler bound to a given object or all handlers, return the detached handlers */
    detach(boundTo?: Bindable): Handler<T, any>[];
}