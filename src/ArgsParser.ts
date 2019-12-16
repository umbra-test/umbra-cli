import {ArgumentParser} from "argparse";
import * as path from "path";

interface ParsedArgs extends UmbraConfig {
    configPath: string;
}

class ArgsParser {
    private readonly DEFAULT_TIMEOUT_MS = 100;
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
        return {
            input: unprocessedArgs.input[0],
            cacheDir: unprocessedArgs.cacheDir,
            configPath: path.resolve(unprocessedArgs.configPath),
            debug: unprocessedArgs.debug,
            debugBreak: unprocessedArgs.debugBrk,
            watch: unprocessedArgs.watch,
            timeoutMs: {
                it: unprocessedArgs.itTimeoutMs,
                before: unprocessedArgs.beforeTimeoutMs,
                beforeEach: unprocessedArgs.beforeEachTimeoutMs,
                after: unprocessedArgs.afterTimeoutMs,
                afterEach: unprocessedArgs.afterEachTimeoutMs
            },
            reporting: {
                reporters: unprocessedArgs.reporters,
                outputPath: unprocessedArgs.outputPath
            },
            parallel: {
                idempotentFiles: unprocessedArgs.idempotentFiles,
                idempotentTests: unprocessedArgs.idempotentTests
            }
        }
    }

    private addGeneralOptions() {
        this.argsParser.addArgument("input", {
            help: "Files, or globs, to run with the Umbra Test Runner",
            action: "append",
            nargs: "+"
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
            dest: "cacheDir",
            defaultValue: ".umbra-cache"
        });
    }

    private addTimeoutOptions() {
        this.argsParser.addArgument(["--timeoutMs"], {
            help: "Specifies the general asynchronous timeout value in milliseconds. This affects *all* async methods (it, before, after, etc.)",
            required: false,
            defaultValue: this.DEFAULT_TIMEOUT_MS,
            dest: "timeoutMs"
        });

        for (const value of ["it", "before", "beforeEach", "after", "afterEach"]) {
            this.argsParser.addArgument([`--${value}TimeoutMs`], {
                help: `Specifies the asynchronous timeout value for \`${value}\` blocks in milliseconds. This overrides general settings.`,
                required: false,
                defaultValue: this.DEFAULT_TIMEOUT_MS,
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

        this.argsParser.addArgument(["-r", "--reporters"], {
            help: "The output directory to write the final results to.",
            required: false,
            action: "append",
            defaultValue: [],
            dest: "reporters"
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