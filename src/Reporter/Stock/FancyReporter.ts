import ansiEscapes from "ansi-escapes";
import createCallsiteRecord from "callsite-record";
import colors from "ansi-colors";
import {RunResults} from "@umbra-test/umbra-test-runner";

import {WriteStreamInterceptor} from "../../WriteStreamInterceptor";
import {BaseReporter} from "./BaseReporter";

enum TestResult {
    SUCCESS,
    FAIL,
    SKIPPED,
    TIMEOUT
}

/**
 * A fancier reporter, with spinners and other fancy things. Mostly to play around with ideas.
 */
class FancyReporter extends BaseReporter {

    private readonly stdOutInterceptor: WriteStreamInterceptor;
    private readonly stdErrInterceptor: WriteStreamInterceptor;

    private timer: NodeJS.Timeout = null;

    private spinnerIndex = 0;

    private spinnerIcons = ["◴", "◷", "◶", "◵"]; //["🌑", "🌒", "🌓", "🌔", "🌕", "🌝", "🌖", "🌗", "🌘", "🌚"];

    constructor(stdOutInterceptor = new WriteStreamInterceptor(),
                stdErrInterceptor = new WriteStreamInterceptor()) {
        super();

        this.stdOutInterceptor = stdOutInterceptor;
        this.stdErrInterceptor = stdErrInterceptor;
    }

    initialize(): Promise<void> {
        this.stdOutInterceptor.start(process.stdout, this.onProcessLog);
        this.stdErrInterceptor.start(process.stderr, this.onProcessLog);

        this.stdOutInterceptor.writeDirect("\u001B[?25l");
        this.writeLine(`\n${colors.whiteBright("☾")} Umbra Test`);
        this.writeLine(colors.white(`⤷ All logs will be intercepted and written to a local file.`));
        this.drawHorizontalLine();

        return Promise.resolve();
    }

    beforeDescribe(title: string) {
        this.writeLine(this.getIndentedText(colors.cyan("⤷") + ` ${title}`));

        super.beforeDescribe(title);
    };

    beforeTest(title: string) {
        this.startSpinner(title);

        super.beforeTest(title);
    };

    runEnd(results: RunResults) {
        this.stdOutInterceptor.writeDirect("\u001B[?25h");

        this.stdOutInterceptor.stop();
        this.stdErrInterceptor.stop();
    };

    testFail(title: string, error: Error, elapsedMs: number) {
        this.stopSpinner(TestResult.FAIL);
        this.stdErrInterceptor.writeDirect(error.message + "\n");

        const prettyStack = createCallsiteRecord({forError: error}).renderSync({
            /* TODO: Determine whether to default node_module stripping to true
            stackFilter(frame) {
                return !frame.fileName.includes("node_modules");
            },
             */
            frameSize: 3
        });
        this.stdErrInterceptor.writeDirect(prettyStack + "\n\n");

        super.testFail(title, error, elapsedMs);
    };

    testTimeout(title: string, elapsedMs: number, timeoutMs: number) {
        this.stopSpinner(TestResult.TIMEOUT);

        super.testTimeout(title, elapsedMs, timeoutMs);
    };

    testSkipped(title: string) {
        this.stopSpinner(TestResult.SKIPPED);

        super.testSkipped(title);
    };

    testSuccess(title: string, elapsedMs: number) {
        this.stopSpinner(TestResult.SUCCESS);

        super.testSuccess(title, elapsedMs);
    };

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
        this.stdOutInterceptor.writeDirect(this.getIndentedText(colors.yellow(this.spinnerIcons[this.spinnerIndex]) + " " + text));
        this.stdOutInterceptor.writeDirect(ansiEscapes.cursorLeft);
        this.stdOutInterceptor.writeDirect(ansiEscapes.cursorForward(this.currentIndentLevel + 1));
        this.timer = setInterval(() => {
            this.stdOutInterceptor.writeDirect(ansiEscapes.cursorBackward(1));
            this.spinnerIndex = (this.spinnerIndex + 1) % (this.spinnerIcons.length - 1);
            this.stdOutInterceptor.writeDirect(colors.yellow(this.spinnerIcons[this.spinnerIndex]));
        }, 200);
    }

    private stopSpinner(result: TestResult): void {
        clearInterval(this.timer);

        this.stdOutInterceptor.writeDirect(ansiEscapes.cursorBackward(1));
        if (result === TestResult.FAIL) {
            this.stdOutInterceptor.writeDirect(colors.redBright("✘"));
        } else if (result === TestResult.SUCCESS) {
            this.stdOutInterceptor.writeDirect(colors.greenBright("✓"));
        } else if (result === TestResult.TIMEOUT) {
            this.stdOutInterceptor.writeDirect(colors.redBright("⏲"));
        }
        this.stdOutInterceptor.writeDirect(ansiEscapes.cursorNextLine);
        this.stdOutInterceptor.writeDirect("\n");
    }
}

export {FancyReporter};
