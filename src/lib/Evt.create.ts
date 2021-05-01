
import { importProxy } from "./importProxy";
import type { Evt, StatefulEvt } from "./types";

/** 
 * https://docs.evt.land/api/evt/create
 * Return a new Evt<T> instance.
 */
export function create<T = void>(): Evt<T>;
/** 
 * https://docs.evt.land/api/evt/create
 * Return a new StatefulEvt<T> instance.
 */
export function create<T>(initialState: T): StatefulEvt<T>;
export function create(...args: [] | [any] ): Evt<any> | StatefulEvt<any> {
    return args.length === 0 ? 
        new importProxy.Evt() : 
        new importProxy.StatefulEvt(args[0])
        ;
}