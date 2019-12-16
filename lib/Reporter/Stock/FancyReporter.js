import chalk from "chalk";
import ansiEscapes from "ansi-escapes";
import { WriteStreamInterceptor } from "../../WriteStreamInterceptor";
import createCallsiteRecord from "callsite-record";
var TestResult;
(function (TestResult) {
    TestResult[TestResult["SUCCESS"] = 0] = "SUCCESS";
    TestResult[TestResult["FAIL"] = 1] = "FAIL";
    TestResult[TestResult["SKIPPED"] = 2] = "SKIPPED";
    TestResult[TestResult["TIMEOUT"] = 3] = "TIMEOUT";
})(TestResult || (TestResult = {}));
/**
 * A port of Mocha's nyan reporter, for obvious reasons.
 */
class FancyReporter {
    constructor(stdOutInterceptor = new WriteStreamInterceptor(), stdErrInterceptor = new WriteStreamInterceptor()) {
        this.timer = null;
        this.currentIndentLevel = 0;
        this.lines = [];
        this.spinnerIndex = 0;
        this.spinnerIcons = ["◴", "◷", "◶", "◵"]; //["🌑", "🌒", "🌓", "🌔", "🌕", "🌝", "🌖", "🌗", "🌘", "🌚"];
        this.activeFileChanged = (absolutePath) => {
            this.activeFilePath = absolutePath;
            this.lines.push(chalk.cyan(">>") + ` ${this.activeFilePath}`);
        };
        this.afterDescribe = (title, elapsedMs) => {
            this.currentIndentLevel--;
        };
        this.beforeDescribe = (title) => {
            this.writeLine(this.getIndentedText(chalk.cyan("⤷") + ` ${title}`));
            this.currentIndentLevel++;
        };
        this.beforeTest = (title) => {
            this.startSpinner(title);
            this.pending++;
            this.currentIndentLevel++;
        };
        this.runEnd = (results) => {
            this.stdOutInterceptor.writeDirect("\u001B[?25h");
            this.stdOutInterceptor.stop();
            this.stdErrInterceptor.stop();
        };
        this.runStart = () => {
        };
        this.testFail = (title, error, elapsedMs) => {
            this.stopSpinner(TestResult.FAIL);
            const prettyStack = createCallsiteRecord({ forError: error }).renderSync({
                /* TODO: Determine whether to default node_module stripping to true
                stackFilter(frame) {
                    return !frame.fileName.includes("node_modules");
                },
                 */
                frameSize: 3
            });
            this.stdErrInterceptor.writeDirect(prettyStack + "\n\n");
            this.pending--;
            this.failures++;
            this.currentIndentLevel--;
        };
        this.testTimeout = (title, elapsedMs, timeoutMs) => {
            this.stopSpinner(TestResult.TIMEOUT);
            this.pending--;
            this.failures++;
            this.currentIndentLevel--;
        };
        this.testSkipped = (title) => {
            this.stopSpinner(TestResult.SKIPPED);
            this.pending--;
            this.currentIndentLevel--;
        };
        this.testSuccess = (title, elapsedMs) => {
            this.stopSpinner(TestResult.SUCCESS);
            this.pending--;
            this.passes++;
            this.currentIndentLevel--;
        };
        this.passes = 0;
        this.failures = 0;
        this.pending = 0;
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
    getIndentedText(text) {
        let str = "";
        for (let i = 0; i < this.currentIndentLevel; i++) {
            str += " ";
        }
        return str + text;
    }
}
export { FancyReporter };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRmFuY3lSZXBvcnRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9SZXBvcnRlci9TdG9jay9GYW5jeVJlcG9ydGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUdBLE9BQU8sS0FBSyxNQUFNLE9BQU8sQ0FBQztBQUMxQixPQUFPLFdBQVcsTUFBTSxjQUFjLENBQUM7QUFDdkMsT0FBTyxFQUFDLHNCQUFzQixFQUFDLE1BQU0sOEJBQThCLENBQUM7QUFDcEUsT0FBTyxvQkFBb0IsTUFBTSxpQkFBaUIsQ0FBQztBQUduRCxJQUFLLFVBS0o7QUFMRCxXQUFLLFVBQVU7SUFDWCxpREFBTyxDQUFBO0lBQ1AsMkNBQUksQ0FBQTtJQUNKLGlEQUFPLENBQUE7SUFDUCxpREFBTyxDQUFBO0FBQ1gsQ0FBQyxFQUxJLFVBQVUsS0FBVixVQUFVLFFBS2Q7QUFFRDs7R0FFRztBQUNILE1BQU0sYUFBYTtJQWVmLFlBQVksaUJBQWlCLEdBQUcsSUFBSSxzQkFBc0IsRUFBRSxFQUNoRCxpQkFBaUIsR0FBRyxJQUFJLHNCQUFzQixFQUFFO1FBWHBELFVBQUssR0FBbUIsSUFBSSxDQUFDO1FBRzdCLHVCQUFrQixHQUFHLENBQUMsQ0FBQztRQUN2QixVQUFLLEdBQWEsRUFBRSxDQUFDO1FBRXJCLGlCQUFZLEdBQUcsQ0FBQyxDQUFDO1FBRWpCLGlCQUFZLEdBQUcsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLCtEQUErRDtRQW9CNUcsc0JBQWlCLEdBQUcsQ0FBQyxZQUFvQixFQUFFLEVBQUU7WUFDekMsSUFBSSxDQUFDLGNBQWMsR0FBRyxZQUFZLENBQUM7WUFDbkMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQyxDQUFDO1FBQ2xFLENBQUMsQ0FBQztRQUVGLGtC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