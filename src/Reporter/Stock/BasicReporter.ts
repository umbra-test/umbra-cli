import chalk from "chalk";

import { BaseReporter } from "./BaseReporter";
import { RunResults } from "@umbra-test/umbra-test-runner";

/**
 * A basic reporter. Nothing fancy.
 */
class BasicReporter extends BaseReporter {

    private startTime: number;

    beforeDescribe(title: string) {
        super.beforeDescribe(title);

        console.log(this.getIndentedText(chalk.cyan("⤷") + ` ${title}`));
    };

    beforeTest(title: string) {
        super.beforeTest(title);

        console.log(this.getIndentedText(chalk.cyan("⤷") + ` ${title}`));
    };

    testFail(title: string, error: Error, elapsedMs: number) {
        super.testFail(title, error, elapsedMs);

        console.log(this.getIndentedText(chalk.redBright(`✖ FAIL ✖ ${title}`), 2));
        this.printPrettyStackTrace(error);
    };

    testTimeout(title: string, elapsedMs: number, timeoutMs: number) {
        super.testTimeout(title, elapsedMs, timeoutMs);

        console.log(this.getIndentedText(chalk.redBright(`✖ TIMED OUT ✖ ${title}`), 2));
    };

    runEnd(results: RunResults) {
        console.log(`Tests completed in ${results.elapsedTimeMs}ms. ${results.totalTests} tests run ${results.totalSuccesses} succeeded ${results.totalFailures} failed.`);
    }

    private printPrettyStackTrace(error: Error): void {
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
