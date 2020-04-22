import {SimpleArgParser} from "./SimpleArgParser";

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

class CliConfigResolver {
    private readonly argParser: SimpleArgParser<CliConfig>;

    constructor(argParser = new SimpleArgParser()) {
        this.argParser = argParser;
    }

    parse(argv: string[]): CliConfig {
        const results = this.argParser
            .addArgument("input", [], "Files, or globs, to run with the Umbra Test Runner", false, "trailing")
            .addArgument("debug", ["-d", "--inspect"], "Enables the Node debugger", false, "boolean")
            .addArgument("debugBreak", ["-db", "--debug-brk", "--debug-break", "--inspect-break"], "Enables the Node debugger, breaking once the first test is evaluated", false, "boolean")
            .addArgument("watch", ["-w"], "Enables watch mode, which will evaluate all tests first and then again once changes occur", false, "boolean")
            .addArgument("configPath", ["--config", "-c"], "Sets the config file path", false, "string")
            .parse(argv);

        return results as CliConfig;
    }
}

export {CliConfigResolver, CliConfig};