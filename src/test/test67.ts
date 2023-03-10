import { Evt, compose } from "../lib";
import { assert } from "tsafe/assert";
import { getPromiseAssertionApi } from "../tools/testing/getPromiseAssertionApi";
import { getHandlerPr } from "./getHandlerPr";

const { mustResolve, mustStayPending } = getPromiseAssertionApi();

{
    //Test type only
    const evtText = new Evt<string>();

    evtText.$attach(
        compose(
            (text, registerSideEffect) => (
                registerSideEffect(()=>Evt.newCtx<boolean>().done(true)),
                [text.toUpperCase()]
            ),
            (text, registerSideEffect) => (
                registerSideEffect(()=> Evt.newCtx<number>().done(3)),
                [text.length]
            ),
            (n, registerSideEffect) => (
                registerSideEffect(()=> Evt.newCtx()),
                [`=>${n}<=`]
            ),
            (str, registerSideEffect) => (
                registerSideEffect(()=> Evt.newCtx().abort(new Error())),
                [str.toUpperCase()]
            ),
            (str, registerSideEffect) => (
                registerSideEffect(()=> Evt.newCtx<boolean>().abort(new Error())),
                [str.toUpperCase()]
            )
        ),
        str => str.toUpperCase()
    );

}


{

    const evtText = new Evt<string>();

    const ctx= Evt.newCtx();

    mustResolve({
        "promise":
            getHandlerPr(evtText, () =>
                evtText.$attach(
                    compose(
                        (text,registerSideEffect)=>(registerSideEffect(()=>ctx.done()), [text]),
                        text => [text]
                    ),
                    ctx,
                    text => text.toLowerCase()
                ))
    });

    evtText.post("foo");

    assert(evtText.getHandlers().length === 0)

}

{

    const evtText = new Evt<string>();

    const ctx = Evt.newCtx();

    mustResolve({
        "promise":
            getHandlerPr(evtText, () =>
                evtText.$attach(
                    compose(
                        (text, registerSideEffect) => (registerSideEffect(() => ctx.done()), [text]),
                        text => [text]
                    ),
                    ctx,
                    text => text.toLowerCase()
                ))
    });

    evtText.post("foo");

    assert(evtText.getHandlers().length === 0)

}

{

    const evtText = new Evt<string>();

    const ctx = Evt.newCtx();

    mustStayPending(
        getHandlerPr(evtText, () =>
            evtText.$attach(
                compose(
                    (text, registerSideEffect) => (registerSideEffect(()=> ctx.done()), [text]),
                    () => null
                ),
                ctx,
                () => { }
            ))
    );

    evtText.post("foo");

    assert(evtText.getHandlers().length === 0)

}

{

    const evtText = new Evt<string>();

    const ctx = Evt.newCtx();

    mustStayPending(
        getHandlerPr(
            evtText, () =>

            evtText.$attach(
                compose(
                    (text, registerSideEffect) => (registerSideEffect(() => ctx.done()), [text]),
                    str => (str.toLowerCase(), null)
                ),
                ctx,
                () => { }
            )
        )
    );

    evtText.post("foo");

    assert(evtText.getHandlers().length === 0)

}

console.log("PASS");

