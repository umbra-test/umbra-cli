import {StartupContext, Partialize} from "./StartupContext";
import {TestRunner} from "@umbra-test/umbra-test-runner";

const CreateRunner = (context: Partialize<StartupContext, "config">): Partialize<StartupContext, "config"|"runner"> => {
    context.runner = new TestRunner({
        timeoutMs: context.config.timeoutMs,
        stopOnFirstFail: false
    });

    return context as Partialize<StartupContext, "config"|"runner">;
};

export {CreateRunner};
