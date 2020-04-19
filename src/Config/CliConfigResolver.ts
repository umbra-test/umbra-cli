import {ArgumentParser} from "argparse";
import * as path from "path";

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
    private readonly argsParser: ArgumentParser;

    constructor() {
        this.argsParser = new ArgumentParser({
            description: "Run tests using the Umbra test framework."
        });
        this.addGeneralOptions();
    }

    parse(argv: string[]): CliConfig {
        const unprocessedArgs = this.argsParser.parseArgs(argv);
        return CliConfigResolver.cloneNonNullValues({
            input: unprocessedArgs.input[0].length > 0 ? unprocessedArgs.input[0] : null,
            configPath: unprocessedArgs.configPath ? path.resolve(unprocessedArgs.configPath) : null,
            debug: unprocessedArgs.debug,
            debugBreak: unprocessedArgs.debugBreak,
            watch: unprocessedArgs.watch
        });
    }

    // ArgsParser does not respect defaultValue of undefined -- it will instead set things to null. Not recursive.
    private static cloneNonNullValues<T>(object: T): T {
        const newObject = {};
        for (const key of Object.keys(object)) {
            const value = object[key];

            if (typeof value === "undefined" || value == null) {
                continue;
            }

            // boolean values are always defaulted to false, due to ArgParser behavior above.
            if (typeof value === "boolean" && !value) {
                continue;
            }

            newObject[key] = value;
        }

        return Object.keys(newObject).length > 0 ? newObject as T : {} as T;
    }

    private addGeneralOptions() {
        this.argsParser.addArgument("input", {
            help: "Files, or globs, to run with the Umbra Test Runner",
            required: false,
            action: "append",
            nargs: "*"
        });

        this.argsParser.addArgument(["-d", "--debug", "--inspect"], {
            help: "Enables the Node debugger",
            required: false,
            action: "storeTrue",
            dest: "debug"
        });

        this.argsParser.addArgument(["-db", "--debug-brk", "--debug-break", "--inspect-break"], {
            help: "Enables the Node debugger, breaking once the first test is evaluated",
            required: false,
            action: "storeTrue",
            dest: "debugBreak"
        });

        this.argsParser.addArgument(["-w", "--watch"], {
            help: "Enables watch mode, which will evaluate all tests first and then again once changes occur.",
            required: false,
            action: "storeTrue",
            dest: "watch"
        });

        this.argsParser.addArgument(["-c", "--config"], {
            help: "Sets the config file path.",
            required: false,
            dest: "configPath"
        });
    }
}

export {CliConfigResolver, CliConfig};