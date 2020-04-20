import { TestRunner } from "@umbra-test/umbra-test-runner";
import { StartupContext } from "./StartupContext";
declare global {
    const it: TestRunner["it"];
    const describe: TestRunner["describe"];
    const after: TestRunner["after"];
    const afterEach: TestRunner["afterEach"];
    const before: TestRunner["before"];
    const beforeEach: TestRunner["beforeEach"];
    const __testRunner: TestRunner;
}
declare const ExportGlobals: (context: StartupContext) => StartupContext;
export { ExportGlobals };
