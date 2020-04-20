import {TestRunner} from "@umbra-test/umbra-test-runner";
import {Reporter} from "../Reporter/Reporter";
import {UmbraConfig} from "../Config/UmbraConfig";

interface StartupContext {
    runner: TestRunner;
    config: UmbraConfig;
    reporters: Reporter[];
}

export {StartupContext};