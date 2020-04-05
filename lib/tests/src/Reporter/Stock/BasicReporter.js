"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const callsite_record_1 = require("callsite-record");
const chalk_1 = require("chalk");
const BaseReporter_1 = require("./BaseReporter");
/**
 * A basic reporter. Nothing fancy.
 */
class BasicReporter extends BaseReporter_1.BaseReporter {
    beforeDescribe(title) {
        super.beforeDescribe(title);
        console.log(this.getIndentedText(chalk_1.default.cyan("⤷") + ` ${title}`));
    }
    ;
    beforeTest(title) {
        super.beforeTest(title);
        console.log(this.getIndentedText(chalk_1.default.cyan("⤷") + ` ${title}`));
    }
    ;
    testFail(title, error, elapsedMs) {
        super.testFail(title, error, elapsedMs);
        console.log(this.getIndentedText(chalk_1.default.redBright(`✖ FAIL ✖ `), 2));
        this.printPrettyStackTrace(error);
    }
    ;
    testTimeout(title, elapsedMs, timeoutMs) {
        super.testTimeout(title, elapsedMs, timeoutMs);
        console.log(this.getIndentedText(chalk_1.default.redBright(`✖ TIMED OUT ✖ `), 2));
    }
    ;
    printPrettyStackTrace(error) {
        const prettyStack = callsite_record_1.default({ forError: error }).renderSync({
            /* TODO: Determine whether to default node_module stripping to true
            stackFilter(frame) {
                return !frame.fileName.includes("node_modules");
            },
             */
            frameSize: 3
        });
        console.log(prettyStack + "\n\n");
    }
}
exports.BasicReporter = BasicReporter;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQmFzaWNSZXBvcnRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9SZXBvcnRlci9TdG9jay9CYXNpY1JlcG9ydGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEscURBQW1EO0FBQ25ELGlDQUEwQjtBQUUxQixpREFBNEM7QUFFNUM7O0dBRUc7QUFDSCxNQUFNLGFBQWMsU0FBUSwyQkFBWTtJQUVwQyxjQUFjLENBQUMsS0FBYTtRQUN4QixLQUFLLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBRTVCLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxlQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLElBQUksS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQ3JFLENBQUM7SUFBQSxDQUFDO0lBRUYsVUFBVSxDQUFDLEtBQWE7UUFDcEIsS0FBSyxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUV4QixPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsZUFBSyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxJQUFJLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQztJQUNyRSxDQUFDO0lBQUEsQ0FBQztJQUVGLFFBQVEsQ0FBQyxLQUFhLEVBQUUsS0FBWSxFQUFFLFNBQWlCO1FBQ25ELEtBQUssQ0FBQyxRQUFRLENBQUMsS0FBSyxFQUFFLEtBQUssRUFBRSxTQUFTLENBQUMsQ0FBQztRQUV4QyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsZUFBSyxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ25FLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUN0QyxDQUFDO0lBQUEsQ0FBQztJQUVGLFdBQVcsQ0FBQyxLQUFhLEVBQUUsU0FBaUIsRUFBRSxTQUFpQjtRQUMzRCxLQUFLLENBQUMsV0FBVyxDQUFDLEtBQUssRUFBRSxTQUFTLEVBQUUsU0FBUyxDQUFDLENBQUM7UUFFL0MsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLGVBQUssQ0FBQyxTQUFTLENBQUMsZ0JBQWdCLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzVFLENBQUM7SUFBQSxDQUFDO0lBRU0scUJBQXFCLENBQUMsS0FBWTtRQUN0QyxNQUFNLFdBQVcsR0FBRyx5QkFBb0IsQ0FBQyxFQUFDLFFBQVEsRUFBRSxLQUFLLEVBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQztZQUNuRTs7OztlQUlHO1lBQ0gsU0FBUyxFQUFFLENBQUM7U0FDZixDQUFDLENBQUM7UUFDSCxPQUFPLENBQUMsR0FBRyxDQUFDLFdBQVcsR0FBRyxNQUFNLENBQUMsQ0FBQztJQUN0QyxDQUFDO0NBRUo7QUFFTyxzQ0FBYSJ9