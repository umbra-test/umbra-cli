"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const argparse_1 = require("argparse");
const path = require("path");
class ArgsParser {
    constructor() {
        this.DEFAULT_TIMEOUT_MS = 100;
        this.argsParser = new argparse_1.ArgumentParser({
            description: "Run tests using the Umbra test framework."
        });
        this.addGeneralOptions();
        this.addTimeoutOptions();
        this.addReportingOptions();
        this.addParallelOptions();
    }
    parse() {
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
        };
    }
    addGeneralOptions() {
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
    addTimeoutOptions() {
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
    addReportingOptions() {
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
    addParallelOptions() {
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
exports.ArgsParser = ArgsParser;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQXJnc1BhcnNlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9BcmdzUGFyc2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsdUNBQXdDO0FBQ3hDLDZCQUE2QjtBQU03QixNQUFNLFVBQVU7SUFJWjtRQUhpQix1QkFBa0IsR0FBRyxHQUFHLENBQUM7UUFJdEMsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLHlCQUFjLENBQUM7WUFDakMsV0FBVyxFQUFFLDJDQUEyQztTQUMzRCxDQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztRQUN6QixJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztRQUN6QixJQUFJLENBQUMsbUJBQW1CLEVBQUUsQ0FBQztRQUMzQixJQUFJLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztJQUM5QixDQUFDO0lBRUQsS0FBSztRQUNELE1BQU0sZUFBZSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDcEQsT0FBTztZQUNILEtBQUssRUFBRSxlQUFlLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztZQUMvQixRQUFRLEVBQUUsZUFBZSxDQUFDLFFBQVE7WUFDbEMsVUFBVSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsZUFBZSxDQUFDLFVBQVUsQ0FBQztZQUNwRCxLQUFLLEVBQUUsZUFBZSxDQUFDLEtBQUs7WUFDNUIsVUFBVSxFQUFFLGVBQWUsQ0FBQyxRQUFRO1lBQ3BDLEtBQUssRUFBRSxlQUFlLENBQUMsS0FBSztZQUM1QixTQUFTLEVBQUU7Z0JBQ1AsRUFBRSxFQUFFLGVBQWUsQ0FBQyxXQUFXO2dCQUMvQixNQUFNLEVBQUUsZUFBZSxDQUFDLGVBQWU7Z0JBQ3ZDLFVBQVUsRUFBRSxlQUFlLENBQUMsbUJBQW1CO2dCQUMvQyxLQUFLLEVBQUUsZUFBZSxDQUFDLGNBQWM7Z0JBQ3JDLFNBQVMsRUFBRSxlQUFlLENBQUMsa0JBQWtCO2FBQ2hE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