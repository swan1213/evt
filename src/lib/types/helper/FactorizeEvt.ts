
import { SwapEvtType } from "./SwapEvtType";
import { UnpackEvt } from "./UnpackEvt";
import type { EvtLike } from "./UnpackEvt";

/** https://docs.evt.land/api/helpertypes#swapevttype-less-than-e-t-greater-than */
export type FactorizeEvt<E extends EvtLike<any>> = SwapEvtType<E, UnpackEvt<E>>;

