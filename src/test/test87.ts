
import { Evt } from "../lib";
import {assert} from "tsafe";

const evtIsBlue= Evt.create(false);
const evtIsBig= Evt.create(false);

const evtIsBigAndBlue = Evt.merge([
    evtIsBlue.evtChange,
    evtIsBig.evtChange
])
    .toStateful()
    .pipe(()=> [ evtIsBlue.state && evtIsBig.state ])
    ;

assert(evtIsBigAndBlue.state === false as boolean);

evtIsBlue.state= true;

assert(evtIsBigAndBlue.state === false as boolean);

evtIsBig.state= true;

assert(evtIsBigAndBlue.state === true);

console.log("PASS");