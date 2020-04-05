import chalk from "chalk";
import createCallsiteRecord from "callsite-record";
var TestResult;
(function (TestResult) {
    TestResult[TestResult["SUCCESS"] = 0] = "SUCCESS";
    TestResult[TestResult["FAIL"] = 1] = "FAIL";
    TestResult[TestResult["SKIPPED"] = 2] = "SKIPPED";
    TestResult[TestResult["TIMEOUT"] = 3] = "TIMEOUT";
})(TestResult || (TestResult = {}));
/**
 * A basic reporter. Nothing fancy.
 */
class BasicReporter {
    constructor() {
        this.currentIndentLevel = 0;
        this.passes = 0;
        this.failures = 0;
        this.pending = 0;
        this.activeFileChanged = (absolutePath) => {
            this.activeFilePath = absolutePath;
        };
        this.afterDescribe = (title, elapsedMs) => {
            this.currentIndentLevel--;
        };
        this.beforeDescribe = (title) => {
            console.log(this.getIndentedText(chalk.cyan("⤷") + ` ${title}`));
            this.currentIndentLevel++;
        };
        this.beforeTest = (title) => {
            console.log(this.getIndentedText(chalk.cyan("⤷") + ` ${title}`));
            this.pending++;
            this.currentIndentLevel++;
        };
        this.runEnd = (results) => {
            // Intentionally blank.
        };
        this.runStart = () => {
            // Intentionally blank.
        };
        this.testFail = (title, error, elapsedMs) => {
            const prettyStack = createCallsiteRecord({ forError: error }).renderSync({
                /* TODO: Determine whether to default node_module stripping to true
                stackFilter(frame) {
                    return !frame.fileName.includes("node_modules");
                },
                 */
                frameSize: 3
            });
            console.log(this.getIndentedText(chalk.redBright(`FAIL`)));
            console.log(prettyStack + "\n\n");
            this.pending--;
            this.failures++;
            this.currentIndentLevel--;
        };
        this.testTimeout = (title, elapsedMs, timeoutMs) => {
            console.log(this.getIndentedText(chalk.redBright(` TIMED OUT`)));
            this.pending--;
            this.failures++;
            this.currentIndentLevel--;
        };
        this.testSkipped = (title) => {
            this.pending--;
            this.currentIndentLevel--;
        };
        this.testSuccess = (title, elapsedMs) => {
            this.pending--;
            this.passes++;
            this.currentIndentLevel--;
        };
    }
    initialize() {
        console.log(`\n${chalk.whiteBright("☾")} Umbra Test`);
        this.drawHorizontalLine();
        return Promise.resolve();
    }
    drawHorizontalLine() {
        for (let i = 0; i < process.stdout.columns; i++) {
            process.stdout.write("\u2500");
        }
        process.stdout.write("\n");
    }
    getIndentedText(text) {
        let str = "";
        for (let i = 0; i < this.currentIndentLevel; i++) {
            str += " ";
        }
        return str + text;
    }
}
export { BasicReporter };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQmFzaWNSZXBvcnRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9SZXBvcnRlci9TdG9jay9CYXNpY1JlcG9ydGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUdBLE9BQU8sS0FBSyxNQUFNLE9BQU8sQ0FBQztBQUMxQixPQUFPLG9CQUFvQixNQUFNLGlCQUFpQixDQUFDO0FBR25ELElBQUssVUFLSjtBQUxELFdBQUssVUFBVTtJQUNYLGlEQUFPLENBQUE7SUFDUCwyQ0FBSSxDQUFBO0lBQ0osaURBQU8sQ0FBQTtJQUNQLGlEQUFPLENBQUE7QUFDWCxDQUFDLEVBTEksVUFBVSxLQUFWLFVBQVUsUUFLZDtBQUVEOztHQUVHO0FBQ0gsTUFBTSxhQUFhO0lBQW5CO1FBR1ksdUJBQWtCLEdBQUcsQ0FBQyxDQUFDO1FBRXZCLFdBQU0sR0FBVyxDQUFDLENBQUM7UUFDbkIsYUFBUSxHQUFXLENBQUMsQ0FBQztRQUNyQixZQUFPLEdBQVcsQ0FBQyxDQUFDO1FBUzVCLHNCQUFpQixHQUFHLENBQUMsWUFBb0IsRUFBRSxFQUFFO1lBQ3pDLElBQUksQ0FBQyxjQUFjLEdBQUcsWUFBWSxDQUFDO1FBQ3ZDLENBQUMsQ0FBQztRQUVGLGtCQUFhLEdBQUcsQ0FBQyxLQUFhLEVBQUUsU0FBaUIsRUFBRSxFQUFFO1lBQ2pELElBQUksQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO1FBQzlCLENBQUMsQ0FBQztRQUVGLG1CQUFjLEdBQUcsQ0FBQyxLQUFhLEVBQUUsRUFBRTtZQUMvQixPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxJQUFJLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQztZQUVqRSxJQUFJLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztRQUM5QixDQUFDLENBQUM7UUFFRixlQUFVLEdBQUcsQ0FBQyxLQUFhLEVBQUUsRUFBRTtZQUMzQixPQUFPLENB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