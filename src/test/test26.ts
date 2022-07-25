
import { Evt } from "../lib";

type UnpackEvt<T extends ({ [key: string]: any; } | import("../lib/types").EvtLike<any>)> = import("../lib/types/helper").UnpackEvt<T>;

type ToNonPostableEvt<E extends ({ [key: string]: any; } | import("../lib/types").EvtLike<any>)> = 
    import("../lib/types/helper/ToNonPostableEvt").ToNonPostableEvt<E>;

type UnpackEvt_<T> = import("../lib/types/helper").UnpackEvt<T>;

{

    let evt = new Evt<number>();

    evt.enableTrace({
        "id": "myEvent", 
        "formatter": n => n.toString(), 
        "log": str => console.assert(str === "(myEvent) 1 handler, 666")
    });

    evt.attachOnce(n => console.assert(n === 666));

    evt.post(666);

    const n: UnpackEvt<typeof evt> = 666;

    n;

    const n_: UnpackEvt_<typeof evt> = 666;

    n_;

}

{

    const evt: ToNonPostableEvt<Evt<string>> = new Evt();

    const str: UnpackEvt<typeof evt> = "ok";

    str;

}

console.log("PASS");
