import colors from "ansi-colors";
import {deepEqual} from "@umbra-test/umbra-util";
import {RunResults, TestInfo, TestResults} from "@umbra-test/umbra-test-runner";
import {Reporter} from "../Reporter";

/**
 * A basic reporter. Nothing fancy.
 */
class BasicReporter implements Reporter {
    private currentDescribeTitleChain: string[] = [];

    initialize(): Promise<void> {
        console.log("\n" + colors.whiteBright("☾ Umbra Test"));
        this.drawHorizontalLine();

        return Promise.resolve();
    }

    onTestStart(testInfo: TestInfo): void {
        // Intentionally blank.
    }

    onTestResult(testResult: TestResults): void {
        const describeTitleChain = testResult.testInfo.describeTitleChain;
        const indentLevel = describeTitleChain.length + 1;
        if (describeTitleChain.length > 0 && !deepEqual(this.currentDescribeTitleChain, describeTitleChain)) {
            this.currentDescribeTitleChain = describeTitleChain;
            console.log(colors.cyan("⤷ ") + describeTitleChain[0]);
            for (let i = 1; i < describeTitleChain.length; i++) {
                console.log(this.getIndentedText(colors.cyan("⤷ ") + describeTitleChain[i], i + 1));
            }
        }

        if (testResult.result === "fail") {
            console.log(this.getIndentedText(colors.redBright(`✖ `) + testResult.testInfo.title, indentLevel));
            console.log(this.getIndentedText(colors.red("⤷ Error: ") + testResult.error!.message, indentLevel + 1));
        } else if (testResult.result === "timeout") {
            console.log(this.getIndentedText(colors.redBright(`⏲ `) + testResult.testInfo.title, indentLevel));
        } else if (testResult.result === "skipped") {
            console.log(this.getIndentedText(colors.yellow(`SKIPPED `) + testResult.testInfo.title, indentLevel));
        } else if (testResult.result === "success") {
            console.log(this.getIndentedText(colors.green(`✓ `) + testResult.testInfo.title, indentLevel));
        }
    }

    onRunEnd(results: RunResults): void {
        console.log(`Tests: ${colors.red(results.totalFailures.toString())} failures, ${colors.yellow(results.totalTimeouts.toString())} timeouts, ${colors.green(results.totalSuccesses.toString())} passed, ${results.totalTests} total`);
        console.log(`Time:  ${results.elapsedTimeMs}ms`);
        //console.log(`Files: ${this.filesEvaluated}`);
    }

    private getIndentedText(text: string, indentLevel: number): string {
        let str = "";
        for (let i = 0; i < indentLevel; i++) {
            str += " ";
        }
        return str + text;
    }

    private drawHorizontalLine(): void {
        for (let i = 0; i < process.stdout.columns - 1; i++) {
            process.stdout.write("\u2500");
        }
        process.stdout.write("\n");
    }
}

export {BasicReporter};
