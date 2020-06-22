import { RunResults, TestInfo, TestResults } from "@umbra-test/umbra-test-runner";
import { Reporter } from "../Reporter";
/**
 * A basic reporter. Nothing fancy.
 */
declare class BasicReporter implements Reporter {
    private currentDescribeTitleChain;
    initialize(): Promise<void>;
    onTestStart(testInfo: TestInfo): void;
    onTestResult(testResult: TestResults): void;
    onRunEnd(results: RunResults): void;
    private getIndentedText;
    private drawHorizontalLine;
}
export { BasicReporter };
