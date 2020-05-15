import {FancyReporter} from "./FancyReporter";
import {BasicReporter} from "./BasicReporter";
import {Reporter, ReporterConstructor} from "../Reporter";

const StockReporterMap: { [name: string]: ReporterConstructor} = {
    "basic": BasicReporter,
    "fancy": FancyReporter
};

export {StockReporterMap};
