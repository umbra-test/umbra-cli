import {RunResults} from "@umbra-test/umbra-test-runner";

import {Reporter} from "../Reporter";
import chalk from "chalk";

/**
 * Base handling of common console reporter functionality, such as tracking of passes, failures, and indentation levels
 * assuming tree-like test result rendering.
 */
class BaseReporter implements Reporter {

    protected activeFilePath: string;
    protected currentIndentLevel = 0;

    private passes: number = 0;
    private failures: number = 0;
    private pending: number = 0;

    initialize(): Promise<void> {
        console.log(`\n${chalk.whiteBright("☾")} Umbra Test`);
        BaseReporter.drawHorizontalLine();

        return Promise.resolve();
    }

    activeFileChanged(absolutePath: string) {
        this.activeFilePath = absolutePath;
    };

    afterDescribe(title: string, elapsedMs: number) {
        this.currentIndentLevel--;
    };

    beforeDescribe(title: string) {
        this.currentIndentLevel++;
    };

    beforeTest(title: string) {
        this.pending++;
        this.currentIndentLevel++;
    };

    runEnd(results: RunResults) {
        // Intentionally blank.
    };

    runStart() {
        // Intentionally blank.
    };

    testFail(title: string, error: Error, elapsedMs: number) {
        this.pending--;
        this.failures++;
        this.currentIndentLevel--;
    };

    testTimeout(title: string, elapsedMs: number, timeoutMs: number) {
        this.pending--;
        this.failures++;
        this.currentIndentLevel--;
    };

    testSkipped(title: string) {
        this.pending--;
        this.currentIndentLevel--;
    };

    testSuccess(title: string, elapsedMs: number) {
        this.pending--;
        this.passes++;
        this.currentIndentLevel--;
    };

    private static drawHorizontalLine(): void {
        for (let i = 0; i < process.stdout.columns - 1; i++) {
            process.stdout.write("\u2500");
        }
        process.stdout.write("\n");
    }

    protected getIndentedText(text: string, offset = 0): string {
        let str = "";
        for (let i = 0; i < this.currentIndentLevel + offset; i++) {
            str += " ";
        }
        return str + text;
    }
}

export {BaseReporter};
