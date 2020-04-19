import {StartupContext} from "./StartupContext";

const InitializeReporters = (context: StartupContext): Promise<StartupContext> => {
    return Promise.all(context.reporters.map((reporter) => reporter.initialize())).then(() => context);
};

export {InitializeReporters};
