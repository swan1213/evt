
import { Evt } from "../lib";
import { assert } from "tsafe/assert";

const log = global.console.log;

(async () => {

	const timer = setTimeout(
		()=> {
			assert(false);
		},
		3000
	);

	const console = { "log": (str: string | number) => console.stdOut += `${str}`, "stdOut": "" };

	const evtCounter = Evt.create<number>(0);

	const intervalTimer = setInterval(
		()=> {

			evtCounter.state++;

		},
		100
	);
	
	for await (const counter of evtCounter) {

		console.log(counter);

		if( counter === 3 ){
			break;
		}

	}

	console.log("loop_end");

	assert(console.stdOut === "0123loop_end");

	clearTimeout(timer);
	clearInterval(intervalTimer);

	assert(evtCounter.getHandlers().length === 0);

	log("PASS");

})();