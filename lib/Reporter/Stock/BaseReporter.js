import colors from "ansi-colors";
/**
 * Base handling of common console reporter functionality, such as tracking of passes, failures, and indentation levels
 * assuming tree-like test result rendering.
 */
class BaseReporter {
    constructor() {
        this.activeFilePath = null;
        this.currentIndentLevel = 0;
        this.passes = 0;
        this.failures = 0;
        this.pending = 0;
    }
    initialize() {
        console.log("\n" + colors.whiteBright("☾ Umbra Test"));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQmFzZVJlcG9ydGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL1JlcG9ydGVyL1N0b2NrL0Jhc2VSZXBvcnRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFHQSxPQUFPLE1BQU0sTUFBTSxhQUFhLENBQUM7QUFFakM7OztHQUdHO0FBQ0gsTUFBTSxZQUFZO0lBQWxCO1FBRWMsbUJBQWMsR0FBa0IsSUFBSSxDQUFDO1FBQ3JDLHVCQUFrQixHQUFHLENBQUMsQ0FBQztRQUV6QixXQUFNLEdBQVcsQ0FBQyxDQUFDO1FBQ25CLGFBQVEsR0FBVyxDQUFDLENBQUM7UUFDckIsWUFBTyxHQUFXLENBQUMsQ0FBQztJQXVFaEMsQ0FBQztJQXJFRyxVQUFVO1FBQ04sT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLEdBQUcsTUFBTSxDQUFDLFdBQVcsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDO1FBQ3ZELFlBQVksQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO1FBRWxDLE9BQU8sT0FBTyxDQUFDLE9BQU8sRUFBRSxDQUFDO0lBQzdCLENBQUM7SUFFRCxpQkFBaUIsQ0FBQyxZQUFvQjtRQUNsQyxJQUFJLENBQUMsY0FBYyxHQUFHLFlBQVksQ0FBQztJQUN2QyxDQUFDO0lBQUEsQ0FBQztJQUVGLGFBQWEsQ0FBQyxLQUFhLEVBQUUsU0FBaUI7UUFDMUMsSUFBSSxDQUFDLGtCQUFrQixFQUFFLENBQUM7SUFDOUIsQ0FBQztJQUFBLENBQUM7SUFFRixjQUFjLENBQUMsS0FBYTtRQUN4QixJQUFJLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztJQUM5QixDQUFDO0lBQUEsQ0FBQztJQUVGLFVBQVUsQ0FBQyxLQUFhO1FBQ3BCLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUNmLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO0lBQzlCLENBQUM7SUFBQSxDQUFDO0lBRUYsTUFBTSxDQUFDLE9BQW1CO1FBQ3RCLHVCQUF1QjtJQUMzQixDQUFDO0lBQUEsQ0FBQztJQUVGLFFBQVE7UUFDSix1QkFBdUI7SUFDM0IsQ0FBQztJQUFBLENBQUM7SUFFRixRQUFRLENBQUMsS0FBYSxFQUFFLEtBQVksRUFBRSxTQUFpQjtRQUNuRCxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDZixJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDaEIsSUFBSSxDQUFDLGtCQUFrQixFQUFFLENBQUM7SUFDOUIsQ0FBQztJQUFBLENBQUM7SUFFRixXQUFXLENBQUMsS0FBYSxFQUFFLFNBQWlCLEVBQUUsU0FBaUI7UUFDM0QsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQ2YsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQ2hCLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO0lBQzlCLENBQUM7SUFBQSxDQUFDO0lBRUYsV0FBVyxDQUFDLEtBQWE7UUFDckIsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQ2YsSUFBSSxDQUFDLGtCQUFrQixFQUFFLENBQUM7SUFDOUIsQ0FBQztJQUFBLENBQUM7SUFFRixXQUFXLENBQUMsS0FBYSxFQUFFLFNBQWlCO1FBQ3hDLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUNmLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUNkLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO0lBQzlCLENBQUM7SUFBQSxDQUFDO0lBRU0sTUFBTSxDQUFDLGtCQUFrQjtRQUM3QixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxPQUFPLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQ2pELE9BQU8sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1NBQ2xDO1FBQ0QsT0FBTyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDL0IsQ0FBQztJQUVTLGVBQWUsQ0FBQyxJQUFZLEVBQUUsTUFBTSxHQUFHLENBQUM7UUFDOUMsSUFBSSxHQUFHLEdBQUcsRUFBRSxDQUFDO1FBQ2IsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDdkQsR0FBRyxJQUFJLEdBQUcsQ0FBQztTQUNkO1FBQ0QsT0FBTyxHQUFHLEdBQUcsSUFBSSxDQUFDO0lBQ3RCLENBQUM7Q0FDSjtBQUVELE9BQU8sRUFBQyxZQUFZLEVBQUMsQ0FBQyJ9