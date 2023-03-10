
import { Evt } from "../lib";
import { assert } from "tsafe/assert";;

let std_out = "";

Evt.create()
    .attach(() => std_out += "tick ")
    .attach(() => std_out += "tick ")
    .attach(() => std_out += "tick ")
    .post()
    ;

assert(std_out === "tick tick tick " as string);
std_out="";

Evt.create(0)
    .attach(data => std_out += data)
    .attach(data => std_out += data)
    .attach(data => std_out += data)
    .state++;

assert(std_out === "000111" as string);
std_out="";

Evt.create<number>()
    .attach(data => std_out += data)
    .attach(data => std_out += data)
    .attach(data => std_out += data)
    .post(3);

assert(std_out === "333" as string);

console.log("PASS");

