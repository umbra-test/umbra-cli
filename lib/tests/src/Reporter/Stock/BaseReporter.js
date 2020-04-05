"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = require("chalk");
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
        console.log(`\n${chalk_1.default.whiteBright("☾")} Umbra Test`);
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
exports.BaseReporter = BaseReporter;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQmFzZVJlcG9ydGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL1JlcG9ydGVyL1N0b2NrL0Jhc2VSZXBvcnRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUdBLGlDQUEwQjtBQUUxQjs7O0dBR0c7QUFDSCxNQUFNLFlBQVk7SUFBbEI7UUFHYyx1QkFBa0IsR0FBRyxDQUFDLENBQUM7UUFFekIsV0FBTSxHQUFXLENBQUMsQ0FBQztRQUNuQixhQUFRLEdBQVcsQ0FBQyxDQUFDO1FBQ3JCLFlBQU8sR0FBVyxDQUFDLENBQUM7SUF1RWhDLENBQUM7SUFyRUcsVUFBVTtRQUNOLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxlQUFLLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUN0RCxZQUFZLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztRQUVsQyxPQUFPLE9BQU8sQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUM3QixDQUFDO0lBRUQsaUJBQWlCLENBQUMsWUFBb0I7UUFDbEMsSUFBSSxDQUFDLGNBQWMsR0FBRyxZQUFZLENBQUM7SUFDdkMsQ0FBQztJQUFBLENBQUM7SUFFRixhQUFhLENBQUMsS0FBYSxFQUFFLFNBQWlCO1FBQzFDLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO0lBQzlCLENBQUM7SUFBQSxDQUFDO0lBRUYsY0FBYyxDQUFDLEtBQWE7UUFDeEIsSUFBSSxDQUFDLGtCQUFrQixFQUFFLENBQUM7SUFDOUIsQ0FBQztJQUFBLENBQUM7SUFFRixVQUFVLENBQUMsS0FBYTtRQUNwQixJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDZixJQUFJLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztJQUM5QixDQUFDO0lBQUEsQ0FBQztJQUVGLE1BQU0sQ0FBQyxPQUFtQjtRQUN0Qix1QkFBdUI7SUFDM0IsQ0FBQztJQUFBLENBQUM7SUFFRixRQUFRO1FBQ0osdUJBQXVCO0lBQzNCLENBQUM7SUFBQSxDQUFDO0lBRUYsUUFBUSxDQUFDLEtBQWEsRUFBRSxLQUFZLEVBQUUsU0FBaUI7UUFDbkQsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQ2YsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQ2hCLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO0lBQzlCLENBQUM7SUFBQSxDQUFDO0lBRUYsV0FBVyxDQUFDLEtBQWEsRUFBRSxTQUFpQixFQUFFLFNBQWlCO1FBQzNELElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUNmLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUNoQixJQUFJLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztJQUM5QixDQUFDO0lBQUEsQ0FBQztJQUVGLFdBQVcsQ0FBQyxLQUFhO1FBQ3JCLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUNmLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO0lBQzlCLENBQUM7SUFBQSxDQUFDO0lBRUYsV0FBVyxDQUFDLEtBQWEsRUFBRSxTQUFpQjtRQUN4QyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDZixJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDZCxJQUFJLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztJQUM5QixDQUFDO0lBQUEsQ0FBQztJQUVNLE1BQU0sQ0FBQyxrQkFBa0I7UUFDN0IsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsT0FBTyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUNqRCxPQUFPLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQztTQUNsQztRQUNELE9BQU8sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQy9CLENBQUM7SUFFUyxlQUFlLENBQUMsSUFBWSxFQUFFLE1BQU0sR0FBRyxDQUFDO1FBQzlDLElBQUksR0FBRyxHQUFHLEVBQUUsQ0FBQztRQUNiLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsa0JBQWtCLEdBQUcsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQ3ZELEdBQUcsSUFBSSxHQUFHLENBQUM7U0FDZDtRQUNELE9BQU8sR0FBRyxHQUFHLElBQUksQ0FBQztJQUN0QixDQUFDO0NBQ0o7QUFFTyxvQ0FBWSJ9