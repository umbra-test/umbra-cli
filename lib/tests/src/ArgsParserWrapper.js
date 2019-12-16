"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const argparse_1 = require("argparse");
class ArgsParserWrapper {
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
exports.ArgsParserWrapper = ArgsParserWrapper;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQXJnc1BhcnNlcldyYXBwZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvQXJnc1BhcnNlcldyYXBwZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSx1Q0FBd0M7QUFFeEMsTUFBTSxpQkFBaUI7SUFJbkI7UUFIaUIsdUJBQWtCLEdBQUcsR0FBRyxDQUFDO1FBSXRDLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSx5QkFBYyxDQUFDO1lBQ2pDLFdBQVcsRUFBRSwyQ0FBMkM7U0FDM0QsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUM7UUFDekIsSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUM7UUFDekIsSUFBSSxDQUFDLG1CQUFtQixFQUFFLENBQUM7UUFDM0IsSUFBSSxDQUFDLGtCQUFrQixFQUFFLENBQUM7SUFDOUIsQ0FBQztJQUVELEtBQUs7UUFDRCxNQUFNLGVBQWUsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBRXBELDJCQUEyQjtRQUUzQixPQUFPO1lBQ0gsS0FBSyxFQUFFLGVBQWUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQy9CLEtBQUssRUFBRSxlQUFlLENBQUMsS0FBSztZQUM1QixVQUFVLEVBQUUsZUFBZSxDQUFDLFFBQVE7WUFDcEMsS0FBSyxFQUFFLGVBQWUsQ0FBQyxLQUFLO1lBQzVCLFFBQVEsRUFBRSxlQUFlLENBQUMsUUFBUTtZQUNsQyxTQUFTLEVBQUU7Z0JBQ1AsRUFBRSxFQUFFLGVBQWUsQ0FBQyxXQUFXO2dCQUMvQixNQUFNLEVBQUUsZUFBZSxDQUFDLGVBQWU7Z0JBQ3ZDLFVBQVUsRUFBRSxlQUFlLENBQUMsbUJBQW1CO2dCQUMvQyxLQUFLLEVBQUUsZUFBZSxDQUFDLGNBQWM7Z0JBQ3JDLFNBQVMsRUFBRSxlQUFlLENBQUMsa0JBQWtCO2FBQ2hEO1lBQ0QsU0FBUyxFQUFFO2dCQUNQLFNBQVMsRUFBRSxlQUFlLENBQUMsU0FBUztnQkFDcEMsVUFBVSxFQUFFLGVBQWUsQ0FBQyxVQUFVO2FBQ3pDO1lBQ0QsUUFBUSxFQUFFO2dCQUNOLGVBQWUsRUFBRSxlQUFlLENBQUMsZUFBZTtnQkFDaEQsZUFBZSxFQUFFLGVBQWUsQ0FBQyxlQUFlO2FBQ25EO1NBQ0osQ0FBQTtJQUNMLENBQUM7SUFFTyxpQkFBaUI7UUFDckIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsT0FBTyxFQUFFO1lBQ2pDLElBQUksRUFBRSxvREFBb0Q7WUFDMUQsTUFBTSxFQUFFLFFBQVE7WUFDaEIsS0FBSyxFQUFFLEdBQUc7U0FDYixDQUFDLENBQUM7UUFFSCxJQUFJLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxDQUFDLElBQUksRUFBRSxTQUFTLENBQUMsRUFBRTtZQUMzQyxJQUFJLEVBQUUsMkJBQTJCO1lBQ2pDLFFBQVEsRUFBRSxLQUFLO1lBQ2YsTUFBTSxFQUFFLFdBQVc7WUFDbkIsSUFBSSxFQUFFLE9BQU87U0FDaEIsQ0FBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsQ0FBQyxLQUFLLEVBQUUsYUFBYSxDQUFDLEVBQUU7WUFDaEQsSUFBSSxFQUFFLHNFQUFzRTtZQUM1RSxRQUFRLEVBQUUsS0FBSztZQUNmLE1BQU0sRUFBRSxXQUFXO1lBQ25CLElBQUksRUFBRSxVQUFVO1NBQ25CLENBQUMsQ0FBQztRQUVILElBQUksQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLENBQUMsSUFBSSxFQUFFLFNBQVMsQ0FBQyxFQUFFO1lBQzNDLElBQUksRUFBRSw0RkFBNEY7WUFDbEcsUUFBUSxFQUFFLEtBQUs7WUFDZixNQUFNLEVBQUUsV0FBVztZQUNuQixJQUFJLEVBQUUsT0FBTztTQUNoQixDQUFDLENBQUM7UUFFSCxJQUFJLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxDQUFDLElBQUksRUFBRSxVQUFVLENBQUMsRUFBRTtZQUM1QyxJQUFJLEVBQUUsNEJBQTRCO1lBQ2xDLFFBQVEsRUFBRSxLQUFLO1lBQ2YsSUFBSSxFQUFFLFFBQVE7WUFDZCxZQUFZLEVBQUUsbUJBQW1CO1NBQ3BDLENBQUMsQ0FBQztRQUVILElBQUksQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLENBQUMsWUFBWSxDQUFDLEVBQUU7WUFDeEMsSUFBSSxFQUFFLGtGQUFrRjtZQUN4RixRQUFRLEVBQUUsS0FBSztZQUNmLElBQUksRUFBRSxVQUFVO1lBQ2hCLFlBQVksRUFBRSxjQUFjO1NBQy9CLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFTyxpQkFBaUI7UUFDckIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsQ0FBQyxhQUFhLENBQUMsRUFBRTtZQUN6QyxJQUFJLEVBQUUsOEhBQThIO1lBQ3BJLFFBQVEsRUFBRSxLQUFLO1lBQ2YsWUFBWSxFQUFFLElBQUksQ0FBQyxrQkFBa0I7WUFDckMsSUFBSSxFQUFFLFdBQVc7U0FDcEIsQ0FBQyxDQUFDO1FBRUgsS0FBSyxNQUFNLEtBQUssSUFBSSxDQUFDLElBQUksRUFBRSxRQUFRLEVBQUUsWUFBWSxFQUFFLE9BQU8sRUFBRSxXQUFXLENBQUMsRUFBRTtZQUN0RSxJQUFJLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxDQUFDLEtBQUssS0FBSyxXQUFXLENBQUMsRUFBRTtnQkFDakQsSUFBSSxFQUFFLGtEQUFrRCxLQUFLLDZEQUE2RDtnQkFDMUgsUUFBUSxFQUFFLEtBQUs7Z0JBQ2YsWUFBWSxFQUFFLElBQUksQ0FBQyxrQkFBa0I7Z0JBQ3JDLElBQUksRUFBRSxHQUFHLEtBQUssV0FBVzthQUM1QixDQUFDLENBQUM7U0FDTjtJQUNMLENBQUM7SUFFTyxtQkFBbUI7UUFDdkIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsQ0FBQyxJQUFJLEVBQUUsY0FBYyxDQUFDLEVBQUU7WUFDaEQsSUFBSSxFQUFFLHFEQUFxRDtZQUMzRCxRQUFRLEVBQUUsS0FBSztZQUNmLElBQUksRUFBRSxZQUFZO1NBQ3JCLENBQUMsQ0FBQztRQUVILElBQUksQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLENBQUMsSUFBSSxFQUFFLGFBQWEsQ0FBQyxFQUFFO1lBQy9DLElBQUksRUFBRSxxREFBcUQ7WUFDM0QsUUFBUSxFQUFFLEtBQUs7WUFDZixNQUFNLEVBQUUsUUFBUTtZQUNoQixZQUFZLEVBQUUsRUFBRTtZQUNoQixJQUFJLEVBQUUsV0FBVztTQUNwQixDQUFDLENBQUM7SUFDUCxDQUFDO0lBRU8sa0JBQWtCO1FBQ3RCLElBQUksQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLENBQUMsbUJBQW1CLENBQUMsRUFBRTtZQUMvQyxJQUFJLEVBQUUsNEZBQTRGO1lBQ2xHLFFBQVEsRUFBRSxLQUFLO1lBQ2YsTUFBTSxFQUFFLFdBQVc7WUFDbkIsSUFBSSxFQUFFLGlCQUFpQjtTQUMxQixDQUFDLENBQUM7UUFFSCxJQUFJLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxDQUFDLG1CQUFtQixDQUFDLEVBQUU7WUFDL0MsSUFBSSxFQUFFLHVIQUF1SDtZQUM3SCxRQUFRLEVBQUUsS0FBSztZQUNmLE1BQU0sRUFBRSxXQUFXO1lBQ25CLElBQUksRUFBRSxpQkFBaUI7U0FDMUIsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztDQUVKO0FBRU8sOENBQWlCIn0=