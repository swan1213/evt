

import { Evt } from "../lib";
import { getPromiseAssertionApi } from "../tools/testing/getPromiseAssertionApi";

const { mustStayPending } = getPromiseAssertionApi();

const evt = new Evt<string | string[]>();


mustStayPending(
    evt.$attach(
        (data): [string] | null => typeof data !== "string" ? undefined as unknown as null : [data],
        () => { }
    )
)

mustStayPending(
    evt.waitFor(
        (data): [string] | null => typeof data !== "string" ? undefined as unknown as null : [data]
    )
);

evt.post(["a", "b", "c"]);
evt.post(["a", "b", "c", "d"]);

console.log("PASS".green);

