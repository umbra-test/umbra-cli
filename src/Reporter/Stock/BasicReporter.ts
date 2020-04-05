import createCallsiteRecord from "callsite-record";
import chalk from "chalk";

import {BaseReporter} from "./BaseReporter";

/**
 * A basic reporter. Nothing fancy.
 */
class BasicReporter extends BaseReporter {

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

        console.log(this.getIndentedText(chalk.redBright(`✖ FAIL ✖ `), 2));
        this.printPrettyStackTrace(error);
    };

    testTimeout(title: string, elapsedMs: number, timeoutMs: number) {
        super.testTimeout(title, elapsedMs, timeoutMs);

        console.log(this.getIndentedText(chalk.redBright(`✖ TIMED OUT ✖ `), 2));
    };

    private printPrettyStackTrace(error: Error): void {
        const prettyStack = createCallsiteRecord({forError: error}).renderSync({
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

export {BasicReporter};
