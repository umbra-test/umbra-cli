import { FancyReporter } from "./FancyReporter";
import { BasicReporter } from "./BasicReporter";
declare const StockReporterMap: {
    basic: typeof BasicReporter;
    fancy: typeof FancyReporter;
};
export { StockReporterMap };
