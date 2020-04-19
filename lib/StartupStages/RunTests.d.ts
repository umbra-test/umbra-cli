import { StartupContext } from "./StartupContext";
import { RunResults } from "@umbra-test/umbra-test-runner";
declare const RunTests: (context: StartupContext) => Promise<RunResults>;
export { RunTests };
