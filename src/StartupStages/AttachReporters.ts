import {StartupContext} from "./StartupContext";

const AttachReporters = (context: StartupContext): StartupContext => {
    const runner = context.runner;
    for (const reporter of context.reporters) {
        runner.on("activeFileChanged", reporter.activeFileChanged.bind(reporter));
        runner.on("beforeTest", reporter.beforeTest.bind(reporter));
        runner.on("testSuccess", reporter.testSuccess.bind(reporter));
        runner.on("testFail", reporter.testFail.bind(reporter));
        runner.on("testTimeout", reporter.testTimeout.bind(reporter));
        runner.on("beforeDescribe", reporter.beforeDescribe.bind(reporter));
        runner.on("afterDescribe", reporter.afterDescribe.bind(reporter));
    }

    return context;
};

export {AttachReporters};
