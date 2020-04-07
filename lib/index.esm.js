import { spawnSync } from 'child_process';
import { resolve, extname } from 'path';
import { existsSync, mkdirSync } from 'fs';
import { install } from 'source-map-support';
import { TestRunner } from '@umbra-test/umbra-test-runner';
import { ArgumentParser } from 'argparse';
import ansiEscapes from 'ansi-escapes';
import createCallsiteRecord from 'callsite-record';
import chalk from 'chalk';
import fastGlob from 'fast-glob';

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
            configPath: resolve(unprocessedArgs.configPath),
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQXJnc1BhcnNlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9Db25maWcvQXJnc1BhcnNlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUMsY0FBYyxFQUFDLE1BQU0sVUFBVSxDQUFDO0FBQ3hDLE9BQU8sS0FBSyxJQUFJLE1BQU0sTUFBTSxDQUFDO0FBTTdCLE1BQU0sVUFBVTtJQUdaO1FBQ0ksSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLGNBQWMsQ0FBQztZQUNqQyxXQUFXLEVBQUUsMkNBQTJDO1NBQzNELENBQUMsQ0FBQztRQUNILElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1FBQ3pCLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1FBQ3pCLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO1FBQzNCLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO0lBQzlCLENBQUM7SUFFRCxLQUFLO1FBQ0QsTUFBTSxlQUFlLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUNwRCxPQUFPLElBQUksQ0FBQyxrQkFBa0IsQ0FBQztZQUMzQixLQUFLLEVBQUUsZUFBZSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxlQUFlLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTO1lBQ2pGLFFBQVEsRUFBRSxlQUFlLENBQUMsUUFBUTtZQUNsQyxVQUFVLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxlQUFlLENBQUMsVUFBVSxDQUFDO1lBQ3BELEtBQUssRUFBRSxlQUFlLENBQUMsS0FBSztZQUM1QixVQUFVLEVBQUUsZUFBZSxDQUFDLFFBQVE7WUFDcEMsS0FBSyxFQUFFLGVBQWUsQ0FBQyxLQUFLO1lBQzVCLFNBQVMsRUFBRSxJQUFJLENBQUMsa0JBQWtCLENBQUM7Z0JBQy9CLEVBQUUsRUFB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

