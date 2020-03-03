import { Bindable } from "./Bindable";
import { Operator } from "./Operator";


export type Handler<T, U> = Handler.PropsFromArgs<T, U> & Handler.PropsFromMethodName & Readonly<{
    detach(): boolean;
    promise: Promise<U>;
}>;

export namespace Handler {

    /** Handlers params that come from the arguments passed to the method invoked */
    export type PropsFromArgs<T, U> = {
        boundTo: Bindable;
        timeout: number | undefined;
        op: Operator<T, U>;
        callback: ((transformedData: U) => void) | undefined;
    };

    /** Handlers params that are implicitly specified by the method used: 
     * attachOnce => once
     * attachOncePrepend => once + prepend
     * waitFor => once + async
     * ...
     */
    export type PropsFromMethodName = PropsFromMethodName.Sync | PropsFromMethodName.Async;

    export namespace PropsFromMethodName {

        type Common = Readonly<{
            prepend: boolean;
            extract: boolean;
        }>;

        export type Sync = Common & Readonly<{
            async: false;
            once: boolean;
        }>;

        export type Async = Common & Readonly<{
            async: true;
            once: true;
        }>;


    }

}