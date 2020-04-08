"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = require("chalk");
const BaseReporter_1 = require("./BaseReporter");
/**
 * A basic reporter. Nothing fancy.
 */
class BasicReporter extends BaseReporter_1.BaseReporter {
    constructor() {
        super(...arguments);
        this.verboseMode = false; // TODO: Add configuration options through umbra.config.ts
        this.filesEvaluated = 0;
    }
    beforeDescribe(title) {
        super.beforeDescribe(title);
        if (this.verboseMode) {
            console.log(this.getIndentedText(chalk_1.default.cyan("⤷ ") + title));
        }
    }
    ;
    beforeTest(title) {
        super.beforeTest(title);
        if (this.verboseMode) {
            console.log(this.getIndentedText(chalk_1.default.cyan("⤷ ") + title));
        }
    }
    ;
    testFail(title, error, elapsedMs) {
        super.testFail(title, error, elapsedMs);
        console.log(this.getIndentedText(chalk_1.default.redBright(`✖ `) + title));
        this.printPrettyStackTrace(error);
    }
    ;
    testTimeout(title, elapsedMs, timeoutMs) {
        super.testTimeout(title, elapsedMs, timeoutMs);
        console.log(this.getIndentedText(chalk_1.default.redBright(`⏲ `) + title));
    }
    ;
    testSuccess(title, elapsedMs) {
        super.testSuccess(title, elapsedMs);
    }
    runEnd(results) {
        console.log(`Tests: ${chalk_1.default.red(results.totalFailures)} failures, ${chalk_1.default.yellow(results.totalTimeouts)} timeouts, ${chalk_1.default.green(results.totalSuccesses)} passed, ${results.totalTests} total`);
        console.log(`Time:  ${results.elapsedTimeMs}ms`);
        console.log(`Files: ${this.filesEvaluated}`);
    }
    activeFileChanged(absolutePath) {
        this.filesEvaluated++;
    }
    printPrettyStackTrace(error) {
        console.log(this.getIndentedText(chalk_1.default.red("⤷ ") + error.message + "\n", 1));
        /* Temporarily disable pretty stack traces due to an unexpected parse error popping up for some errors.
        const prettyStack = createCallsiteRecord({forError: error}).renderSync({
            // TODO: Determine whether to default node_module stripping to true
            stackFilter(frame) {
                return !frame.fileName.includes("node_modules");
            },

            frameSize: 3
        });
        console.log(prettyStack + "\n\n");
        */
    }
}
exports.BasicReporter = BasicReporter;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQmFzaWNSZXBvcnRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9SZXBvcnRlci9TdG9jay9CYXNpY1JlcG9ydGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsaUNBQTBCO0FBRTFCLGlEQUE0QztBQUc1Qzs7R0FFRztBQUNILE1BQU0sYUFBYyxTQUFRLDJCQUFZO0lBQXhDOztRQUVZLGdCQUFXLEdBQUcsS0FBSyxDQUFDLENBQUMsMERBQTBEO1FBQy9FLG1CQUFjLEdBQVcsQ0FBQyxDQUFDO0lBNkR2QyxDQUFDO0lBM0RHLGNBQWMsQ0FBQyxLQUFhO1FBQ3hCLEtBQUssQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDLENBQUM7UUFFNUIsSUFBSSxJQUFJLENBQUMsV0FBVyxFQUFFO1lBQ2xCLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxlQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUM7U0FDL0Q7SUFDTCxDQUFDO0lBQUEsQ0FBQztJQUVGLFVBQVUsQ0FBQyxLQUFhO1FBQ3BCLEtBQUssQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUM7UUFFeEIsSUFBSSxJQUFJLENBQUMsV0FBVyxFQUFFO1lBQ2xCLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxlQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUM7U0FDL0Q7SUFDTCxDQUFDO0lBQUEsQ0FBQztJQUVGLFFBQVEsQ0FBQyxLQUFhLEVBQUUsS0FBWSxFQUFFLFNBQWlCO1FBQ25ELEtBQUssQ0FBQyxRQUFRLENBQUMsS0FBSyxFQUFFLEtBQUssRUFBRSxTQUFTLENBQUMsQ0FBQztRQUV4QyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsZUFBSyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDO1FBQ2pFLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUN0QyxDQUFDO0lBQUEsQ0FBQztJQUVGLFdBQVcsQ0FBQyxLQUFhLEVBQUUsU0FBaUIsRUFBRSxTQUFpQjtRQUMzRCxLQUFLLENBQUMsV0FBVyxDQUFDLEtBQUssRUFBRSxTQUFTLEVBQUUsU0FBUyxDQUFDLENBQUM7UUFFL0MsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLGVBQUssQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQztJQUNyRSxDQUFDO0lBQUEsQ0FBQztJQUVGLFdBQVcsQ0FBQyxLQUFhLEVBQUUsU0FBaUI7UUFDeEMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxLQUFLLEVBQUUsU0FBUyxDQUFDLENBQUM7SUFDeEMsQ0FBQztJQUVELE1BQU0sQ0FBQyxPQUFtQjtRQUN0QixPQUFPLENBQUMsR0FBRyxDQUFDLFVBQVUsZUFBSyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLGNBQWMsZUFBSyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLGNBQWMsZUFBSyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDLFlBQVksT0FBTyxDQUFDLFVBQVUsUUFBUSxDQUFDLENBQUM7UUFDaE0sT0FBTyxDQUFDLEdBQUcsQ0FBQyxVQUFVLE9BQU8sQ0FBQyxhQUFhLElBQUksQ0FBQyxDQUFDO1FBQ2pELE9BQU8sQ0FBQyxHQUFHLENBQUMsVUFBVSxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUMsQ0FBQztJQUNqRCxDQUFDO0lBRUQsaUJBQWlCLENBQUMsWUFBb0I7UUFDbEMsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO0lBQzFCLENBQUM7SUFFTyxxQkFBcUIsQ0FBQyxLQUFZO1FBQ3RDLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxlQUFLLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLEtBQUssQ0FBQyxPQUFPLEdBQUcsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFFN0U7Ozs7Ozs7Ozs7VUFVRTtJQUNOLENBQUM7Q0FFSjtBQUVPLHNDQUFhIn0=