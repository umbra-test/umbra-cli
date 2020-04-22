import { SimpleArgParser } from "./SimpleArgParser";
interface CliConfig {
    /**
     * List of globs pointing to test files to execute.
     */
    input: string[];
    /**
     * Whether or not to run with the Node debugger enabled.
     */
    debug: boolean;
    /**
     * Whether or not to run with the Node Debugger, immediately breaking after the first file.
     */
    debugBreak: boolean;
    /**
     * Whether or not to run in "watch mode", which will execute all tests once, and then again once the individual files
     * change.
     */
    watch: boolean;
    /**
     * The path pointing to a file containing full umbra config.
     */
    configPath: string;
}
declare class CliConfigResolver {
    private readonly argParser;
    constructor(argParser?: SimpleArgParser<unknown>);
    parse(argv: string[]): CliConfig;
}
export { CliConfigResolver, CliConfig };
