import { ArgumentParser } from "argparse";
class ArgsParserWrapper {
    constructor() {
        this.DEFAULT_TIMEOUT_MS = 100;
        this.argsParser = new ArgumentParser({
            description: "Run tests using the Umbra test framework."
        });
        this.addGeneralOptions();
        this.addTimeoutOptions();
        this.addReportingOptions();
        this.addParallelOptions();
    }
    parse() {
        const unprocessedArgs = this.argsParser.parseArgs();
        // TODO: Merge from Config.
        return {
            input: unprocessedArgs.input[0],
            debug: unprocessedArgs.debug,
            debugBreak: unprocessedArgs.debugBrk,
            watch: unprocessedArgs.watch,
            cacheDir: unprocessedArgs.cacheDir,
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
            dest: "config",
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
export { ArgsParserWrapper };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQXJnc1BhcnNlcldyYXBwZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvQXJnc1BhcnNlcldyYXBwZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFDLGNBQWMsRUFBQyxNQUFNLFVBQVUsQ0FBQztBQUV4QyxNQUFNLGlCQUFpQjtJQUluQjtRQUhpQix1QkFBa0IsR0FBRyxHQUFHLENBQUM7UUFJdEMsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLGNBQWMsQ0FBQztZQUNqQyxXQUFXLEVBQUUsMkNBQTJDO1NBQzNELENBQUMsQ0FBQztRQUNILElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1FBQ3pCLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1FBQ3pCLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO1FBQzNCLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO0lBQzlCLENBQUM7SUFFRCxLQUFLO1FBQ0QsTUFBTSxlQUFlLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUVwRCwyQkFBMkI7UUFFM0IsT0FBTztZQUNILEtBQUssRUFBRSxlQUFlLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztZQUMvQixLQUFLLEVBQUUsZUFBZSxDQUFDLEtBQUs7WUFDNUIsVUFBVSxFQUFFLGVBQWUsQ0FBQyxRQUFRO1lBQ3BDLEtBQUssRUFBRSxlQUFlLENBQUMsS0FBSztZQUM1QixRQUFRLEVBQUUsZUFBZSxDQUFDLFFBQVE7WUFDbEMsU0FBUyxFQUFFO2dCQUNQLEVBQUUsRUFBRSxlQUFlLENBQUMsV0FBVztnQkFDL0IsTUFBTSxFQUFFLGVBQWUsQ0FBQyxlQUFlO2dCQUN2QyxVQUFVLEVBQUUsZUFBZSxDQUFDLG1CQUFtQjtnQkFDL0MsS0FBSyxFQUFFLGVBQWUsQ0FBQyxjQUFjO2dCQUNyQyxTQUFTLEVBQUUsZUFBZSxDQUFDLGtCQUFrQjthQUNoRDtZQUNELFNBQVMsRUFBRTtnQkFD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