import { BaseReporter } from "./BaseReporter";
/**
 * A basic reporter. Nothing fancy.
 */
declare class BasicReporter extends BaseReporter {
    beforeDescribe(title: string): void;
    beforeTest(title: string): void;
    testFail(title: string, error: Error, elapsedMs: number): void;
    testTimeout(title: string, elapsedMs: number, timeoutMs: number): void;
    private printPrettyStackTrace;
}
export { BasicReporter };
