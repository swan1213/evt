import { SyncEventBase } from "./SyncEventBase";
import { Handler, UserProvidedParams, ImplicitParams } from "./defs";

export class SyncEvent<T> extends SyncEventBase<T> {

    public readonly evtAttach= new SyncEventBase<Handler<T>>()

    protected addHandler(
        attachParams: UserProvidedParams<T>,
        implicitAttachParams: ImplicitParams
    ): Handler<T> {

        let handler= super.addHandler(attachParams, implicitAttachParams);

        this.evtAttach.post(handler);

        return handler;

    }

}

export namespace SyncEvent {

    export type Type<T> = T extends SyncEvent<infer U> ? U : never;

}

export class VoidSyncEvent extends SyncEvent<void> {
    public post(): number {
        return super.post(undefined);
    }
}
