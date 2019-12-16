import { RunResults } from "umbra-test-runner";
import { Reporter } from "../Reporter";
import { WriteStreamInterceptor } from "../../WriteStreamInterceptor";
/**
 * A port of Mocha's nyan reporter, for obvious reasons.
 */
declare class FancyReporter implements Reporter {
    private readonly stdOutInterceptor;
    private readonly stdErrInterceptor;
    private timer;
    private activeFilePath;
    private currentIndentLevel;
    private lines;
    private spinnerIndex;
    private spinnerIcons;
    constructor(stdOutInterceptor?: WriteStreamInterceptor, stdErrInterceptor?: WriteStreamInterceptor);
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
    private passes;
    private failures;
    private pending;
    private onProcessLog;
    private drawHorizontalLine;
    private writeLine;
    private startSpinner;
    private stopSpinner;
    private getIndentedText;
}
export { FancyReporter };
