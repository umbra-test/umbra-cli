declare class ArgsParserWrapper {
    private readonly DEFAULT_TIMEOUT_MS;
    private readonly argsParser;
    constructor();
    parse(): UmbraConfig;
    private addGeneralOptions;
    private addTimeoutOptions;
    private addReportingOptions;
    private addParallelOptions;
}
export { ArgsParserWrapper };
