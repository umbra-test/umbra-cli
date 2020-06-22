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
    onTestResult(testResult) {
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
            console.log(this.getIndentedText(colors.red("⤷ Error: ") + testResult.error.message, indentLevel));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQmFzaWNSZXBvcnRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9SZXBvcnRlci9TdG9jay9CYXNpY1JlcG9ydGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sTUFBTSxNQUFNLGFBQWEsQ0FBQztBQUVqQyxPQUFPLEVBQUMsU0FBUyxFQUFDLE1BQU0sd0JBQXdCLENBQUM7QUFJakQ7O0dBRUc7QUFDSCxNQUFNLGFBQWE7SUFBbkI7UUFDWSw4QkFBeUIsR0FBYSxFQUFFLENBQUM7SUF3RHJELENBQUM7SUF0REcsVUFBVTtRQUNOLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxHQUFHLE1BQU0sQ0FBQyxXQUFXLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQztRQUN2RCxJQUFJLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztRQUUxQixPQUFPLE9BQU8sQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUM3QixDQUFDO0lBRUQsV0FBVyxDQUFDLFFBQWtCO1FBQzFCLHVCQUF1QjtJQUMzQixDQUFDO0lBRUQsWUFBWSxDQUFDLFVBQXVCO1FBQ2hDLE1BQU0sa0JBQWtCLEdBQUcsVUFBVSxDQUFDLFFBQVEsQ0FBQyxrQkFBa0IsQ0FBQztRQUNsRSxNQUFNLFdBQVcsR0FBRyxrQkFBa0IsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO1FBQ2xELElBQUksa0JBQWtCLENBQUMsTUFBTSxHQUFHLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMseUJBQXlCLEVBQUUsa0JBQWtCLENBQUMsRUFBRTtZQUNqRyxJQUFJLENBQUMseUJBQXlCLEdBQUcsa0JBQWtCLENBQUM7WUFDcEQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLGtCQUFrQixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDdkQsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLGtC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