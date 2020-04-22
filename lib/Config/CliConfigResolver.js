import { SimpleArgParser } from "./SimpleArgParser";
class CliConfigResolver {
    constructor(argParser = new SimpleArgParser()) {
        this.argParser = argParser;
    }
    parse(argv) {
        const results = this.argParser
            .addArgument("input", [], "Files, or globs, to run with the Umbra Test Runner", false, "trailing")
            .addArgument("debug", ["-d", "--inspect"], "Enables the Node debugger", false, "boolean")
            .addArgument("debugBreak", ["-db", "--debug-brk", "--debug-break", "--inspect-break"], "Enables the Node debugger, breaking once the first test is evaluated", false, "boolean")
            .addArgument("watch", ["-w"], "Enables watch mode, which will evaluate all tests first and then again once changes occur", false, "boolean")
            .addArgument("configPath", ["--config", "-c"], "Sets the config file path", false, "string")
            .parse(argv);
        return results;
    }
}
export { CliConfigResolver };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ2xpQ29uZmlnUmVzb2x2ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvQ29uZmlnL0NsaUNvbmZpZ1Jlc29sdmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBQyxlQUFlLEVBQUMsTUFBTSxtQkFBbUIsQ0FBQztBQThCbEQsTUFBTSxpQkFBaUI7SUFHbkIsWUFBWSxTQUFTLEdBQUcsSUFBSSxlQUFlLEVBQUU7UUFDekMsSUFBSSxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUM7SUFDL0IsQ0FBQztJQUVELEtBQUssQ0FBQyxJQUFjO1FBQ2hCLE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxTQUFTO2FBQ3pCLFdBQVcsQ0FBQyxPQUFPLEVBQUUsRUFBRSxFQUFFLG9EQUFvRCxFQUFFLEtBQUssRUFBRSxVQUFVLENBQUM7YUFDakcsV0FBVyxDQUFDLE9BQU8sRUFBRSxDQUFDLElBQUksRUFBRSxXQUFXLENBQUMsRUFBRSwyQkFBMkIsRUFBRSxLQUFLLEVBQUUsU0FBUyxDQUFDO2FBQ3hGLFdBQVcsQ0FBQyxZQUFZLEVBQUUsQ0FBQyxLQUFLLEVBQUUsYUFBYSxFQUFFLGVBQWUsRUFBRSxpQkFBaUIsQ0FBQyxFQUFFLHNFQUFzRSxFQUFFLEtBQUssRUFBRSxTQUFTLENBQUM7YUFDL0ssV0FBVyxDQUFDLE9BQU8sRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFLDJGQUEyRixFQUFFLEtBQUssRUFBRSxTQUFTLENBQUM7YUFDM0ksV0FBVyxDQUFDLFlBQVksRUFBRSxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsRUFBRSwyQkFBMkIsRUFBRSxLQUFLLEVBQUUsUUFBUSxDQUFDO2FBQzNGLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUVqQixPQUFPLE9BQW9CLENBQUM7SUFDaEMsQ0FBQztDQUNKO0FBRUQsT0FBTyxFQUFDLGlCQUFpQixFQUFZLENBQUMifQ==