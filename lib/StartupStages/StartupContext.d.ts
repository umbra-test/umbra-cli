import { TestRunner } from "@umbra-test/umbra-test-runner";
import { Reporter } from "../Reporter/Reporter";
interface StartupContext {
    runner: TestRunner;
    config: UmbraConfig;
    reporters: Reporter[];
}
export { StartupContext };
