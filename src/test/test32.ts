
import { SyncEventBase as SyncEvent } from "../lib/SyncEventBase";


let evt = new SyncEvent<string>();


(async () => {

    evt.waitFor(300);
    evt.waitFor(300);
    evt.waitFor(300);


    {

        const letter = await evt.waitFor();

        console.assert(letter === "a");

    }

    evt.waitFor(300);
    evt.waitFor(300);

    {

        const letter = await evt.waitFor();

        console.assert(letter === "b");

    }

    evt.post("never");

    evt.waitFor(1000).then(
        ()=> { throw new Error("should have timed out") }, 
        _error => { }
    );

    {

        let letter: string;

        try {

            letter = await evt.waitFor(1000);

            throw new Error(`fail ${letter}`);

        } catch{
            console.log("PASS".green);
        }


    }




})();

evt.post("a");
evt.post("b");

