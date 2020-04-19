import {TestRunner} from "@umbra-test/umbra-test-runner";
import {StartupContext} from "./StartupContext";

let typeRunner: TestRunner;
declare global {
    const it: typeof typeRunner.it;
    const describe: typeof typeRunner.describe;
    const after: typeof typeRunner.after;
    const afterEach: typeof typeRunner.afterEach;
    const before: typeof typeRunner.before;
    const beforeEach: typeof typeRunner.beforeEach;

    // Used for extensions, specifically umbra-mock.
    const __testRunner: TestRunner;
}

const ExportGlobals = (context: StartupContext): StartupContext => {
    const runner = context.runner;

    // Note: using bind results in property loss, so `it` has to be re-assigned.
    const itOnly = runner.it.only.bind(runner);
    const describeOnly = runner.describe.only.bind(runner);

    const globalFunctions = ["it", "describe", "after", "afterEach", "before", "beforeEach"];
    for (const fnName of globalFunctions) {
        global[fnName] = runner[fnName].bind(runner);
    }
    global["it"]["only"] = itOnly;
    global["describe"]["only"] = describeOnly;
    global["__testRunner"] = runner;

    return context;
};

export {ExportGlobals};
