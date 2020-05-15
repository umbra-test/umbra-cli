import {TestRunner} from "@umbra-test/umbra-test-runner";
import {StartupContext} from "./StartupContext";

declare global {
    const it: TestRunner["it"];
    const describe: TestRunner["describe"];
    const after: TestRunner["after"];
    const afterEach: TestRunner["afterEach"];
    const before: TestRunner["before"];
    const beforeEach: TestRunner["beforeEach"];

    // Used for extensions, specifically umbra-mock.
    const __testRunner: TestRunner;
}

const globalAny: any = global;

const ExportGlobals = (context: StartupContext): StartupContext => {
    const runner = context.runner;

    // Note: using bind results in property loss, so `it` has to be re-assigned.
    const itOnly = runner.it.only.bind(runner);
    const describeOnly = runner.describe.only.bind(runner);

    const globalFunctions: (keyof TestRunner)[] = ["it", "describe", "after", "afterEach", "before", "beforeEach"];
    for (const fnName of globalFunctions) {
        globalAny[fnName] = runner[fnName].bind(runner);
    }
    globalAny["it"]["only"] = itOnly;
    globalAny["describe"]["only"] = describeOnly;
    globalAny["__testRunner"] = runner;

    return context;
};

export {ExportGlobals};
