import colors from "ansi-colors";
import { deepEqual } from "@umbra-test/umbra-util";
/**
 * A basic reporter. Nothing fancy.
 */
class BasicReporter {
    constructor() {
        this.currentDescribeTitleChain = [];
    }
    initialize() {
        console.log("\n" + colors.whiteBright("☾ Umbra Test"));
        this.drawHorizontalLine();
        return Promise.resolve();
    }
    onTestStart(testInfo) {
        // Intentionally blank.
    }
    onTestEnd(testResult) {
        const describeTitleChain = testResult.testInfo.describeTitleChain;
        const indentLevel = describeTitleChain.length + 1;
        if (describeTitleChain.length > 0 && !deepEqual(this.currentDescribeTitleChain, describeTitleChain)) {
            this.currentDescribeTitleChain = describeTitleChain;
            console.log(colors.cyan("⤷ ") + describeTitleChain[0]);
            for (let i = 1; i < describeTitleChain.length; i++) {
                console.log(this.getIndentedText(colors.cyan("⤷ ") + describeTitleChain[i], i + 1));
            }
        }
        if (testResult.result === "fail") {
            console.log(this.getIndentedText(colors.redBright(`✖ `) + testResult.testInfo.title, indentLevel));
            console.log(this.getIndentedText(colors.red("⤷ Error: ") + testResult.error.message, indentLevel + 1));
        }
        else if (testResult.result === "timeout") {
            console.log(this.getIndentedText(colors.redBright(`⏲ `) + testResult.testInfo.title, indentLevel));
        }
        else if (testResult.result === "skipped") {
            console.log(this.getIndentedText(colors.yellow(`SKIPPED `) + testResult.testInfo.title, indentLevel));
        }
        else if (testResult.result === "success") {
            console.log(this.getIndentedText(colors.green(`✓ `) + testResult.testInfo.title, indentLevel));
        }
    }
    onRunEnd(results) {
        console.log(`Tests: ${colors.red(results.totalFailures.toString())} failures, ${colors.yellow(results.totalTimeouts.toString())} timeouts, ${colors.green(results.totalSuccesses.toString())} passed, ${results.totalTests} total`);
        console.log(`Time:  ${results.elapsedTimeMs}ms`);
        //console.log(`Files: ${this.filesEvaluated}`);
    }
    getIndentedText(text, indentLevel) {
        let str = "";
        for (let i = 0; i < indentLevel; i++) {
            str += " ";
        }
        return str + text;
    }
    drawHorizontalLine() {
        for (let i = 0; i < process.stdout.columns - 1; i++) {
            process.stdout.write("\u2500");
        }
        process.stdout.write("\n");
    }
}
export { BasicReporter };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQmFzaWNSZXBvcnRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9SZXBvcnRlci9TdG9jay9CYXNpY1JlcG9ydGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sTUFBTSxNQUFNLGFBQWEsQ0FBQztBQUNqQyxPQUFPLEVBQUMsU0FBUyxFQUFDLE1BQU0sd0JBQXdCLENBQUM7QUFJakQ7O0dBRUc7QUFDSCxNQUFNLGFBQWE7SUFBbkI7UUFDWSw4QkFBeUIsR0FBYSxFQUFFLENBQUM7SUF3RHJELENBQUM7SUF0REcsVUFBVTtRQUNOLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxHQUFHLE1BQU0sQ0FBQyxXQUFXLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQztRQUN2RCxJQUFJLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztRQUUxQixPQUFPLE9BQU8sQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUM3QixDQUFDO0lBRUQsV0FBVyxDQUFDLFFBQWtCO1FBQzFCLHVCQUF1QjtJQUMzQixDQUFDO0lBRUQsU0FBUyxDQUFDLFVBQXNCO1FBQzVCLE1BQU0sa0JBQWtCLEdBQUcsVUFBVSxDQUFDLFFBQVEsQ0FBQyxrQkFBa0IsQ0FBQztRQUNsRSxNQUFNLFdBQVcsR0FBRyxrQkFBa0IsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO1FBQ2xELElBQUksa0JBQWtCLENBQUMsTUFBTSxHQUFHLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMseUJBQXlCLEVBQUUsa0JBQWtCLENBQUMsRUFBRTtZQUNqRyxJQUFJLENBQUMseUJBQXlCLEdBQUcsa0JBQWtCLENBQUM7WUFDcEQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLGtCQUFrQixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDdkQsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLGtC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