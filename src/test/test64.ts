
import { Evt } from "../lib";

import { chunksOf } from "../lib/util/genericOperators/chunksOf";
import { assertRepresentsSameDataFactory } from "../tools/inDepthComparison";

const { assertRepresentsSameData } = assertRepresentsSameDataFactory({ "takeIntoAccountArraysOrdering": true });

{

    const evt = new Evt<Uint8Array>();

    const acc: Uint8Array[] = [];

    evt.$attach(
        chunksOf(6),
        data => acc.push(data)
    );

    evt.post(new Uint8Array([1, 2, 3]));
    evt.post(new Uint8Array([4, 5, 6, 7]));
    evt.post(new Uint8Array([0]));
    evt.post(new Uint8Array([1, 2]));
    evt.post(new Uint8Array([3, 4]));
    evt.post(new Uint8Array([1, 2, 3, 4, 5, 6]));

    assertRepresentsSameData({
        "got": acc,
        "expected": [
            new Uint8Array([1, 2, 3, 4, 5, 6]),
            new Uint8Array([0, 7, 1, 2, 3, 4]),
            new Uint8Array([1, 2, 3, 4, 5, 6])
        ]
    });

    console.log("PASS".green);

}