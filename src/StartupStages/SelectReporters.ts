import {BasicReporter} from "../Reporter/Stock/BasicReporter";
import {StockReporterMap} from "../Reporter/Stock/StockReporterMap";
import {StartupContext} from "./StartupContext";

const SelectReporters = (context: StartupContext): StartupContext => {
    const reporterNames = context.config.reporting.reporters;
    if (reporterNames.length === 0) {
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

    return context;
};

export {SelectReporters};
