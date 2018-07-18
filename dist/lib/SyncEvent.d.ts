import { SyncEventBase } from "./SyncEventBase";
import { Handler, UserProvidedParams, ImplicitParams } from "./defs";
export declare class SyncEvent<T> extends SyncEventBase<T> {
    readonly evtAttach: SyncEventBase<Handler<T>>;
    protected addHandler(attachParams: UserProvidedParams<T>, implicitAttachParams: ImplicitParams): Handler<T>;
}
export declare namespace SyncEvent {
    type Type<T> = T extends SyncEvent<infer U> ? U : never;
}
export declare class VoidSyncEvent extends SyncEvent<void> {
    post(): number;
}
