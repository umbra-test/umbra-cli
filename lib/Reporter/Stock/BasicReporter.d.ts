import { BaseReporter } from "./BaseReporter";
import { RunResults } from "@umbra-test/umbra-test-runner";
/**
 * A basic reporter. Nothing fancy.
 */
declare class BasicReporter extends BaseReporter {
    private startTime;
    beforeDescribe(title: string): void;
    beforeTest(title: string): void;
    testFail(title: string, error: Error, elapsedMs: number): void;
    testTimeout(title: string, elapsedMs: number, timeoutMs: number): void;
    runEnd(results: RunResults): void;
    private printPrettyStackTrace;
}
export { BasicReporter };
