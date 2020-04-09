
type Evt<T> = import("./Evt").Evt<T>;
type Void = import("./Void").Void;


/** 
 * https://docs.evt.land/api/evt/create#why-voidevt-and-not-evt-less-than-void-greater-than 
 * https://docs.evt.land/api/evt/create
 * 
 * This is only an interface, not a class.
 * get an instance using Evt.create()
 * */
export interface VoidEvt extends Evt<Void> {
    post(): number;
    postAsyncOnceHandled(): Promise<number>;
};