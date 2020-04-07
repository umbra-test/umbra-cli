import chalk from "chalk";
import { BaseReporter } from "./BaseReporter";
/**
 * A basic reporter. Nothing fancy.
 */
class BasicReporter extends BaseReporter {
    beforeDescribe(title) {
        super.beforeDescribe(title);
        console.log(this.getIndentedText(chalk.cyan("⤷") + ` ${title}`));
    }
    ;
    beforeTest(title) {
        super.beforeTest(title);
        console.log(this.getIndentedText(chalk.cyan("⤷") + ` ${title}`));
    }
    ;
    testFail(title, error, elapsedMs) {
        super.testFail(title, error, elapsedMs);
        console.log(this.getIndentedText(chalk.redBright(`✖ FAIL ✖ ${title}`), 2));
        this.printPrettyStackTrace(error);
    }
    ;
    testTimeout(title, elapsedMs, timeoutMs) {
        super.testTimeout(title, elapsedMs, timeoutMs);
        console.log(this.getIndentedText(chalk.redBright(`✖ TIMED OUT ✖ ${title}`), 2));
    }
    ;
    runEnd(results) {
        console.log(`Tests completed in ${results.elapsedTimeMs}ms. ${results.totalTests} tests run ${results.totalSuccesses} succeeded ${results.totalFailures} failed.`);
    }
    printPrettyStackTrace(error) {
        console.log(error.message);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQmFzaWNSZXBvcnRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9SZXBvcnRlci9TdG9jay9CYXNpY1JlcG9ydGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sS0FBSyxNQUFNLE9BQU8sQ0FBQztBQUUxQixPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFHOUM7O0dBRUc7QUFDSCxNQUFNLGFBQWMsU0FBUSxZQUFZO0lBSXBDLGNBQWMsQ0FBQyxLQUFhO1FBQ3hCLEtBQUssQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDLENBQUM7UUFFNUIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsSUFBSSxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDckUsQ0FBQztJQUFBLENBQUM7SUFFRixVQUFVLENBQUMsS0FBYTtRQUNwQixLQUFLLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBRXhCLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLElBQUksS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQ3JFLENBQUM7SUFBQSxDQUFDO0lBRUYsUUFBUSxDQUFDLEtBQWEsRUFBRSxLQUFZLEVBQUUsU0FBaUI7UUFDbkQsS0FBSyxDQUFDLFFBQVEsQ0FBQyxLQUFLLEVBQUUsS0FBSyxFQUFFLFNBQVMsQ0FBQyxDQUFDO1FBRXhDLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLFlBQVksS0FBSyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzNFLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUN0QyxDQUFDO0lBQUEsQ0FBQztJQUVGLFdBQVcsQ0FBQyxLQUFhLEVBQUUsU0FBaUIsRUFBRSxTQUFpQjtRQUMzRCxLQUFLLENBQUMsV0FBVyxDQUFDLEtBQUssRUFBRSxTQUFTLEVBQUUsU0FBUyxDQUFDLENBQUM7UUFFL0MsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsaUJBQWlCLEtBQUssRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNwRixDQUFDO0lBQUEsQ0FBQztJQUVGLE1BQU0sQ0FBQyxPQUFtQjtRQUN0QixPQUFPLENBQUMsR0FBRyxDQUFDLHNCQUFzQixPQUFPLENBQUMsYUFBYSxPQUFPLE9BQU8sQ0FBQyxVQUFVLGNBQWMsT0FBTyxDQUFDLGNBQWMsY0FBYyxPQUFPLENBQUMsYUFBYSxVQUFVLENBQUMsQ0FBQztJQUN2SyxDQUFDO0lBRU8scUJBQXFCLENBQUMsS0FBWTtRQUN0QyxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUUzQjs7Ozs7Ozs7OztVQVVFO0lBQ04sQ0FBQztDQUVKO0FBRUQsT0FBTyxFQUFFLGFBQWEsRUFBRSxDQUFDIn0=