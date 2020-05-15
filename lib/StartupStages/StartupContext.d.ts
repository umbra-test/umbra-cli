import { TestRunner } from "@umbra-test/umbra-test-runner";
import { Reporter } from "../Reporter/Reporter";
import { UmbraConfig } from "../Config/UmbraConfig";
declare type Partialize<T, K extends keyof T> = Partial<T> & Pick<T, K>;
interface StartupContext {
    runner: TestRunner;
    config: UmbraConfig;
    reporters: Reporter[];
}
export { Partialize, StartupContext };
