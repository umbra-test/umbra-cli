"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = require("chalk");
const callsite_record_1 = require("callsite-record");
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
            console.log(this.getIndentedText(chalk_1.default.cyan("⤷") + ` ${title}`));
            this.currentIndentLevel++;
        };
        this.beforeTest = (title) => {
            console.log(this.getIndentedText(chalk_1.default.cyan("⤷") + ` ${title}`));
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
            const prettyStack = callsite_record_1.default({ forError: error }).renderSync({
                /* TODO: Determine whether to default node_module stripping to true
                stackFilter(frame) {
                    return !frame.fileName.includes("node_modules");
                },
                 */
                frameSize: 3
            });
            console.log(this.getIndentedText(chalk_1.default.redBright(`FAIL`)));
            console.log(prettyStack + "\n\n");
            this.pending--;
            this.failures++;
            this.currentIndentLevel--;
        };
        this.testTimeout = (title, elapsedMs, timeoutMs) => {
            console.log(this.getIndentedText(chalk_1.default.redBright(` TIMED OUT`)));
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
        console.log(`\n${chalk_1.default.whiteBright("☾")} Umbra Test`);
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
exports.BasicReporter = BasicReporter;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQmFzaWNSZXBvcnRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9SZXBvcnRlci9TdG9jay9CYXNpY1JlcG9ydGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBR0EsaUNBQTBCO0FBQzFCLHFEQUFtRDtBQUduRCxJQUFLLFVBS0o7QUFMRCxXQUFLLFVBQVU7SUFDWCxpREFBTyxDQUFBO0lBQ1AsMkNBQUksQ0FBQTtJQUNKLGlEQUFPLENBQUE7SUFDUCxpREFBTyxDQUFBO0FBQ1gsQ0FBQyxFQUxJLFVBQVUsS0FBVixVQUFVLFFBS2Q7QUFFRDs7R0FFRztBQUNILE1BQU0sYUFBYTtJQUFuQjtRQUdZLHVCQUFrQixHQUFHLENBQUMsQ0FBQztRQUV2QixXQUFNLEdBQVcsQ0FBQyxDQUFDO1FBQ25CLGFBQVEsR0FBVyxDQUFDLENBQUM7UUFDckIsWUFBTyxHQUFXLENBQUMsQ0FBQztRQVM1QixzQkFBaUIsR0FBRyxDQUFDLFlBQW9CLEVBQUUsRUFBRTtZQUN6QyxJQUFJLENBQUMsY0FBYyxHQUFHLFlBQVksQ0FBQztRQUN2QyxDQUFDLENBQUM7UUFFRixrQkFBYSxHQUFHLENBQUMsS0FBYSxFQUFFLFNBQWlCLEVBQUUsRUFBRTtZQUNqRCxJQUFJLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztRQUM5QixDQUFDLENBQUM7UUFFRixtQkFBYyxHQUFHLENBQUMsS0FBYSxFQUFFLEVBQUU7WUFDL0IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLGVBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsSUFBSSxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFFakUsSUFBSSxDQUFDLGtCQUFrQixFQUFFLENBQUM7UUFDOUIsQ0FBQyxDQUFDO1FBRUYsZUFBVSxHQUFHLENBQUMsS0FBYSxFQUFFLEVBQUU7WUFDM0IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFD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