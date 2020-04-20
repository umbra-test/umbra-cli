import colors from "ansi-colors";
import { BaseReporter } from "./BaseReporter";
/**
 * A basic reporter. Nothing fancy.
 */
class BasicReporter extends BaseReporter {
    constructor() {
        super(...arguments);
        this.verboseMode = false; // TODO: Add configuration options through umbra.config.ts
        this.filesEvaluated = 0;
    }
    beforeDescribe(title) {
        super.beforeDescribe(title);
        if (this.verboseMode) {
            console.log(this.getIndentedText(colors.cyan("⤷ ") + title));
        }
    }
    ;
    beforeTest(title) {
        super.beforeTest(title);
        if (this.verboseMode) {
            console.log(this.getIndentedText(colors.cyan("⤷ ") + title));
        }
    }
    ;
    testFail(title, error, elapsedMs) {
        super.testFail(title, error, elapsedMs);
        console.log(this.getIndentedText(colors.redBright(`✖ `) + title));
        this.printPrettyStackTrace(error);
    }
    ;
    testTimeout(title, elapsedMs, timeoutMs) {
        super.testTimeout(title, elapsedMs, timeoutMs);
        console.log(this.getIndentedText(colors.redBright(`⏲ `) + title));
    }
    ;
    testSuccess(title, elapsedMs) {
        super.testSuccess(title, elapsedMs);
    }
    runEnd(results) {
        console.log(`Tests: ${colors.red(results.totalFailures.toString())} failures, ${colors.yellow(results.totalTimeouts.toString())} timeouts, ${colors.green(results.totalSuccesses.toString())} passed, ${results.totalTests} total`);
        console.log(`Time:  ${results.elapsedTimeMs}ms`);
        console.log(`Files: ${this.filesEvaluated}`);
    }
    activeFileChanged(absolutePath) {
        this.filesEvaluated++;
    }
    printPrettyStackTrace(error) {
        console.log(this.getIndentedText(colors.red("⤷ ") + error.message + "\n", 1));
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
export { BasicReporter };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQmFzaWNSZXBvcnRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9SZXBvcnRlci9TdG9jay9CYXNpY1JlcG9ydGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sTUFBTSxNQUFNLGFBQWEsQ0FBQztBQUVqQyxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFHNUM7O0dBRUc7QUFDSCxNQUFNLGFBQWMsU0FBUSxZQUFZO0lBQXhDOztRQUVZLGdCQUFXLEdBQUcsS0FBSyxDQUFDLENBQUMsMERBQTBEO1FBQy9FLG1CQUFjLEdBQVcsQ0FBQyxDQUFDO0lBNkR2QyxDQUFDO0lBM0RHLGNBQWMsQ0FBQyxLQUFhO1FBQ3hCLEtBQUssQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDLENBQUM7UUFFNUIsSUFBSSxJQUFJLENBQUMsV0FBVyxFQUFFO1lBQ2xCLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUM7U0FDaEU7SUFDTCxDQUFDO0lBQUEsQ0FBQztJQUVGLFVBQVUsQ0FBQyxLQUFhO1FBQ3BCLEtBQUssQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUM7UUFFeEIsSUFBSSxJQUFJLENBQUMsV0FBVyxFQUFFO1lBQ2xCLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUM7U0FDaEU7SUFDTCxDQUFDO0lBQUEsQ0FBQztJQUVGLFFBQVEsQ0FBQyxLQUFhLEVBQUUsS0FBWSxFQUFFLFNBQWlCO1FBQ25ELEtBQUssQ0FBQyxRQUFRLENBQUMsS0FBSyxFQUFFLEtBQUssRUFBRSxTQUFTLENBQUMsQ0FBQztRQUV4QyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDO1FBQ2xFLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUN0QyxDQUFDO0lBQUEsQ0FBQztJQUVGLFdBQVcsQ0FBQyxLQUFhLEVBQUUsU0FBaUIsRUFBRSxTQUFpQjtRQUMzRCxLQUFLLENBQUMsV0FBVyxDQUFDLEtBQUssRUFBRSxTQUFTLEVBQUUsU0FBUyxDQUFDLENBQUM7UUFFL0MsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQztJQUN0RSxDQUFDO0lBQUEsQ0FBQztJQUVGLFdBQVcsQ0FBQyxLQUFhLEVBQUUsU0FBaUI7UUFDeEMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxLQUFLLEVBQUUsU0FBUyxDQUFDLENBQUM7SUFDeEMsQ0FBQztJQUVELE1BQU0sQ0FBQyxPQUFtQjtRQUN0QixPQUFPLENBQUMsR0FBRyxDQUFDLFVBQVUsTUFBTSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLFFBQVEsRUFBRSxDQUFDLGNBQWMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLFFBQVEsRUFBRSxDQUFDLGNBQWMsTUFBTSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDLFFBQVEsRUFBRSxDQUFDLFlBQVksT0FBTyxDQUFDLFVBQVUsUUFBUSxDQUFDLENBQUM7UUFDcE8sT0FBTyxDQUFDLEdBQUcsQ0FBQyxVQUFVLE9BQU8sQ0FBQyxhQUFhLElBQUksQ0FBQyxDQUFDO1FBQ2pELE9BQU8sQ0FBQyxHQUFHLENBQUMsVUFBVSxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUMsQ0FBQztJQUNqRCxDQUFDO0lBRUQsaUJBQWlCLENBQUMsWUFBb0I7UUFDbEMsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO0lBQzFCLENBQUM7SUFFTyxxQkFBcUIsQ0FBQyxLQUFZO1FBQ3RDLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLEtBQUssQ0FBQyxPQUFPLEdBQUcsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFFOUU7Ozs7Ozs7Ozs7VUFVRTtJQUNOLENBQUM7Q0FFSjtBQUVELE9BQU8sRUFBQyxhQUFhLEVBQUMsQ0FBQyJ9