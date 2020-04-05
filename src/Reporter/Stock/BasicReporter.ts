import {RunResults} from "@umbra-test/umbra-test-runner";

import {Reporter} from "../Reporter";
import chalk from "chalk";
import createCallsiteRecord from "callsite-record";


enum TestResult {
    SUCCESS,
    FAIL,
    SKIPPED,
    TIMEOUT
}

/**
 * A basic reporter. Nothing fancy.
 */
class BasicReporter implements Reporter {

    private activeFilePath: string;
    private currentIndentLevel = 0;

    private passes: number = 0;
    private failures: number = 0;
    private pending: number = 0;

    initialize(): Promise<void> {
        console.log(`\n${chalk.whiteBright("☾")} Umbra Test`);
        this.drawHorizontalLine();

        return Promise.resolve();
    }

    activeFileChanged = (absolutePath: string) => {
        this.activeFilePath = absolutePath;
    };

    afterDescribe = (title: string, elapsedMs: number) => {
        this.currentIndentLevel--;
    };

    beforeDescribe = (title: string) => {
        console.log(this.getIndentedText(chalk.cyan("⤷") + ` ${title}`));

        this.currentIndentLevel++;
    };

    beforeTest = (title: string) => {
        console.log(this.getIndentedText(chalk.cyan("⤷") + ` ${title}`));

        this.pending++;
        this.currentIndentLevel++;
    };

    runEnd = (results: RunResults) => {
        // Intentionally blank.
    };

    runStart = () => {
        // Intentionally blank.
    };

    testFail = (title: string, error: Error, elapsedMs: number) => {
        const prettyStack = createCallsiteRecord({forError: error}).renderSync({
            /* TODO: Determine whether to default node_module stripping to true
            stackFilter(frame) {
                return !frame.fileName.includes("node_modules");
            },
             */
            frameSize: 3
        });

        console.log(this.getIndentedText(chalk.redBright(`FAIL`)));
        console.log(prettyStack + "\n\n");

        this.pending--;
        this.failures++;
        this.currentIndentLevel--;
    };

    testTimeout = (title: string, elapsedMs: number, timeoutMs: number) => {
        console.log(this.getIndentedText(chalk.redBright(` TIMED OUT`)));

        this.pending--;
        this.failures++;
        this.currentIndentLevel--;
    };

    testSkipped = (title: string) => {
        this.pending--;
        this.currentIndentLevel--;
    };

    testSuccess = (title: string, elapsedMs: number) => {
        this.pending--;
        this.passes++;
        this.currentIndentLevel--;
    };

    private drawHorizontalLine(): void {
        for (let i = 0; i < process.stdout.columns; i++) {
            process.stdout.write("\u2500");
        }
        process.stdout.write("\n");
    }

    private getIndentedText(text: string): string {
        let str = "";
        for (let i = 0; i < this.currentIndentLevel; i++) {
            str += " ";
        }
        return str + text;
    }
}

export {BasicReporter};
