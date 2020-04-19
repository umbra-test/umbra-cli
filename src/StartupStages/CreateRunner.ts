import {StartupContext} from "./StartupContext";
import {TestRunner} from "@umbra-test/umbra-test-runner";

const CreateRunner = (context: StartupContext): Partial<StartupContext> => {
    context.runner = new TestRunner({
        timeoutMs: context.config.timeoutMs,
        stopOnFirstFail: false
    });

    return context;
};

export {CreateRunner};
