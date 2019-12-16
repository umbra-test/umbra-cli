import {RunResults} from "umbra-test-runner";

interface Reporter {

    initialize(): Promise<void>;

    runStart(): void;

    activeFileChanged(absolutePath: string): void;

    beforeTest(title: string): void;

    testSuccess(title: string, elapsedMs: number): void;

    testFail(title: string, error: Error, elapsedMs: number): void;

    testTimeout(title: string, elapsedMs: number, timeoutMs: number): void;

    testSkipped(title: string): void;

    beforeDescribe(title: string): void;

    afterDescribe(title: string, elapsedMs: number): void;

    runEnd(results: RunResults): void;

}

export {Reporter};