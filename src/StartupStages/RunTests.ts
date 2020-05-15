import {StartupContext} from "./StartupContext";
import {ModuleResolver} from "../ModuleResolver";
import {RunResults} from "@umbra-test/umbra-test-runner";

const RunTests = (context: StartupContext): Promise<RunResults> => {
    if (!context.config.input) {
        throw new Error("Config is missing an input file.");
    }
    return new ModuleResolver(context.runner)
        .resolveGlob(context.config.input)
        .then(() => {
            for (const reporter of context.reporters) {
                reporter.runStart();
            }
        })
        .then(() => context.runner.run())
        .then((results) => {
            for (const reporter of context.reporters) {
                reporter.runEnd(results);
            }

            return results;
        });
};

export {RunTests};
