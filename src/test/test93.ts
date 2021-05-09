
import { Evt, to } from "../lib";
import { assert } from "tsafe/assert";


const evt = new Evt<["event1", string] | ["event2", number]>();

const callback = ()=> assert(false);

evt.$attach(to("event1"), callback);
evt.$attach(to("event1"), callback);

evt.getHandlers()
    .filter(handler => (
        to("event1") === handler.op && 
        handler.callback === callback
    ))
    .forEach(({ detach })=> detach());

console.log("PASS");
