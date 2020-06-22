import { RunResults, TestInfo, TestResult } from "@umbra-test/umbra-test-runner";
import { Reporter } from "../Reporter";
/**
 * A basic reporter. Nothing fancy.
 */
declare class BasicReporter implements Reporter {
    private currentDescribeTitleChain;
    initialize(): Promise<void>;
    onTestStart(testInfo: TestInfo): void;
    onTestEnd(testResult: TestResult): void;
    onRunEnd(results: RunResults): void;
    private getIndentedText;
    private drawHorizontalLine;
}
export { BasicReporter };
