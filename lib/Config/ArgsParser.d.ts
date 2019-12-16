interface ParsedArgs extends UmbraConfig {
    configPath: string;
}
declare class ArgsParser {
    private readonly argsParser;
    constructor();
    parse(): ParsedArgs;
    private cloneNonNullValues;
    private addGeneralOptions;
    private addTimeoutOptions;
    private addReportingOptions;
    private addParallelOptions;
}
export { ArgsParser, ParsedArgs };
