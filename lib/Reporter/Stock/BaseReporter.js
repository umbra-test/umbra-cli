import chalk from "chalk";
/**
 * Base handling of common console reporter functionality, such as tracking of passes, failures, and indentation levels
 * assuming tree-like test result rendering.
 */
class BaseReporter {
    constructor() {
        this.currentIndentLevel = 0;
        this.passes = 0;
        this.failures = 0;
        this.pending = 0;
    }
    initialize() {
        console.log("\n" + chalk.whiteBright("☾ Umbra Test"));
        BaseReporter.drawHorizontalLine();
        return Promise.resolve();
    }
    activeFileChanged(absolutePath) {
        this.activeFilePath = absolutePath;
    }
    ;
    afterDescribe(title, elapsedMs) {
        this.currentIndentLevel--;
    }
    ;
    beforeDescribe(title) {
        this.currentIndentLevel++;
    }
    ;
    beforeTest(title) {
        this.pending++;
        this.currentIndentLevel++;
    }
    ;
    runEnd(results) {
        // Intentionally blank.
    }
    ;
    runStart() {
        // Intentionally blank.
    }
    ;
    testFail(title, error, elapsedMs) {
        this.pending--;
        this.failures++;
        this.currentIndentLevel--;
    }
    ;
    testTimeout(title, elapsedMs, timeoutMs) {
        this.pending--;
        this.failures++;
        this.currentIndentLevel--;
    }
    ;
    testSkipped(title) {
        this.pending--;
        this.currentIndentLevel--;
    }
    ;
    testSuccess(title, elapsedMs) {
        this.pending--;
        this.passes++;
        this.currentIndentLevel--;
    }
    ;
    static drawHorizontalLine() {
        for (let i = 0; i < process.stdout.columns - 1; i++) {
            process.stdout.write("\u2500");
        }
        process.stdout.write("\n");
    }
    getIndentedText(text, offset = 0) {
        let str = "";
        for (let i = 0; i < this.currentIndentLevel + offset; i++) {
            str += " ";
        }
        return str + text;
    }
}
export { BaseReporter };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQmFzZVJlcG9ydGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL1JlcG9ydGVyL1N0b2NrL0Jhc2VSZXBvcnRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFHQSxPQUFPLEtBQUssTUFBTSxPQUFPLENBQUM7QUFFMUI7OztHQUdHO0FBQ0gsTUFBTSxZQUFZO0lBQWxCO1FBR2MsdUJBQWtCLEdBQUcsQ0FBQyxDQUFDO1FBRXpCLFdBQU0sR0FBVyxDQUFDLENBQUM7UUFDbkIsYUFBUSxHQUFXLENBQUMsQ0FBQztRQUNyQixZQUFPLEdBQVcsQ0FBQyxDQUFDO0lBdUVoQyxDQUFDO0lBckVHLFVBQVU7UUFDTixPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksR0FBRyxLQUFLLENBQUMsV0FBVyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUM7UUFDdEQsWUFBWSxDQUFDLGtCQUFrQixFQUFFLENBQUM7UUFFbEMsT0FBTyxPQUFPLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDN0IsQ0FBQztJQUVELGlCQUFpQixDQUFDLFlBQW9CO1FBQ2xDLElBQUksQ0FBQyxjQUFjLEdBQUcsWUFBWSxDQUFDO0lBQ3ZDLENBQUM7SUFBQSxDQUFDO0lBRUYsYUFBYSxDQUFDLEtBQWEsRUFBRSxTQUFpQjtRQUMxQyxJQUFJLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztJQUM5QixDQUFDO0lBQUEsQ0FBQztJQUVGLGNBQWMsQ0FBQyxLQUFhO1FBQ3hCLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO0lBQzlCLENBQUM7SUFBQSxDQUFDO0lBRUYsVUFBVSxDQUFDLEtBQWE7UUFDcEIsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQ2YsSUFBSSxDQUFDLGtCQUFrQixFQUFFLENBQUM7SUFDOUIsQ0FBQztJQUFBLENBQUM7SUFFRixNQUFNLENBQUMsT0FBbUI7UUFDdEIsdUJBQXVCO0lBQzNCLENBQUM7SUFBQSxDQUFDO0lBRUYsUUFBUTtRQUNKLHVCQUF1QjtJQUMzQixDQUFDO0lBQUEsQ0FBQztJQUVGLFFBQVEsQ0FBQyxLQUFhLEVBQUUsS0FBWSxFQUFFLFNBQWlCO1FBQ25ELElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUNmLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUNoQixJQUFJLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztJQUM5QixDQUFDO0lBQUEsQ0FBQztJQUVGLFdBQVcsQ0FBQyxLQUFhLEVBQUUsU0FBaUIsRUFBRSxTQUFpQjtRQUMzRCxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDZixJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDaEIsSUFBSSxDQUFDLGtCQUFrQixFQUFFLENBQUM7SUFDOUIsQ0FBQztJQUFBLENBQUM7SUFFRixXQUFXLENBQUMsS0FBYTtRQUNyQixJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDZixJQUFJLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztJQUM5QixDQUFDO0lBQUEsQ0FBQztJQUVGLFdBQVcsQ0FBQyxLQUFhLEVBQUUsU0FBaUI7UUFDeEMsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQ2YsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQ2QsSUFBSSxDQUFDLGtCQUFrQixFQUFFLENBQUM7SUFDOUIsQ0FBQztJQUFBLENBQUM7SUFFTSxNQUFNLENBQUMsa0JBQWtCO1FBQzdCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLE9BQU8sR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDakQsT0FBTyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUM7U0FDbEM7UUFDRCxPQUFPLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUMvQixDQUFDO0lBRVMsZUFBZSxDQUFDLElBQVksRUFBRSxNQUFNLEdBQUcsQ0FBQztRQUM5QyxJQUFJLEdBQUcsR0FBRyxFQUFFLENBQUM7UUFDYixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixHQUFHLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUN2RCxHQUFHLElBQUksR0FBRyxDQUFDO1NBQ2Q7UUFDRCxPQUFPLEdBQUcsR0FBRyxJQUFJLENBQUM7SUFDdEIsQ0FBQztDQUNKO0FBRUQsT0FBTyxFQUFDLFlBQVksRUFBQyxDQUFDIn0=