import { TestRunner } from "@umbra-test/umbra-test-runner";
import { StartupContext } from "./StartupContext";
declare let typeRunner: TestRunner;
declare global {
    const it: typeof typeRunner.it;
    const describe: typeof typeRunner.describe;
    const after: typeof typeRunner.after;
    const afterEach: typeof typeRunner.afterEach;
    const before: typeof typeRunner.before;
    const beforeEach: typeof typeRunner.beforeEach;
    const __testRunner: TestRunner;
}
declare const ExportGlobals: (context: StartupContext) => StartupContext;
export { ExportGlobals };
