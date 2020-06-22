import {StartupContext} from "./StartupContext";

const AttachReporters = (context: StartupContext): StartupContext => {
    const runner = context.runner;
    for (const reporter of context.reporters) {
        runner.on("onTestStart", reporter.onTestStart.bind(reporter));
        runner.on("onTestEnd", reporter.onTestEnd.bind(reporter));
    }

    return context;
};

export {AttachReporters};
