import {ArgumentParser} from "argparse";
import * as path from "path";

interface ParsedArgs extends UmbraConfig {
    configPath: string;
}

class ArgsParser {
    private readonly argsParser: ArgumentParser;

    constructor() {
        this.argsParser = new ArgumentParser({
            description: "Run tests using the Umbra test framework."
        });
        this.addGeneralOptions();
        this.addTimeoutOptions();
        this.addReportingOptions();
        this.addParallelOptions();
    }

    parse(): ParsedArgs {
        const unprocessedArgs = this.argsParser.parseArgs();
        return this.cloneNonNullValues({
            input: unprocessedArgs.input[0].length > 0 ? unprocessedArgs.input[0] : undefined,
            cacheDir: unprocessedArgs.cacheDir,
            configPath: path.resolve(unprocessedArgs.configPath),
            debug: unprocessedArgs.debug,
            debugBreak: unprocessedArgs.debugBrk,
            watch: unprocessedArgs.watch,
            timeoutMs: this.cloneNonNullValues({
                it: unprocessedArgs.timeoutMs || unprocessedArgs.itTimeoutMs,
                before: unprocessedArgs.timeoutMs || unprocessedArgs.beforeTimeoutMs,
                beforeEach: unprocessedArgs.timeoutMs || unprocessedArgs.beforeEachTimeoutMs,
                after: unprocessedArgs.timeoutMs || unprocessedArgs.afterTimeoutMs,
                afterEach: unprocessedArgs.timeoutMs || unprocessedArgs.afterEachTimeoutMs
            }),
            reporting: this.cloneNonNullValues({
                reporters: unprocessedArgs.reporter ? [unprocessedArgs.reporter] : [],
                outputPath: unprocessedArgs.outputPath
            }),
            parallel: this.cloneNonNullValues({
                idempotentFiles: unprocessedArgs.idempotentFiles,
                idempotentTests: unprocessedArgs.idempotentTests
            })
        });
    }

    // ArgsParser does not respect defaultValue of undefined -- it will instead set things to null. Not recursive.
    private cloneNonNullValues<T>(object: T): T {
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

        return Object.keys(newObject).length > 0 ? newObject as T : undefined;
    }

    private addGeneralOptions() {
        this.argsParser.addArgument("input", {
            help: "Files, or globs, to run with the Umbra Test Runner",
            required: false,
            action: "append",
            nargs: "*"
        });

        this.argsParser.addArgument(["-d", "--debug"], {
            help: "Enables the Node debugger",
            required: false,
            action: "storeTrue",
            dest: "debug"
        });

        this.argsParser.addArgument(["-db", "--debug-brk"], {
            help: "Enables the Node debugger, breaking once the first test is evaluated",
            required: false,
            action: "storeTrue",
            dest: "debugBrk"
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
            dest: "configPath",
            defaultValue: "./umbra.config.ts"
        });

        this.argsParser.addArgument(["--cacheDir"], {
            help: "The directory in which to store umbra cache files used for dynamic optimization.",
            required: false,
            dest: "cacheDir"
        });
    }

    private addTimeoutOptions() {
        this.argsParser.addArgument(["--timeoutMs"], {
            help: "Specifies the general asynchronous timeout value in milliseconds. This affects *all* async methods (it, before, after, etc.)",
            required: false,
            dest: "timeoutMs"
        });

        for (const value of ["it", "before", "beforeEach", "after", "afterEach"]) {
            this.argsParser.addArgument([`--${value}TimeoutMs`], {
                help: `Specifies the asynchronous timeout value for \`${value}\` blocks in milliseconds. This overrides general settings.`,
                required: false,
                dest: `${value}TimeoutMs`
            });
        }
    }

    private addReportingOptions() {
        this.argsParser.addArgument(["-o", "--outputPath"], {
            help: "The output directory to write the final results to.",
            required: false,
            dest: "outputPath"
        });

        this.argsParser.addArgument(["-r", "--reporter"], {
            help: "The reporter to use.",
            required: false,
            dest: "reporter"
        });
    }

    private addParallelOptions() {
        this.argsParser.addArgument(["--idempotentFiles"], {
            help: "If set, files are treated as idempotent (meaning other file execution does not affect it).",
            required: false,
            action: "storeTrue",
            dest: "idempotentFiles"
        });

        this.argsParser.addArgument(["--idempotentTests"], {
            help: "If set, tests are treated as idempotent (meaning other test execution does not affect it). Requires idempotent files.",
            required: false,
            action: "storeTrue",
            dest: "idempotentTests"
        });
    }

}

export {ArgsParser, ParsedArgs};