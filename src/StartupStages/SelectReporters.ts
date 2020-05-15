import {BasicReporter} from "../Reporter/Stock/BasicReporter";
import {StockReporterMap} from "../Reporter/Stock/StockReporterMap";
import {StartupContext, Partialize} from "./StartupContext";

const SelectReporters = (context: Partialize<StartupContext, "config"|"runner">): StartupContext => {
    const reportingConfig = context.config.reporting;
    const reporterNames = reportingConfig ? reportingConfig.reporters : null;
    if (!reporterNames || reporterNames.length === 0) {
        context.reporters = [new BasicReporter()];
    } else {
        context.reporters = reporterNames.map((name) => {
            try {
                return require(name);
            } catch (e) {
                if (StockReporterMap[name]) {
                    return new StockReporterMap[name]();
                }

                throw new Error(`Unable to load reporter: ${name}`);
            }
        });
    }

    return context as StartupContext;
};

export {SelectReporters};
