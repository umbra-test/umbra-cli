import {StartupContext} from "./StartupContext";

const AttachReporters = (context: StartupContext): StartupContext => {
    const runner = context.runner;
    for (const reporter of context.reporters) {
        runner.on("onTestResult", reporter.onTestResult.bind(reporter));
        runner.on("onTestStart", reporter.onTestStart.bind(reporter));
    }

    return context;
};

export {AttachReporters};
