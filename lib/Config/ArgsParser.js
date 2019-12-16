import { ArgumentParser } from "argparse";
import * as path from "path";
class ArgsParser {
    constructor() {
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
    cloneNonNullValues(object) {
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
        return Object.keys(newObject).length > 0 ? newObject : undefined;
    }
    addGeneralOptions() {
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
    addTimeoutOptions() {
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
    addReportingOptions() {
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
export { ArgsParser };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQXJnc1BhcnNlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9Db25maWcvQXJnc1BhcnNlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUMsY0FBYyxFQUFDLE1BQU0sVUFBVSxDQUFDO0FBQ3hDLE9BQU8sS0FBSyxJQUFJLE1BQU0sTUFBTSxDQUFDO0FBTTdCLE1BQU0sVUFBVTtJQUdaO1FBQ0ksSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLGNBQWMsQ0FBQztZQUNqQyxXQUFXLEVBQUUsMkNBQTJDO1NBQzNELENBQUMsQ0FBQztRQUNILElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1FBQ3pCLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1FBQ3pCLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO1FBQzNCLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO0lBQzlCLENBQUM7SUFFRCxLQUFLO1FBQ0QsTUFBTSxlQUFlLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUNwRCxPQUFPLElBQUksQ0FBQyxrQkFBa0IsQ0FBQztZQUMzQixLQUFLLEVBQUUsZUFBZSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxlQUFlLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTO1lBQ2pGLFFBQVEsRUFBRSxlQUFlLENBQUMsUUFBUTtZQUNsQyxVQUFVLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxlQUFlLENBQUMsVUFBVSxDQUFDO1lBQ3BELEtBQUssRUFBRSxlQUFlLENBQUMsS0FBSztZQUM1QixVQUFVLEVBQUUsZUFBZSxDQUFDLFFBQVE7WUFDcEMsS0FBSyxFQUFFLGVBQWUsQ0FBQyxLQUFLO1lBQzVCLFNBQVMsRUFBRSxJQUFJLENBQUMsa0JBQWtCLENBQUM7Z0JBQy9CLEVBQUUsRUFB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