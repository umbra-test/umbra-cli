import { ArgumentParser } from "argparse";
import * as path from "path";
class CliConfigResolver {
    constructor() {
        this.argsParser = new ArgumentParser({
            description: "Run tests using the Umbra test framework."
        });
        this.addGeneralOptions();
    }
    parse(argv) {
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
    static cloneNonNullValues(object) {
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
        return Object.keys(newObject).length > 0 ? newObject : {};
    }
    addGeneralOptions() {
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
export { CliConfigResolver };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ2xpQ29uZmlnUmVzb2x2ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvQ29uZmlnL0NsaUNvbmZpZ1Jlc29sdmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBQyxjQUFjLEVBQUMsTUFBTSxVQUFVLENBQUM7QUFDeEMsT0FBTyxLQUFLLElBQUksTUFBTSxNQUFNLENBQUM7QUErQjdCLE1BQU0saUJBQWlCO0lBR25CO1FBQ0ksSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLGNBQWMsQ0FBQztZQUNqQyxXQUFXLEVBQUUsMkNBQTJDO1NBQzNELENBQUMsQ0FBQztRQUNILElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO0lBQzdCLENBQUM7SUFFRCxLQUFLLENBQUMsSUFBYztRQUNoQixNQUFNLGVBQWUsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN4RCxPQUFPLGlCQUFpQixDQUFDLGtCQUFrQixDQUFDO1lBQ3hDLEtBQUssRUFBRSxlQUFlLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLGVBQWUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUk7WUFDNUUsVUFBVSxFQUFFLGVBQWUsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsZUFBZSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJO1lBQ3hGLEtBQUssRUFBRSxlQUFlLENBQUMsS0FBSztZQUM1QixVQUFVLEVBQUUsZUFBZSxDQUFDLFVBQVU7WUFDdEMsS0FBSyxFQUFFLGVBQWUsQ0FBQyxLQUFLO1NBQy9CLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRCw4R0FBOEc7SUFDdEcsTUFBTSxDQUFDLGtCQUFrQixDQUFJLE1BQVM7UUFDMUMsTUFBTSxTQUFTLEdBQUcsRUFBRSxDQUFDO1FBQ3JCLEtBQUssTUFBTSxHQUFHLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRTtZQUNuQyxNQUFNLEtBQUssR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7WUFFMUIsSUFBSSxPQUFPLEtBQUssS0FBSyxXQUFXLElBQUksS0FBSyxJQUFJLElBQUksRUFBRTtnQkFDL0MsU0FBUzthQUNaO1lBRUQsaUZBQWlGO1lBQ2pGLElBQUksT0FBTyxLQUFLLEtBQUssU0FBUyxJQUFJLENBQUMsS0FBSyxFQUFFO2dCQUN0QyxTQUFTO2FBQ1o7WUFFRCxTQUFTLENBQUMsR0FBRyxDQUFDLEdBQUcsS0FBSyxDQUFDO1NBQzFCO1FBRUQsT0FBTyxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQWMsQ0FBQyxDQUFDLENBQUMsRUFBTyxDQUFDO0lBQ3hFLENBQUM7SUFFTyxpQkFBaUI7UUFDckIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsT0FBTyxFQUFFO1lBQ2pDLElBQUksRUFBRSxvREFBb0Q7WUFDMUQsUUFBUSxFQUFFLEtBQUs7WUFDZixNQUFNLEVBQUUsUUFBUTtZQUNoQixLQUFLLEVBQUUsR0FBRztTQUNiLENBQUMsQ0FBQztRQUVILElBQUksQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLENBQUMsSUFBSSxFQUFFLFNBQVMsRUFBRSxXQUFXLENBQUMsRUFBRTtZQUN4RCxJQUFJLEVBQUUsMkJBQTJCO1lBQ2pDLFFBQVEsRUFBRSxLQUFLO1lBQ2YsTUFBTSxFQUFFLFdBQVc7WUFDbkIsSUFBSSxFQUFFLE9BQU87U0FDaEIsQ0FBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsQ0FBQyxLQUFLLEVBQUUsYUFBYSxFQUFFLGVBQWUsRUFBRSxpQkFBaUIsQ0FBQyxFQUFFO1lBQ3BGLElBQUksRUFBRSxzRUFBc0U7WUFDNUUsUUFBUSxFQUFFLEtBQUs7WUFDZixNQUFNLEVBQUUsV0FBVztZQUNuQixJQUFJLEVBQUUsWUFBWTtTQUNyQixDQUFDLENBQUM7UUFFSCxJQUFJLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxDQUFDLElBQUksRUFBRSxTQUFTLENBQUMsRUFBRTtZQUMzQyxJQUFJLEVBQUUsNEZBQTRGO1lBQ2xHLFFBQVEsRUFBRSxLQUFLO1lBQ2YsTUFBTSxFQUFFLFdBQVc7WUFDbkIsSUFBSSxFQUFFLE9BQU87U0FDaEIsQ0FBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsQ0FBQyxJQUFJLEVBQUUsVUFBVSxDQUFDLEVBQUU7WUFDNUMsSUFBSSxFQUFFLDRCQUE0QjtZQUNsQyxRQUFRLEVBQUUsS0FBSztZQUNmLElBQUksRUFBRSxZQUFZO1NBQ3JCLENBQUMsQ0FBQztJQUNQLENBQUM7Q0FDSjtBQUVELE9BQU8sRUFBQyxpQkFBaUIsRUFBWSxDQUFDIn0=