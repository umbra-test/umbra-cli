import { TestRunner } from "umbra-test-runner";
declare const runner: TestRunner;
declare global {
    const it: typeof runner.it;
    const describe: typeof runner.describe;
    const after: typeof runner.after;
    const afterEach: typeof runner.afterEach;
    const before: typeof runner.before;
    const beforeEach: typeof runner.beforeEach;
    const __testRunner: TestRunner;
}
export {};
