import {spawn} from "child_process";

class SimpleTSCWrapper {
    private readonly spawnRef: typeof spawn;

    constructor(spawnRef = spawn) {
        this.spawnRef = spawn;
    }

    spawn(inFile: string, outFile: string): Promise<void> {
        // TODO: Add better verbose logging flags, tsc config options, error messaging.
        return new Promise((resolve, reject) => {
            const tscProcess = this.spawnRef("tsc", ["--outFile", outFile, inFile], {stdio: "inherit", shell: true});
            tscProcess.on("error", reject);
            tscProcess.on("close", resolve);
        });
    }
}

export {SimpleTSCWrapper};
