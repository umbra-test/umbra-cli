"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ansi_escapes_1 = require("ansi-escapes");
const callsite_record_1 = require("callsite-record");
const chalk_1 = require("chalk");
const WriteStreamInterceptor_1 = require("../../WriteStreamInterceptor");
const BaseReporter_1 = require("./BaseReporter");
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
class FancyReporter extends BaseReporter_1.BaseReporter {
    constructor(stdOutInterceptor = new WriteStreamInterceptor_1.WriteStreamInterceptor(), stdErrInterceptor = new WriteStreamInterceptor_1.WriteStreamInterceptor()) {
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
        this.writeLine(`\n${chalk_1.default.whiteBright("☾")} Umbra Test`);
        this.writeLine(chalk_1.default.white(`⤷ All logs will be intercepted and written to a local file.`));
        this.drawHorizontalLine();
        return Promise.resolve();
    }
    beforeDescribe(title) {
        this.writeLine(this.getIndentedText(chalk_1.default.cyan("⤷") + ` ${title}`));
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
        const prettyStack = callsite_record_1.default({ forError: error }).renderSync({
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
}
exports.FancyReporter = FancyReporter;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRmFuY3lSZXBvcnRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9SZXBvcnRlci9TdG9jay9GYW5jeVJlcG9ydGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsK0NBQXVDO0FBQ3ZDLHFEQUFtRDtBQUNuRCxpQ0FBMEI7QUFHMUIseUVBQW9FO0FBQ3BFLGlEQUE0QztBQUU1QyxJQUFLLFVBS0o7QUFMRCxXQUFLLFVBQVU7SUFDWCxpREFBTyxDQUFBO0lBQ1AsMkNBQUksQ0FBQTtJQUNKLGlEQUFPLENBQUE7SUFDUCxpREFBTyxDQUFBO0FBQ1gsQ0FBQyxFQUxJLFVBQVUsS0FBVixVQUFVLFFBS2Q7QUFFRDs7R0FFRztBQUNILE1BQU0sYUFBYyxTQUFRLDJCQUFZO0lBV3BDLFlBQVksaUJBQWlCLEdBQUcsSUFBSSwrQ0FBc0IsRUFBRSxFQUNoRCxpQkFBaUIsR0FBRyxJQUFJLCtDQUFzQixFQUFFO1FBQ3hELEtBQUssRUFBRSxDQUFDO1FBUkosVUFBSyxHQUFtQixJQUFJLENBQUM7UUFFN0IsaUJBQVksR0FBRyxDQUFDLENBQUM7UUFFakIsaUJBQVksR0FBRyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsK0RBQStEO1FBNEVwRyxpQkFBWSxHQUFHLENBQUMsSUFBWSxFQUFpQixFQUFFO1lBQ25ELGNBQWM7UUFDbEIsQ0FBQyxDQUFDO1FBeEVFLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxpQkFBaUIsQ0FBQztRQUMzQyxJQUFJLENBQUMsaUJBQWlCLEdBQUcsaUJBQWlCLENBQUM7SUFDL0MsQ0FBQztJQUVELFVBQVU7UUFDTixJQUFJLENBQUMsaUJBQWlCLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQ2hFLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7UUFFaEUsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUNsRCxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssZUFBSyxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDekQsSUFBSSxDQUFDLFNBQVMsQ0FBQyxlQUFLLENBQUMsS0FBSyxDQUFDLDZEQUE2RCxDQUFDLENBQUMsQ0FBQztRQUMzRixJQUFJLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztRQUUxQixPQUFPLE9BQU8sQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUM3QixDQUFDO0lBRUQsY0FBYyxDQUFDLEtBQWE7UUFDeEIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLGVBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsSUFBSSxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFFcEUsS0FBSyxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNoQyxDQUFDO0lBQUEsQ0FBQztJQUVGLFVBQVUsQ0FBQyxLQUFhO1FBQ3BCLElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLENBQUM7UUFFekIsS0FBSyxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUM1QixDQUFDO0lBQUEsQ0FBQztJQUVGLE1BQU0sQ0FBQyxPQUFtQjtRQUN0QixJQUFJLENBQUMsaUJBQWlCLENBQUMsV0FBVyxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBRWxELElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUM5QixJQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDbEMsQ0FBQztJQUFBLENBQUM7SUFFRixRQUFRLENBQUMsS0FBYSxFQUFFLEtBQVksRUFBRSxTQUFpQjtRQUNuRCxJQUFJLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNsQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLENBQUM7UUFFekQsTUFBTSxXQUFXLEdBQUcseUJBQW9CLENBQUMsRUFBQyxRQUFRLEVBQUUsS0FBSyxFQUFDLENBQUMsQ0FBQyxVQUFVLENBQUM7WUFDbkU7Ozs7ZUFJRztZQUNILFNBQVMsRUFBRSxDQUFDO1NBQ2YsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFdBQVcsQ0FBQyxXQUFXLEdBQUcsTUFBTSxDQUFDLENBQUM7UUFFekQsS0FBSyxDQUFDLFFBQVEsQ0FBQyxLQUFLLEVBQUUsS0FBSyxFQUFFLFNBQVMsQ0FBQyxDQUFDO0lBQzVDLENBQUM7SUFBQSxDQUFDO0lBRUYsV0FBVyxDQUFDLEtBQWEsRUFBRSxTQUFpQixFQUFFLFNBQWlCO1FBQzNELElBQUksQ0FBQyxXQUFXLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBRXJDLEtBQUssQ0FBQyxXQUFXLENBQUMsS0FBSyxFQUFFLFNBQVMsRUFBRSxTQUFTLENBQUMsQ0FBQztJQUNuRCxDQUFDO0lBQUEsQ0FBQztJQUVGLFdBQVcsQ0FBQyxLQUFhO1FBQ3JCLElBQUksQ0FBQyxXQUFXLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBRXJDLEtBQUssQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDN0IsQ0FBQztJQUFBLENBQUM7SUFFRixXQUFXLENBQUMsS0FBYSxFQUFFLFNBQWlCO1FBQ3hDLElBQUksQ0FBQyxXQUFXLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBRXJDLEtBQUssQ0FBQyxXQUFXLENBQUMsS0FBSyxFQUFFLFNBQVMsQ0FBQyxDQUFDO0lBQ3hDLENBQUM7SUFBQSxDQUFDO0lBTU0sa0JBQWtCO1FBQ3RCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUM3QyxJQUFJLENBQUMsaUJBQWlCLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1NBQ2hEO1FBQ0QsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUM3QyxDQUFDO0lBRU8sU0FBUyxDQUFDLElBQVk7UUFDMUIsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFdBQVcsQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLENBQUM7SUFDcEQsQ0FBQztJQUVPLFlBQVksQ0FBQyxJQUFZO1FBQzdCLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxlQUFLLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLEdBQUcsR0FBRyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUM7UUFDMUgsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFdBQVcsQ0FBQyxzQkFBVyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQzNELElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxXQUFXLENBQUMsc0JBQVcsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLGtCQUFrQixHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDM0YsSUFBSSxDQUFDLEtBQUssR0FBRyxXQUFXLENBQUMsR0FBRyxFQUFFO1lBQzFCLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxXQUFXLENBQUMsc0JBQVcsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNsRSxJQUFJLENBQUMsWUFBWSxHQUFHLENBQUMsSUFBSSxDQUFDLFlBQVksR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBQzdFLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxXQUFXLENBQUMsZUFBSyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDM0YsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBQ1osQ0FBQztJQUVPLFdBQVcsQ0FBQyxNQUFrQjtRQUNsQyxhQUFhLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBRTFCLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxXQUFXLENBQUMsc0JBQVcsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNsRSxJQUFJLE1BQU0sS0FBSyxVQUFVLENBQUMsSUFBSSxFQUFFO1lBQzVCLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxXQUFXLENBQUMsZUFBSyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1NBQzVEO2FBQU0sSUFBSSxNQUFNLEtBQUssVUFBVSxDQUFDLE9BQU8sRUFBRTtZQUN0QyxJQUFJLENBQUMsaUJBQWlCLENBQUMsV0FBVyxDQUFDLGVBQUssQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztTQUM5RDthQUFNLElBQUksTUFBTSxLQUFLLFVBQVUsQ0FBQyxPQUFPLEVBQUU7WUFDdEMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFdBQVcsQ0FBQyxlQUFLLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7U0FDNUQ7UUFDRCxJQUFJLENBQUMsaUJBQWlCLENBQUMsV0FBVyxDQUFDLHNCQUFXLENBQUMsY0FBYyxDQUFDLENBQUM7UUFDL0QsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUM3QyxDQUFDO0NBQ0o7QUFFTyxzQ0FBYSJ9