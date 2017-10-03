import {
    SyncEvent
} from "../lib/index";

require("colors");

let evt = new SyncEvent<string | number>();

//evt.enableTrace("evt");

let evtNumber = new SyncEvent<number>();
evt.attach((data): data is number=> typeof data === "number", evtNumber);

//evtNumber.enableTrace("evtNumber");

let evtString= new SyncEvent<string>();
evt.attach((data: string | number): data is string=> typeof data === "string", evtString as any);

//evtString.enableTrace("evtString");

let evtSatan= new SyncEvent<string | number>();
evt.attach(data => data === 666, evtSatan);

//evtSatan.enableTrace("evtSatan");

(async ()=> {

    await evtSatan.waitFor();

    throw new Error("Satan came");

})();


(async ()=> {

    let expectQueue = [ 1, "2", 3, "4", 5, "6", -1, "" ];

    while( true ){

        let data= await evt.waitFor();

        console.assert(expectQueue.shift()===data);

        if( data === "" ) break;

    }

    evtSatan.detach();

})();


(async ()=> {

    let expectQueue = [1, 3, 5, -1];

    while( true ){

        let num= await evtNumber.waitFor();

        console.assert(expectQueue.shift() === num);

        if( num === -1 ) break;

    }

})();

(async ()=> {

    let expectQueue = ["2", "4", "6", "" ];

    while( true ){

        let str= await evtString.waitFor();

        console.assert(expectQueue.shift()===str);

        if( str === "" ) break;

    }

})();



(async ()=> {

    for( let data of [ 1, "2", 3, "4", 5, "6", -1, "", 666 ]){

        evt.post(data);

        await new Promise<void>(resolve=> setTimeout(resolve,40));

    }

    console.log("PASS".green);

})();
