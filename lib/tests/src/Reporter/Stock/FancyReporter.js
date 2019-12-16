"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = require("chalk");
const ansi_escapes_1 = require("ansi-escapes");
const WriteStreamInterceptor_1 = require("../../WriteStreamInterceptor");
const callsite_record_1 = require("callsite-record");
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
    constructor(stdOutInterceptor = new WriteStreamInterceptor_1.WriteStreamInterceptor(), stdErrInterceptor = new WriteStreamInterceptor_1.WriteStreamInterceptor()) {
        this.timer = null;
        this.currentIndentLevel = 0;
        this.lines = [];
        this.spinnerIndex = 0;
        this.spinnerIcons = ["◴", "◷", "◶", "◵"]; //["🌑", "🌒", "🌓", "🌔", "🌕", "🌝", "🌖", "🌗", "🌘", "🌚"];
        this.activeFileChanged = (absolutePath) => {
            this.activeFilePath = absolutePath;
            this.lines.push(chalk_1.default.cyan(">>") + ` ${this.activeFilePath}`);
        };
        this.afterDescribe = (title, elapsedMs) => {
            this.currentIndentLevel--;
        };
        this.beforeDescribe = (title) => {
            this.writeLine(this.getIndentedText(chalk_1.default.cyan("⤷") + ` ${title}`));
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
            const prettyStack = callsite_record_1.default({ forError: error }).renderSync({
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
        this.writeLine(`\n${chalk_1.default.whiteBright("☾")} Umbra Test`);
        this.writeLine(chalk_1.default.white(`⤷ All logs will be intercepted and written to a local file.`));
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
        this.stdOutInterceptor.writeDirect(this.getIndentedText(chalk_1.default.yellow(this.spinnerIcons[this.spinnerIndex]) + " " + text));
        this.stdOutInterceptor.writeDirect(ansi_escapes_1.default.cursorLeft);
        this.stdOutInterceptor.writeDirect(ansi_escapes_1.default.cursorForward(this.currentIndentLevel + 1));
        this.timer = setInterval(() => {
            this.stdOutInterceptor.writeDirect(ansi_escapes_1.default.cursorBackward(1));
            this.spinnerIndex = (this.spinnerIndex + 1) % (this.spinnerIcons.length - 1);
            this.stdOutInterceptor.writeDirect(chalk_1.default.yellow(this.spinnerIcons[this.spinnerIndex]));
        }, 200);
    }
    stopSpinner(result) {
        clearInterval(this.timer);
        this.stdOutInterceptor.writeDirect(ansi_escapes_1.default.cursorBackward(1));
        if (result === TestResult.FAIL) {
            this.stdOutInterceptor.writeDirect(chalk_1.default.redBright("✘"));
        }
        else if (result === TestResult.SUCCESS) {
            this.stdOutInterceptor.writeDirect(chalk_1.default.greenBright("✓"));
        }
        else if (result === TestResult.TIMEOUT) {
            this.stdOutInterceptor.writeDirect(chalk_1.default.redBright("⏲"));
        }
        this.stdOutInterceptor.writeDirect(ansi_escapes_1.default.cursorNextLine);
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
exports.FancyReporter = FancyReporter;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRmFuY3lSZXBvcnRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9SZXBvcnRlci9TdG9jay9GYW5jeVJlcG9ydGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBR0EsaUNBQTBCO0FBQzFCLCtDQUF1QztBQUN2Qyx5RUFBb0U7QUFDcEUscURBQW1EO0FBR25ELElBQUssVUFLSjtBQUxELFdBQUssVUFBVTtJQUNYLGlEQUFPLENBQUE7SUFDUCwyQ0FBSSxDQUFBO0lBQ0osaURBQU8sQ0FBQTtJQUNQLGlEQUFPLENBQUE7QUFDWCxDQUFDLEVBTEksVUFBVSxLQUFWLFVBQVUsUUFLZDtBQUVEOztHQUVHO0FBQ0gsTUFBTSxhQUFhO0lBZWYsWUFBWSxpQkFBaUIsR0FBRyxJQUFJLCtDQUFzQixFQUFFLEVBQ2hELGlCQUFpQixHQUFHLElBQUksK0NBQXNCLEVBQUU7UUFYcEQsVUFBSyxHQUFtQixJQUFJLENBQUM7UUFHN0IsdUJBQWtCLEdBQUcsQ0FBQyxDQUFDO1FBQ3ZCLFVBQUssR0FBYSxFQUFFLENBQUM7UUFFckIsaUJBQVksR0FBRyxDQUFDLENBQUM7UUFFakIsaUJBQVksR0FBRyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsK0RBQStEO1FBb0I1RyxzQkFBaUIsR0FBRyxDQUFDLFlBQW9CLEVBQUUsRUFBRTtZQUN6QyxJQUFJLENBQUMsY0FBYyxHQUFHLFlBQVksQ0FBQztZQUNuQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxlQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDLENBQUM7UUFDbEUsQ0FBQyxDQUFDO1FBRUYsa0JBQWEsR0FBRyxDQUFDLEtBQWEsRUFBRSxTQUFpQixFQUFFLEVBQUU7WUFDakQsSUFBSSxDQUFDLGtCQUFrQixFQUFFLENBQUM7UUFDOUIsQ0FB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QUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsR0FBRyxHQUFHLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUMxSCxJQUFJLENBQUMsaUJBQWlCLENBQUMsV0FBVyxDQUFDLHNCQUFXLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDM0QsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFdBQVcsQ0FBQyxzQkFBVyxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsa0JBQWtCLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUMzRixJQUFJLENBQUMsS0FBSyxHQUFHLFdBQVcsQ0FBQyxHQUFHLEVBQUU7WUFDMUIsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFdBQVcsQ0FBQyxzQkFBVyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2xFLElBQUksQ0FBQyxZQUFZLEdBQUcsQ0FBQyxJQUFJLENBQUMsWUFBWSxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDN0UsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFdBQVcsQ0FBQyxlQUFLLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUMzRixDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFDWixDQUFDO0lBRU8sV0FBVyxDQUFDLE1BQWtCO1FBQ2xDLGFBQWEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFFMUIsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFdBQVcsQ0FBQyxzQkFBVyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2xFLElBQUksTUFBTSxLQUFLLFVBQVUsQ0FBQyxJQUFJLEVBQUU7WUFDNUIsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFdBQVcsQ0FBQyxlQUFLLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7U0FDNUQ7YUFBTSxJQUFJLE1BQU0sS0FBSyxVQUFVLENBQUMsT0FBTyxFQUFFO1lBQ3RDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxXQUFXLENBQUMsZUFBSyxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1NBQzlEO2FBQU0sSUFBSSxNQUFNLEtBQUssVUFBVSxDQUFDLE9BQU8sRUFBRTtZQUN0QyxJQUFJLENBQUMsaUJBQWlCLENBQUMsV0FBVyxDQUFDLGVBQUssQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztTQUM1RDtRQUNELElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxXQUFXLENBQUMsc0JBQVcsQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUMvRCxJQUFJLENBQUMsaUJBQWlCLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzdDLENBQUM7SUFFTyxlQUFlLENBQUMsSUFBWTtRQUNoQyxJQUFJLEdBQUcsR0FBRyxFQUFFLENBQUM7UUFDYixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixFQUFFLENBQUMsRUFBRSxFQUFFO1lBQzlDLEdBQUcsSUFBSSxHQUFHLENBQUM7U0FDZDtRQUNELE9BQU8sR0FBRyxHQUFHLElBQUksQ0FBQztJQUN0QixDQUFDO0NBQ0o7QUFFTyxzQ0FBYSJ9