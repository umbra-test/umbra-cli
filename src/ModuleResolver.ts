import fastGlob from "fast-glob";
import * as path from "path";
import {TestRunner} from "@umbra-test/umbra-test-runner";

class ModuleResolver {

    private readonly testRunner: TestRunner;

    constructor(testRunner: TestRunner) {
        this.testRunner = testRunner;
    }

    /**
     * A helper method which will resolve modules matching the input glob.
     * @param inputGlobs
     * @return a promise which will be resolved when all modules are.
     */
    public resolveGlob(inputGlobs: string[]): Promise<void> {
        return fastGlob(inputGlobs)
            .then((resolvedEntries) => {
                for (const entry of resolvedEntries) {
                    const resolvedPath = path.resolve(entry.toString());
                    this.testRunner.setCurrentFile(resolvedPath);
                    require(resolvedPath);
                }
            });
    }
}

export {ModuleResolver};