import { RunResults } from "@umbra-test/umbra-test-runner";
import { Reporter } from "../Reporter";
/**
 * Base handling of common console reporter functionality, such as tracking of passes, failures, and indentation levels
 * assuming tree-like test result rendering.
 */
declare class BaseReporter implements Reporter {
    protected activeFilePath: string | null;
    protected currentIndentLevel: number;
    private passes;
    private failures;
    private pending;
    initialize(): Promise<void>;
    activeFileChanged(absolutePath: string): void;
    afterDescribe(title: string, elapsedMs: number): void;
    beforeDescribe(title: string): void;
    beforeTest(title: string): void;
    runEnd(results: RunResults): void;
    runStart(): void;
    testFail(title: string, error: Error, elapsedMs: number): void;
    testTimeout(title: string, elapsedMs: number, timeoutMs: number): void;
    testSkipped(title: string): void;
    testSuccess(title: string, elapsedMs: number): void;
    private static drawHorizontalLine;
    protected getIndentedText(text: string, offset?: number): string;
}
export { BaseReporter };
