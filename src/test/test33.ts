
import { SyncEvent } from "../lib";

let evt = new SyncEvent<number | string>();

evt.enableTrace("myEvent", n => n.toString(), str => console.assert(str === "(myEvent) 1 handler => 666" ));

evt.postOnceMatched(666);

evt.attachOnce(
    evtData => typeof evtData === "string",
    ()=> { throw new Error(); }
);

evt.attachOnce(
    evtData=> {

        console.assert(evtData === 666);

        console.log("PASS".green);

    }
);


