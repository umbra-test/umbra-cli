import { RunResults } from "@umbra-test/umbra-test-runner";
import { WriteStreamInterceptor } from "../../WriteStreamInterceptor";
import { BaseReporter } from "./BaseReporter";
/**
 * A fancier reporter, with spinners and other fancy things. Mostly to play around with ideas.
 */
declare class FancyReporter extends BaseReporter {
    private readonly stdOutInterceptor;
    private readonly stdErrInterceptor;
    private timer;
    private spinnerIndex;
    private spinnerIcons;
    constructor(stdOutInterceptor?: WriteStreamInterceptor, stdErrInterceptor?: WriteStreamInterceptor);
    initialize(): Promise<void>;
    beforeDescribe(title: string): void;
    beforeTest(title: string): void;
    runEnd(results: RunResults): void;
    testFail(title: string, error: Error, elapsedMs: number): void;
    testTimeout(title: string, elapsedMs: number, timeoutMs: number): void;
    testSkipped(title: string): void;
    testSuccess(title: string, elapsedMs: number): void;
    private onProcessLog;
    private drawHorizontalLine;
    private writeLine;
    private startSpinner;
    private stopSpinner;
}
export { FancyReporter };
