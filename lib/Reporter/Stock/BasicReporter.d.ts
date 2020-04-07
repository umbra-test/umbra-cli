import { BaseReporter } from "./BaseReporter";
import { RunResults } from "@umbra-test/umbra-test-runner";
/**
 * A basic reporter. Nothing fancy.
 */
declare class BasicReporter extends BaseReporter {
    private verboseMode;
    private filesEvaluated;
    beforeDescribe(title: string): void;
    beforeTest(title: string): void;
    testFail(title: string, error: Error, elapsedMs: number): void;
    testTimeout(title: string, elapsedMs: number, timeoutMs: number): void;
    testSuccess(title: string, elapsedMs: number): void;
    runEnd(results: RunResults): void;
    activeFileChanged(absolutePath: string): void;
    private printPrettyStackTrace;
}
export { BasicReporter };
