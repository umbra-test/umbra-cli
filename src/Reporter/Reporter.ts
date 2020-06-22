import {RunResults, TestInfo, TestResults} from "@umbra-test/umbra-test-runner";

interface Reporter {

    initialize(): Promise<void>;

    onTestStart(testInfo: TestInfo): void;

    onTestResult(testResult: TestResults): void;

    onRunEnd(results: RunResults): void;

}

interface ReporterConstructor {
    new (): Reporter;
}

export {Reporter, ReporterConstructor};