import {
    SyncEvent
} from "../lib/index";

require("colors");

export interface Person {
    name: string;
    age: number;
    [prom: string]: any;
}

export interface TypedPerson extends Person {
    sex: "male" | "female";
}

export function isTyped(p: Person): p is TypedPerson {
    return p.sex ? true: false;
}

let testCount= 0;

export class TypedPersonIntro {


    private intro= "this person is ";

    public introduce( tp: TypedPerson): void{

        console.assert(this.intro + tp.sex === "this person is female" && tp === sourceEvt[1]);

        testCount++;

    }
}

let tpi= new TypedPersonIntro();

let evt = new SyncEvent<Person>();

let sourceEvt: Person[] = [
    {
        "name": "Joseph",
        "age": 26
    },
    {
        "name": "Sienna",
        "age": 22,
        "sex": "female"
    },
    {
        "name": "Antonin",
        "age": 22,
        "sex": "male"
    },
    {
        "name": "Joseph",
        "age": 26
    },
    {
        "name": "Jean-Marc",
        "age": 53,
        "sex": "male"
    }
];


console.assert( evt.handlerCount === 0);
console.assert( evt.onceHandlerCount === 0);
console.assert( evt.permanentHandlerCount === 0);
console.assert( evt.waiterCount === 0);

evt.attachOnce(isTyped, tpi, tpi.introduce);

console.assert( evt.handlerCount === 1);
console.assert( evt.onceHandlerCount === 1);
console.assert( evt.permanentHandlerCount === 0);
console.assert( evt.waiterCount === 0);

let resultAttach: Person[]= [];

evt.attach( person => resultAttach.push(person) );

console.assert( evt.handlerCount === 2);
console.assert( evt.onceHandlerCount === 1);
console.assert( evt.permanentHandlerCount === 1);
console.assert( evt.waiterCount === 0);




setTimeout(() => {

    console.assert(evt.postCount === 0);

    evt.post(sourceEvt[0]);
    evt.post(sourceEvt[1]);

    console.assert(evt.handlerCount === 1);
    console.assert(evt.onceHandlerCount === 0);
    console.assert(evt.permanentHandlerCount === 1);
    console.assert(evt.waiterCount === 0);

    evt.post(sourceEvt[2]);

}, 0);

setTimeout(() => {

    console.assert(evt.handlerCount === 2);
    console.assert(evt.onceHandlerCount === 0);
    console.assert(evt.permanentHandlerCount === 1);
    console.assert(evt.waiterCount === 1);

    evt.post(sourceEvt[3]);
    evt.post(sourceEvt[4]);

    console.assert(evt.postCount === 5);

    console.assert(testCount ===1 );

    for( let i=0; i< resultAttach.length; i++)
        console.assert(resultAttach[i] === sourceEvt[i] );

    console.log("PASS".green);

}, 200);


(async () => {

    let personCount = 0;
    let arr: TypedPerson[] = [];

    while (true) {

        let typedPerson = await evt.waitFor(isTyped);

        console.assert(evt.waiterCount === 0);

        arr.push(typedPerson);

        if (++personCount === 3) break;

    }

    console.assert( arr[0] === sourceEvt[1] && arr[1]=== sourceEvt[2] && arr[2] === sourceEvt[4]);

})();