import { Evt } from "../lib";
import { assert } from "tsafe/assert";;

let stdout = "";

const evt = Evt.create<string>("");

evt.attach(async () => {

    await new Promise(resolve => setTimeout(resolve, 100));

    stdout += "bar1 "

});

evt.attachOnce(async () => {

    await new Promise(resolve => setTimeout(resolve, 100));

    stdout += "bar2 ";

});

evt.$attach(
    text => [text.toUpperCase],
    async () => {

        await new Promise(resolve => setTimeout(resolve, 100));

        stdout += "bar3 ";

    });

evt.evtChange.attach(
    async () => {

        await new Promise(resolve => setTimeout(resolve, 100));

        stdout += "bar4 ";

    });

(async () => {

    stdout += "foo ";

    await evt.postAndWait("whatever");

    stdout += "baz";

    assert(stdout === "foo bar1 bar2 bar3 bar4 bar4 bar1 bar3 baz");

    console.log("PASS");

})();


