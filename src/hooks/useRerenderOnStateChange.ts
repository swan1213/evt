import { useEvt } from "./useEvt";
import * as React from "react";
const { useState } = React;

type CtxLike<Result = any> = import("../lib/types/interfaces/CtxLike").CtxLike<Result>;

interface StatefulReadonlyEvtLike {
    state: unknown;
    attach: (ctx: CtxLike, cb: (state: unknown)=> void)=> void;
};

/**
 * https://docs.evt.land/api/react-hooks
 * 
 * To use StatefulEvt as react component state.
 * */
export function useRerenderOnStateChange(evt: StatefulReadonlyEvtLike): void {

    const [,setState]=useState(evt.state);

    useEvt(
        ctx =>
            evt.attach(ctx, state => setState(state)),
        [evt]
    );
}
