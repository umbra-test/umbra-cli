interface ParsedArgs extends UmbraConfig {
    configPath: string;
}
declare class ArgsParser {
    private readonly DEFAULT_TIMEOUT_MS;
    private readonly argsParser;
    constructor();
    parse(): ParsedArgs;
    private addGeneralOptions;
    private addTimeoutOptions;
    private addReportingOptions;
    private addParallelOptions;
}
export { ArgsParser, ParsedArgs };