class ConfigMerger {
    /**
     * Super basic helper method for merging configurations together. Overwrites earlier configs with later ones, with
     * special handling for timeoutMs, which can be either an object or a single number.
     */
    merge(baseConfig, ...configs) {
        for (const config of configs) {
            for (const attribute in config) {
                if (config.hasOwnProperty(attribute)) {
                    const value = config[attribute];
                    if (typeof value === "undefined") {
                        continue;
                    }
                    // The user has the option to set a global timeout value, rather than set them individually.
                    if (attribute === "timeoutMs" && typeof value === "number") {
                        baseConfig.timeoutMs = {
                            it: value,
                            before: value,
                            beforeEach: value,
                            after: value,
                            afterEach: value
                        };
                    }
                    else {
                        baseConfig[attribute] = config[attribute];
                    }
                }
            }
        }
        return baseConfig;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29uZmlnTWVyZ2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL0NvbmZpZy9Db25maWdNZXJnZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTSxZQUFZO0lBRWQ7OztPQUdHO0lBQ0gsS0FBSyxDQUFDLFVBQXVCLEVBQUUsR0FBRyxPQUErQjtRQUM3RCxLQUFLLE1BQU0sTUFBTSxJQUFJLE9BQU8sRUFBRTtZQUMxQixLQUFLLE1BQU0sU0FBUyxJQUFJLE1BQU0sRUFBRTtnQkFDNUIsSUFBSSxNQUFNLENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FBQyxFQUFFO29CQUNsQyxNQUFNLEtBQUssR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUM7b0JBQ2hDLElBQUksT0FBTyxLQUFLLEtBQUssV0FBVyxFQUFFO3dCQUM5QixTQUFTO3FCQUNaO29CQUVELDRGQUE0RjtvQkFDNUYsSUFBSSxTQUFTLEtBQUssV0FBVyxJQUFJLE9BQU8sS0FBSyxLQUFLLFFBQVEsRUFBRTt3QkFDeEQsVUFBVSxDQUFDLFNBQVMsR0FBRzs0QkFDbkIsRUFBRSxFQUFFLEtBQUs7NEJBQ1QsTUFBTSxFQUFFLEtBQUs7NEJBQ2IsVUFBVSxFQUFFLEtBQUs7NEJBQ2pCLEtBQUssRUFBRSxLQUFLOzRCQUNaLFNBQVMsRUFBRSxLQUFLO3lCQUNuQixDQUFDO3FCQUNMO3lCQUFNO3dCQUNILFVBQVUsQ0FBQyxTQUFTLENBQUMsR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUM7cUJBQzdDO2lCQUNKO2FBQ0o7U0FDSjtRQUVELE9BQU8sVUFBVSxDQUFDO0lBQ3RCLENBQUM7Q0FDSjtBQUVELE9BQU8sRUFBQyxZQUFZLEVBQUMsQ0FBQyJ9

/**
 * Manages interception of NodeJS WriteStreams, such as stdout. Allows consumers to listen and/or fully intercept
 * write to the stream.
 */
class WriteStreamInterceptor {
    constructor() {
        this.started = false;
    }
    /**
     * Starts the stream interceptor. If passthrough is set to true, then logs will continue to be written to the stream.
     */
    start(streamToIntercept, onWrite) {
        if (this.started) {
            throw new Error("WriteStreamInterceptor has already been started!");
        }
        this.started = true;
        this.streamToIntercept = streamToIntercept;
        this.originalStreamWrite = this.streamToIntercept.write;
        this.streamToIntercept.write = (string) => {
            const processedText = onWrite(string);
            if (typeof processedText === "string") {
                this.writeDirect(processedText);
            }
            return true;
        };
    }
    stop() {
        if (!this.started) {
            throw new Error("WriteStreamInterceptor has not been started!");
        }
        this.streamToIntercept.write = this.originalStreamWrite;
        this.started = false;
    }
    /**
     * Writes directly to the underlying WriteStream.
     *
     * @param text
     */
    writeDirect(text) {
        if (!this.started) {
            throw new Error("WriteStreamInterceptor has not been started!");
        }
        this.originalStreamWrite.apply(this.streamToIntercept, [text]);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiV3JpdGVTdHJlYW1JbnRlcmNlcHRvci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9Xcml0ZVN0cmVhbUludGVyY2VwdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7R0FHRztBQUNILE1BQU0sc0JBQXNCO0lBQTVCO1FBRVksWUFBTyxHQUFZLEtBQUssQ0FBQztJQTZDckMsQ0FBQztJQXpDRzs7T0FFRztJQUNILEtBQUssQ0FBQyxpQkFBcUMsRUFBRSxPQUF3QztRQUNqRixJQUFJLElBQUksQ0FBQyxPQUFPLEVBQUU7WUFDZCxNQUFNLElBQUksS0FBSyxDQUFDLGtEQUFrRCxDQUFDLENBQUM7U0FDdkU7UUFDRCxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztRQUNwQixJQUFJLENBQUMsaUJBQWlCLEdBQUcsaUJBQWlCLENBQUM7UUFDM0MsSUFBSSxDQUFDLG1CQUFtQixHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxLQUFLLENBQUM7UUFFeEQsSUFBSSxDQUFDLGlCQUFpQixDQUFDLEtBQUssR0FBRyxDQUFDLE1BQU0sRUFBRSxFQUFFO1lBQ3RDLE1BQU0sYUFBYSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUN0QyxJQUFJLE9BQU8sYUFBYSxLQUFLLFFBQVEsRUFBRTtnQkFDbkMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUMsQ0FBQzthQUNuQztZQUNELE9BQU8sSUFBSSxDQUFDO1FBQ2hCLENBQUMsQ0FBQztJQUNOLENBQUM7SUFFRCxJQUFJO1FBQ0EsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUU7WUFDZixNQUFNLElBQUksS0FBSyxDQUFDLDhDQUE4QyxDQUFDLENBQUM7U0FDbkU7UUFFRCxJQUFJLENBQUMsaUJBQWlCLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxtQkFBbUIsQ0FBQztRQUN4RCxJQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztJQUN6QixDQUFDO0lBRUQ7Ozs7T0FJRztJQUNILFdBQVcsQ0FBQyxJQUFZO1FBQ3BCLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFO1lBQ2YsTUFBTSxJQUFJLEtBQUssQ0FBQyw4Q0FBOEMsQ0FBQyxDQUFDO1NBQ25FO1FBRUQsSUFBSSxDQUFDLG1CQUFtQixDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBQ25FLENBQUM7Q0FDSjtBQUVELE9BQU8sRUFBQyxzQkFBc0IsRUFBQyxDQUFDIn0=

/**
 * Base handling of common console reporter functionality, such as tracking of passes, failures, and indentation levels
 * assuming tree-like test result rendering.
 */
class BaseReporter {
    constructor() {
        this.currentIndentLevel = 0;
        this.passes = 0;
        this.failures = 0;
        this.pending = 0;
    }
    initialize() {
        console.log(`\n${chalk.whiteBright("☾")} Umbra Test`);
        BaseReporter.drawHorizontalLine();
        return Promise.resolve();
    }
    activeFileChanged(absolutePath) {
        this.activeFilePath = absolutePath;
    }
    ;
    afterDescribe(title, elapsedMs) {
        this.currentIndentLevel--;
    }
    ;
    beforeDescribe(title) {
        this.currentIndentLevel++;
    }
    ;
    beforeTest(title) {
        this.pending++;
        this.currentIndentLevel++;
    }
    ;
    runEnd(results) {
        // Intentionally blank.
    }
    ;
    runStart() {
        // Intentionally blank.
    }
    ;
    testFail(title, error, elapsedMs) {
        this.pending--;
        this.failures++;
        this.currentIndentLevel--;
    }
    ;
    testTimeout(title, elapsedMs, timeoutMs) {
        this.pending--;
        this.failures++;
        this.currentIndentLevel--;
    }
    ;
    testSkipped(title) {
        this.pending--;
        this.currentIndentLevel--;
    }
    ;
    testSuccess(title, elapsedMs) {
        this.pending--;
        this.passes++;
        this.currentIndentLevel--;
    }
    ;
    static drawHorizontalLine() {
        for (let i = 0; i < process.stdout.columns - 1; i++) {
            process.stdout.write("\u2500");
        }
        process.stdout.write("\n");
    }
    getIndentedText(text, offset = 0) {
        let str = "";
        for (let i = 0; i < this.currentIndentLevel + offset; i++) {
            str += " ";
        }
        return str + text;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQmFzZVJlcG9ydGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL1JlcG9ydGVyL1N0b2NrL0Jhc2VSZXBvcnRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFHQSxPQUFPLEtBQUssTUFBTSxPQUFPLENBQUM7QUFFMUI7OztHQUdHO0FBQ0gsTUFBTSxZQUFZO0lBQWxCO1FBR2MsdUJBQWtCLEdBQUcsQ0FBQyxDQUFDO1FBRXpCLFdBQU0sR0FBVyxDQUFDLENBQUM7UUFDbkIsYUFBUSxHQUFXLENBQUMsQ0FBQztRQUNyQixZQUFPLEdBQVcsQ0FBQyxDQUFDO0lBdUVoQyxDQUFDO0lBckVHLFVBQVU7UUFDTixPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssS0FBSyxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDdEQsWUFBWSxDQUFDLGtCQUFrQixFQUFFLENBQUM7UUFFbEMsT0FBTyxPQUFPLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDN0IsQ0FBQztJQUVELGlCQUFpQixDQUFDLFlBQW9CO1FBQ2xDLElBQUksQ0FBQyxjQUFjLEdBQUcsWUFBWSxDQUFDO0lBQ3ZDLENBQUM7SUFBQSxDQUFDO0lBRUYsYUFBYSxDQUFDLEtBQWEsRUFBRSxTQUFpQjtRQUMxQyxJQUFJLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztJQUM5QixDQUFDO0lBQUEsQ0FBQztJQUVGLGNBQWMsQ0FBQyxLQUFhO1FBQ3hCLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO0lBQzlCLENBQUM7SUFBQSxDQUFDO0lBRUYsVUFBVSxDQUFDLEtBQWE7UUFDcEIsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQ2YsSUFBSSxDQUFDLGtCQUFrQixFQUFFLENBQUM7SUFDOUIsQ0FBQztJQUFBLENBQUM7SUFFRixNQUFNLENBQUMsT0FBbUI7UUFDdEIsdUJBQXVCO0lBQzNCLENBQUM7SUFBQSxDQUFDO0lBRUYsUUFBUTtRQUNKLHVCQUF1QjtJQUMzQixDQUFDO0lBQUEsQ0FBQztJQUVGLFFBQVEsQ0FBQyxLQUFhLEVBQUUsS0FBWSxFQUFFLFNBQWlCO1FBQ25ELElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUNmLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUNoQixJQUFJLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztJQUM5QixDQUFDO0lBQUEsQ0FBQztJQUVGLFdBQVcsQ0FBQyxLQUFhLEVBQUUsU0FBaUIsRUFBRSxTQUFpQjtRQUMzRCxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDZixJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDaEIsSUFBSSxDQUFDLGtCQUFrQixFQUFFLENBQUM7SUFDOUIsQ0FBQztJQUFBLENBQUM7SUFFRixXQUFXLENBQUMsS0FBYTtRQUNyQixJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDZixJQUFJLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztJQUM5QixDQUFDO0lBQUEsQ0FBQztJQUVGLFdBQVcsQ0FBQyxLQUFhLEVBQUUsU0FBaUI7UUFDeEMsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQ2YsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQ2QsSUFBSSxDQUFDLGtCQUFrQixFQUFFLENBQUM7SUFDOUIsQ0FBQztJQUFBLENBQUM7SUFFTSxNQUFNLENBQUMsa0JBQWtCO1FBQzdCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLE9BQU8sR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDakQsT0FBTyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUM7U0FDbEM7UUFDRCxPQUFPLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUMvQixDQUFDO0lBRVMsZUFBZSxDQUFDLElBQVksRUFBRSxNQUFNLEdBQUcsQ0FBQztRQUM5QyxJQUFJLEdBQUcsR0FBRyxFQUFFLENBQUM7UUFDYixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixHQUFHLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUN2RCxHQUFHLElBQUksR0FBRyxDQUFDO1NBQ2Q7UUFDRCxPQUFPLEdBQUcsR0FBRyxJQUFJLENBQUM7SUFDdEIsQ0FBQztDQUNKO0FBRUQsT0FBTyxFQUFDLFlBQVksRUFBQyxDQUFDIn0=

var TestResult;
(function (TestResult) {
    TestResult[TestResult["SUCCESS"] = 0] = "SUCCESS";
    TestResult[TestResult["FAIL"] = 1] = "FAIL";
    TestResult[TestResult["SKIPPED"] = 2] = "SKIPPED";
    TestResult[TestResult["TIMEOUT"] = 3] = "TIMEOUT";
})(TestResult || (TestResult = {}));
/**
 * A fancier reporter, with spinners and other fancy things. Mostly to play around with ideas.
 */
class FancyReporter extends BaseReporter {
    constructor(stdOutInterceptor = new WriteStreamInterceptor(), stdErrInterceptor = new WriteStreamInterceptor()) {
        super();
        this.timer = null;
        this.spinnerIndex = 0;
        this.spinnerIcons = ["◴", "◷", "◶", "◵"]; //["🌑", "🌒", "🌓", "🌔", "🌕", "🌝", "🌖", "🌗", "🌘", "🌚"];
        this.onProcessLog = (text) => {
            //return text;
        };
        this.stdOutInterceptor = stdOutInterceptor;
        this.stdErrInterceptor = stdErrInterceptor;
    }
    initialize() {
        this.stdOutInterceptor.start(process.stdout, this.onProcessLog);
        this.stdErrInterceptor.start(process.stderr, this.onProcessLog);
        this.stdOutInterceptor.writeDirect("\u001B[?25l");
        this.writeLine(`\n${chalk.whiteBright("☾")} Umbra Test`);
        this.writeLine(chalk.white(`⤷ All logs will be intercepted and written to a local file.`));
        this.drawHorizontalLine();
        return Promise.resolve();
    }
    beforeDescribe(title) {
        this.writeLine(this.getIndentedText(chalk.cyan("⤷") + ` ${title}`));
        super.beforeDescribe(title);
    }
    ;
    beforeTest(title) {
        this.startSpinner(title);
        super.beforeTest(title);
    }
    ;
    runEnd(results) {
        this.stdOutInterceptor.writeDirect("\u001B[?25h");
        this.stdOutInterceptor.stop();
        this.stdErrInterceptor.stop();
    }
    ;
    testFail(title, error, elapsedMs) {
        this.stopSpinner(TestResult.FAIL);
        this.stdErrInterceptor.writeDirect(error.message + "\n");
        const prettyStack = createCallsiteRecord({ forError: error }).renderSync({
            /* TODO: Determine whether to default node_module stripping to true
            stackFilter(frame) {
                return !frame.fileName.includes("node_modules");
            },
             */
            frameSize: 3
        });
        this.stdErrInterceptor.writeDirect(prettyStack + "\n\n");
        super.testFail(title, error, elapsedMs);
    }
    ;
    testTimeout(title, elapsedMs, timeoutMs) {
        this.stopSpinner(TestResult.TIMEOUT);
        super.testTimeout(title, elapsedMs, timeoutMs);
    }
    ;
    testSkipped(title) {
        this.stopSpinner(TestResult.SKIPPED);
        super.testSkipped(title);
    }
    ;
    testSuccess(title, elapsedMs) {
        this.stopSpinner(TestResult.SUCCESS);
        super.testSuccess(title, elapsedMs);
    }
    ;
    drawHorizontalLine() {
        for (let i = 0; i < process.stdout.columns; i++) {
            this.stdOutInterceptor.writeDirect("\u2500");
        }
        this.stdOutInterceptor.writeDirect("\n");
    }
    writeLine(text) {
        this.stdOutInterceptor.writeDirect(text + "\n");
    }
    startSpinner(text) {
        this.stdOutInterceptor.writeDirect(this.getIndentedText(chalk.yellow(this.spinnerIcons[this.spinnerIndex]) + " " + text));
        this.stdOutInterceptor.writeDirect(ansiEscapes.cursorLeft);
        this.stdOutInterceptor.writeDirect(ansiEscapes.cursorForward(this.currentIndentLevel + 1));
        this.timer = setInterval(() => {
            this.stdOutInterceptor.writeDirect(ansiEscapes.cursorBackward(1));
            this.spinnerIndex = (this.spinnerIndex + 1) % (this.spinnerIcons.length - 1);
            this.stdOutInterceptor.writeDirect(chalk.yellow(this.spinnerIcons[this.spinnerIndex]));
        }, 200);
    }
    stopSpinner(result) {
        clearInterval(this.timer);
        this.stdOutInterceptor.writeDirect(ansiEscapes.cursorBackward(1));
        if (result === TestResult.FAIL) {
            this.stdOutInterceptor.writeDirect(chalk.redBright("✘"));
        }
        else if (result === TestResult.SUCCESS) {
            this.stdOutInterceptor.writeDirect(chalk.greenBright("✓"));
        }
        else if (result === TestResult.TIMEOUT) {
            this.stdOutInterceptor.writeDirect(chalk.redBright("⏲"));
        }
        this.stdOutInterceptor.writeDirect(ansiEscapes.cursorNextLine);
        this.stdOutInterceptor.writeDirect("\n");
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRmFuY3lSZXBvcnRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9SZXBvcnRlci9TdG9jay9GYW5jeVJlcG9ydGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sV0FBVyxNQUFNLGNBQWMsQ0FBQztBQUN2QyxPQUFPLG9CQUFvQixNQUFNLGlCQUFpQixDQUFDO0FBQ25ELE9BQU8sS0FBSyxNQUFNLE9BQU8sQ0FBQztBQUcxQixPQUFPLEVBQUMsc0JBQXNCLEVBQUMsTUFBTSw4QkFBOEIsQ0FBQztBQUNwRSxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFFNUMsSUFBSyxVQUtKO0FBTEQsV0FBSyxVQUFVO0lBQ1gsaURBQU8sQ0FBQTtJQUNQLDJDQUFJLENBQUE7SUFDSixpREFBTyxDQUFBO0lBQ1AsaURBQU8sQ0FBQTtBQUNYLENBQUMsRUFMSSxVQUFVLEtBQVYsVUFBVSxRQUtkO0FBRUQ7O0dBRUc7QUFDSCxNQUFNLGFBQWMsU0FBUSxZQUFZO0lBV3BDLFlBQVksaUJBQWlCLEdBQUcsSUFBSSxzQkFBc0IsRUFBRSxFQUNoRCxpQkFBaUIsR0FBRyxJQUFJLHNCQUFzQixFQUFFO1FBQ3hELEtBQUssRUFBRSxDQUFDO1FBUkosVUFBSyxHQUFtQixJQUFJLENBQUM7UUFFN0IsaUJBQVksR0FBRyxDQUFDLENBQUM7UUFFakIsaUJBQVksR0FBRyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsK0RBQStEO1FBNEVwRyxpQkFBWSxHQUFHLENBQUMsSUFBWSxFQUFpQixFQUFFO1lBQ25ELGNBQWM7UUFDbEIsQ0FBQyxDQUFDO1FBeEVFLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxpQkFBaUIsQ0FBQztRQUMzQyxJQUFJLENBQUMsaUJBQWlCLEdBQUcsaUJBQWlCLENBQUM7SUFDL0MsQ0FBQztJQUVELFVBQVU7UUFDTixJQUFJLENBQUMsaUJB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

/**
 * A basic reporter. Nothing fancy.
 */
class BasicReporter extends BaseReporter {
    beforeDescribe(title) {
        super.beforeDescribe(title);
        console.log(this.getIndentedText(chalk.cyan("⤷") + ` ${title}`));
    }
    ;
    beforeTest(title) {
        super.beforeTest(title);
        console.log(this.getIndentedText(chalk.cyan("⤷") + ` ${title}`));
    }
    ;
    testFail(title, error, elapsedMs) {
        super.testFail(title, error, elapsedMs);
        console.log(this.getIndentedText(chalk.redBright(`✖ FAIL ✖ ${title}`), 2));
        this.printPrettyStackTrace(error);
    }
    ;
    testTimeout(title, elapsedMs, timeoutMs) {
        super.testTimeout(title, elapsedMs, timeoutMs);
        console.log(this.getIndentedText(chalk.redBright(`✖ TIMED OUT ✖ ${title}`), 2));
    }
    ;
    runEnd(results) {
        console.log(`Tests completed in ${results.elapsedTimeMs}ms. ${results.totalTests} tests run ${results.totalSuccesses} succeeded ${results.totalFailures} failed.`);
    }
    printPrettyStackTrace(error) {
        console.log(error.message);
        /* Temporarily disable pretty stack traces due to an unexpected parse error popping up for some errors.
        const prettyStack = createCallsiteRecord({forError: error}).renderSync({
            // TODO: Determine whether to default node_module stripping to true
            stackFilter(frame) {
                return !frame.fileName.includes("node_modules");
            },

            frameSize: 3
        });
        console.log(prettyStack + "\n\n");
        */
    }
}

const StockReporterMap = {
    "basic": BasicReporter,
    "fancy": FancyReporter
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU3RvY2tSZXBvcnRlck1hcC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9SZXBvcnRlci9TdG9jay9TdG9ja1JlcG9ydGVyTWFwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBQyxhQUFhLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUM5QyxPQUFPLEVBQUMsYUFBYSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFFOUMsTUFBTSxnQkFBZ0IsR0FBRztJQUNyQixPQUFPLEVBQUUsYUFBYTtJQUN0QixPQUFPLEVBQUUsYUFBYTtDQUN6QixDQUFDO0FBRUYsT0FBTyxFQUFDLGdCQUFnQixFQUFDLENBQUMifQ==

class ModuleResolver {
    constructor(testRunner) {
        this.testRunner = testRunner;
    }
    /**
     * A helper method which will resolve modules matching the input glob.
     * @param inputGlobs
     * @return a promise which will be resolved when all modules are.
     */
    resolveGlob(inputGlobs) {
        return fastGlob(inputGlobs)
            .then((resolvedEntries) => {
            for (const entry of resolvedEntries) {
                const resolvedPath = resolve(entry.toString());
                this.testRunner.setCurrentFile(resolvedPath);
                require(resolvedPath);
            }
        });
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTW9kdWxlUmVzb2x2ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvTW9kdWxlUmVzb2x2ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxRQUFRLE1BQU0sV0FBVyxDQUFDO0FBQ2pDLE9BQU8sS0FBSyxJQUFJLE1BQU0sTUFBTSxDQUFDO0FBRzdCLE1BQU0sY0FBYztJQUloQixZQUFZLFVBQXNCO1FBQzlCLElBQUksQ0FBQyxVQUFVLEdBQUcsVUFBVSxDQUFDO0lBQ2pDLENBQUM7SUFFRDs7OztPQUlHO0lBQ0ksV0FBVyxDQUFDLFVBQW9CO1FBQ25DLE9BQU8sUUFBUSxDQUFDLFVBQVUsQ0FBQzthQUN0QixJQUFJLENBQUMsQ0FBQyxlQUFlLEVBQUUsRUFBRTtZQUN0QixLQUFLLE1BQU0sS0FBSyxJQUFJLGVBQWUsRUFBRTtnQkFDakMsTUFBTSxZQUFZLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztnQkFDcEQsSUFBSSxDQUFDLFVBQVUsQ0FBQyxjQUFjLENBQUMsWUFBWSxDQUFDLENBQUM7Z0JBQzdDLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQzthQUN6QjtRQUNMLENBQUMsQ0FBQyxDQUFDO0lBQ1gsQ0FBQztDQUNKO0FBRUQsT0FBTyxFQUFDLGNBQWMsRUFBQyxDQUFDIn0=

const DEFAULT_TIMEOUT_MS = 100;
const DefaultConfig = {
    input: [],
    debug: false,
    debugBreak: false,
    watch: false,
    cacheDir: ".umbra-cache",
    timeoutMs: {
        it: DEFAULT_TIMEOUT_MS,
        before: DEFAULT_TIMEOUT_MS,
        beforeEach: DEFAULT_TIMEOUT_MS,
        after: DEFAULT_TIMEOUT_MS,
        afterEach: DEFAULT_TIMEOUT_MS
    },
    reporting: {
        outputPath: undefined,
        reporters: []
    },
    parallel: {
        idempotentFiles: false,
        idempotentTests: false,
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRGVmYXVsdENvbmZpZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9Db25maWcvRGVmYXVsdENvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLGtCQUFrQixHQUFHLEdBQUcsQ0FBQztBQUUvQixNQUFNLGFBQWEsR0FBZ0I7SUFDL0IsS0FBSyxFQUFFLEVBQUU7SUFDVCxLQUFLLEVBQUUsS0FBSztJQUNaLFVBQVUsRUFBRSxLQUFLO0lBQ2pCLEtBQUssRUFBRSxLQUFLO0lBQ1osUUFBUSxFQUFFLGNBQWM7SUFDeEIsU0FBUyxFQUFFO1FBQ1AsRUFBRSxFQUFFLGtCQUFrQjtRQUN0QixNQUFNLEVBQUUsa0JBQWtCO1FBQzFCLFVBQVUsRUFBRSxrQkFBa0I7UUFDOUIsS0FBSyxFQUFFLGtCQUFrQjtRQUN6QixTQUFTLEVBQUUsa0JBQWtCO0tBQ2hDO0lBQ0QsU0FBUyxFQUFFO1FBQ1AsVUFBVSxFQUFFLFNBQVM7UUFDckIsU0FBUyxFQUFFLEVBQUU7S0FDaEI7SUFDRCxRQUFRLEVBQUU7UUFDTixlQUFlLEVBQUUsS0FBSztRQUN0QixlQUFlLEVBQUUsS0FBSztLQUN6QjtDQUNKLENBQUM7QUFFRixPQUFPLEVBQUMsYUFBYSxFQUFDLENBQUMifQ==

install();
const parser = new ArgsParser();
const argConfig = parser.parse();
const configMerger = new ConfigMerger();
let finalConfig;
if (existsSync(argConfig.configPath)) {
    const cacheDir = argConfig.cacheDir ? argConfig.cacheDir : DefaultConfig.cacheDir;
    if (!existsSync(cacheDir)) {
        mkdirSync(cacheDir);
    }
    let finalPath = argConfig.configPath;
    if (extname(argConfig.configPath) === "ts") {
        finalPath = resolve(cacheDir, "config.js");
        spawnSync("tsc", ["--outFile", finalPath, argConfig.configPath], { stdio: "inherit" });
    }
    const fileConfig = require(finalPath);
    finalConfig = configMerger.merge(DefaultConfig, fileConfig, argConfig);
}
else {
    finalConfig = configMerger.merge(DefaultConfig, argConfig);
}
const runner = new TestRunner({
    timeoutMs: finalConfig.timeoutMs,
    stopOnFirstFail: false
});
const reporterNames = finalConfig.reporting.reporters;
let reporters;
if (reporterNames.length === 0) {
    reporters = [new BasicReporter()];
}
else {
    reporters = reporterNames.map((name) => {
        try {
            return require(name);
        }
        catch (e) {
            if (StockReporterMap[name]) {
                return new StockReporterMap[name]();
            }
            throw new Error(`Unable to load reporter: ${name}`);
        }
    });
}
for (const reporter of reporters) {
    runner.on("activeFileChanged", reporter.activeFileChanged.bind(reporter));
    runner.on("beforeTest", reporter.beforeTest.bind(reporter));
    runner.on("testSuccess", reporter.testSuccess.bind(reporter));
    runner.on("testFail", reporter.testFail.bind(reporter));
    runner.on("testTimeout", reporter.testTimeout.bind(reporter));
    runner.on("beforeDescribe", reporter.beforeDescribe.bind(reporter));
    runner.on("afterDescribe", reporter.afterDescribe.bind(reporter));
}
// Note: using bind results in property loss, so `it` has to be re-assigned.
const itOnly = runner.it.only.bind(runner);
const describeOnly = runner.describe.only.bind(runner);
const globalFunctions = ["it", "describe", "after", "afterEach", "before", "beforeEach"];
for (const fnName of globalFunctions) {
    global[fnName] = runner[fnName].bind(runner);
}
global["it"]["only"] = itOnly;
global["describe"]["only"] = describeOnly;
global["__testRunner"] = runner;
const moduleResolver = new ModuleResolver(runner);
Promise.all(reporters.map((reporter) => reporter.initialize()))
    .then(() => moduleResolver.resolveGlob(finalConfig.input))
    .then(() => {
    for (const reporter of reporters) {
        reporter.runStart();
    }
})
    .then(() => runner.run())
    .then((results) => {
    for (const reporter of reporters) {
        reporter.runEnd(results);
    }
})
    .catch((error) => {
    console.error(error);
    process.exit(1);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFDLFNBQVMsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN4QyxPQUFPLEtBQUssSUFBSSxNQUFNLE1BQU0sQ0FBQztBQUM3QixPQUFPLEVBQUMsVUFBVSxFQUFFLFNBQVMsRUFBQyxNQUFNLElBQUksQ0FBQztBQUN6QyxPQUFPLEVBQUMsT0FBTyxJQUFJLHVCQUF1QixFQUFDLE1BQU0sb0JBQW9CLENBQUM7QUFDdEUsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLCtCQUErQixDQUFDO0FBQ3pELE9BQU8sRUFBQyxVQUFVLEVBQWEsTUFBTSxxQkFBcUIsQ0FBQztBQUMzRCxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0sdUJBQXVCLENBQUM7QUFFbkQsT0FBTyxFQUFDLGdCQUFnQixFQUFDLE1BQU0sbUNBQW1DLENBQUM7QUFDbkUsT0FBTyxFQUFDLGNBQWMsRUFBQyxNQUFNLGtCQUFrQixDQUFDO0FBQ2hELE9BQU8sRUFBQyxhQUFhLEVBQUMsTUFBTSx3QkFBd0IsQ0FBQztBQUNyRCxPQUFPLEVBQUMsYUFBYSxFQUFDLE1BQU0sZ0NBQWdDLENBQUM7QUFFN0QsdUJBQXVCLEVBQUUsQ0FBQztBQUUxQixNQUFNLE1BQU0sR0FBRyxJQUFJLFVBQVUsRUFBRSxDQUFDO0FBQ2hDLE1BQU0sU0FBUyxHQUFlLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQztBQUU3QyxNQUFNLFlBQVksR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO0FBQ3hDLElBQUksV0FBd0IsQ0FBQztBQUM3QixJQUFJLFVBQVUsQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLEVBQUU7SUFDbEMsTUFBTSxRQUFRLEdBQUcsU0FBUyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsYUFBYSxDQUFDLFFBQVEs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
