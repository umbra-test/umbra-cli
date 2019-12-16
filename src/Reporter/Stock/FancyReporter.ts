import {RunResults} from "umbra-test-runner";

import {Reporter} from "../Reporter";
import chalk from "chalk";
import ansiEscapes from "ansi-escapes";
import {WriteStreamInterceptor} from "../../WriteStreamInterceptor";
import createCallsiteRecord from "callsite-record";


enum TestResult {
    SUCCESS,
    FAIL,
    SKIPPED,
    TIMEOUT
}

/**
 * A port of Mocha's nyan reporter, for obvious reasons.
 */
class FancyReporter implements Reporter {

    private readonly stdOutInterceptor: WriteStreamInterceptor;
    private readonly stdErrInterceptor: WriteStreamInterceptor;

    private timer: NodeJS.Timeout = null;

    private activeFilePath: string;
    private currentIndentLevel = 0;
    private lines: string[] = [];

    private spinnerIndex = 0;

    private spinnerIcons = ["◴", "◷", "◶", "◵"]; //["🌑", "🌒", "🌓", "🌔", "🌕", "🌝", "🌖", "🌗", "🌘", "🌚"];

    constructor(stdOutInterceptor = new WriteStreamInterceptor(),
                stdErrInterceptor = new WriteStreamInterceptor()) {
        this.stdOutInterceptor = stdOutInterceptor;
        this.stdErrInterceptor = stdErrInterceptor;
    }

    initialize(): Promise<void> {
        this.stdOutInterceptor.start(process.stdout, this.onProcessLog);
        this.stdErrInterceptor.start(process.stderr, this.onProcessLog);

        this.stdOutInterceptor.writeDirect("\u001B[?25l");
        this.writeLine(`\n${chalk.whiteBright("☾")} Umbra Test`);
        this.writeLine(chalk.white(`⤷ All logs will be intercepted and written to a local file.`));
        this.drawHorizontalLine();

        return Promise.resolve();
    }

    activeFileChanged = (absolutePath: string) => {
        this.activeFilePath = absolutePath;
        this.lines.push(chalk.cyan(">>") + ` ${this.activeFilePath}`);
    };

    afterDescribe = (title: string, elapsedMs: number) => {
        this.currentIndentLevel--;
    };

    beforeDescribe = (title: string) => {
        this.writeLine(this.getIndentedText(chalk.cyan("⤷") + ` ${title}`));
        this.currentIndentLevel++;
    };

    beforeTest = (title: string) => {
        this.startSpinner(title);

        this.pending++;
        this.currentIndentLevel++;
    };

    runEnd = (results: RunResults) => {
        this.stdOutInterceptor.writeDirect("\u001B[?25h");

        this.stdOutInterceptor.stop();
        this.stdErrInterceptor.stop();
    };

    runStart = () => {

    };

    testFail = (title: string, error: Error, elapsedMs: number) => {
        this.stopSpinner(TestResult.FAIL);

        const prettyStack = createCallsiteRecord({forError: error}).renderSync({
            /* TODO: Determine whether to default node_module stripping to true
            stackFilter(frame) {
                return !frame.fileName.includes("node_modules");
            },
             */
            frameSize: 3
        });
        this.stdErrInterceptor.writeDirect(prettyStack + "\n\n");

        this.pending--;
        this.failures++;
        this.currentIndentLevel--;
    };

    testTimeout = (title: string, elapsedMs: number, timeoutMs: number) => {
        this.stopSpinner(TestResult.TIMEOUT);

        this.pending--;
        this.failures++;
        this.currentIndentLevel--;
    };

    testSkipped = (title: string) => {
        this.stopSpinner(TestResult.SKIPPED);

        this.pending--;
        this.currentIndentLevel--;
    };

    testSuccess = (title: string, elapsedMs: number) => {
        this.stopSpinner(TestResult.SUCCESS);

        this.pending--;
        this.passes++;
        this.currentIndentLevel--;
    };

    private passes: number = 0;
    private failures: number = 0;
    private pending: number = 0;

    private onProcessLog = (text: string): string | void => {
        //return text;
    };

    private drawHorizontalLine(): void {
        for (let i = 0; i < process.stdout.columns; i++) {
            this.stdOutInterceptor.writeDirect("\u2500");
        }
        this.stdOutInterceptor.writeDirect("\n");
    }

    private writeLine(text: string): void {
        this.stdOutInterceptor.writeDirect(text + "\n");
    }

    private startSpinner(text: string): void {
        this.stdOutInterceptor.writeDirect(this.getIndentedText(chalk.yellow(this.spinnerIcons[this.spinnerIndex]) + " " + text));
        this.stdOutInterceptor.writeDirect(ansiEscapes.cursorLeft);
        this.stdOutInterceptor.writeDirect(ansiEscapes.cursorForward(this.currentIndentLevel + 1));
        this.timer = setInterval(() => {
            this.stdOutInterceptor.writeDirect(ansiEscapes.cursorBackward(1));
            this.spinnerIndex = (this.spinnerIndex + 1) % (this.spinnerIcons.length - 1);
            this.stdOutInterceptor.writeDirect(chalk.yellow(this.spinnerIcons[this.spinnerIndex]));
        }, 200);
    }

    private stopSpinner(result: TestResult): void {
        clearInterval(this.timer);

        this.stdOutInterceptor.writeDirect(ansiEscapes.cursorBackward(1));
        if (result === TestResult.FAIL) {
            this.stdOutInterceptor.writeDirect(chalk.redBright("✘"));
        } else if (result === TestResult.SUCCESS) {
            this.stdOutInterceptor.writeDirect(chalk.greenBright("✓"));
        } else if (result === TestResult.TIMEOUT) {
            this.stdOutInterceptor.writeDirect(chalk.redBright("⏲"));
        }
        this.stdOutInterceptor.writeDirect(ansiEscapes.cursorNextLine);
        this.stdOutInterceptor.writeDirect("\n");
    }

    private getIndentedText(text: string): string {
        let str = "";
        for (let i = 0; i < this.currentIndentLevel; i++) {
            str += " ";
        }
        return str + text;
    }
}

export {FancyReporter};
