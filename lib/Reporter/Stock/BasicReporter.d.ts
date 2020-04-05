import { RunResults } from "@umbra-test/umbra-test-runner";
import { Reporter } from "../Reporter";
/**
 * A basic reporter. Nothing fancy.
 */
declare class BasicReporter implements Reporter {
    private activeFilePath;
    private currentIndentLevel;
    private passes;
    private failures;
    private pending;
    initialize(): Promise<void>;
    activeFileChanged: (absolutePath: string) => void;
    afterDescribe: (title: string, elapsedMs: number) => void;
    beforeDescribe: (title: string) => void;
    beforeTest: (title: string) => void;
    runEnd: (results: RunResults) => void;
    runStart: () => void;
    testFail: (title: string, error: Error, elapsedMs: number) => void;
    testTimeout: (title: string, elapsedMs: number, timeoutMs: number) => void;
    testSkipped: (title: string) => void;
    testSuccess: (title: string, elapsedMs: number) => void;
    private drawHorizontalLine;
    private getIndentedText;
}
export { BasicReporter };
