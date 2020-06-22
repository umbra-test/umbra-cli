import {BasicReporter} from "./BasicReporter";
import {ReporterConstructor} from "../Reporter";

const StockReporterMap: { [name: string]: ReporterConstructor} = {
    "basic": BasicReporter,
};

export {StockReporterMap};
