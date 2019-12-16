import { TestRunner } from "umbra-test-runner";
declare class ModuleResolver {
    private readonly testRunner;
    constructor(testRunner: TestRunner);
    /**
     * A helper method which will resolve modules matching the input glob.
     * @param inputGlobs
     * @return a promise which will be resolved when all modules are.
     */
    resolveGlob(inputGlobs: string[]): Promise<void>;
}
export { ModuleResolver };
