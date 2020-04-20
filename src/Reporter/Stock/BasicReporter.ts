import colors from "ansi-colors";

import {BaseReporter} from "./BaseReporter";
import {RunResults} from "@umbra-test/umbra-test-runner";

/**
 * A basic reporter. Nothing fancy.
 */
class BasicReporter extends BaseReporter {

    private verboseMode = false; // TODO: Add configuration options through umbra.config.ts
    private filesEvaluated: number = 0;

    beforeDescribe(title: string) {
        super.beforeDescribe(title);

        if (this.verboseMode) {
            console.log(this.getIndentedText(colors.cyan("⤷ ") + title));
        }
    };

    beforeTest(title: string) {
        super.beforeTest(title);

        if (this.verboseMode) {
            console.log(this.getIndentedText(colors.cyan("⤷ ") + title));
        }
    };

    testFail(title: string, error: Error, elapsedMs: number) {
        super.testFail(title, error, elapsedMs);

        console.log(this.getIndentedText(colors.redBright(`✖ `) + title));
        this.printPrettyStackTrace(error);
    };

    testTimeout(title: string, elapsedMs: number, timeoutMs: number) {
        super.testTimeout(title, elapsedMs, timeoutMs);

        console.log(this.getIndentedText(colors.redBright(`⏲ `) + title));
    };

    testSuccess(title: string, elapsedMs: number) {
        super.testSuccess(title, elapsedMs);
    }

    runEnd(results: RunResults) {
        console.log(`Tests: ${colors.red(results.totalFailures.toString())} failures, ${colors.yellow(results.totalTimeouts.toString())} timeouts, ${colors.green(results.totalSuccesses.toString())} passed, ${results.totalTests} total`);
        console.log(`Time:  ${results.elapsedTimeMs}ms`);
        console.log(`Files: ${this.filesEvaluated}`);
    }

    activeFileChanged(absolutePath: string) {
        this.filesEvaluated++;
    }

    private printPrettyStackTrace(error: Error): void {
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

export {BasicReporter};
