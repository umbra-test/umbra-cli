import {FancyReporter} from "./FancyReporter";
import {BasicReporter} from "./BasicReporter";

const StockReporterMap = {
    "basic": BasicReporter,
    "fancy": FancyReporter
};

export {StockReporterMap};
