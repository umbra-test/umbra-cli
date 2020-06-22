import {RunResults, TestInfo, TestResult} from "@umbra-test/umbra-test-runner";

interface Reporter {

    initialize(): Promise<void>;

    onTestStart(testInfo: TestInfo): void;

    onTestEnd(testResult: TestResult): void;

    onRunEnd(results: RunResults): void;

}

interface ReporterConstructor {
    new (): Reporter;
}

export {Reporter, ReporterConstructor};