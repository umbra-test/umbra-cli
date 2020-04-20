import * as path from "path";
import {UmbraConfig} from "../Config/UmbraConfig";

class PackageJsonConfigLoader {
    private readonly requireRef: NodeRequire;

    constructor(requireProxy = require) {
        this.requireRef = requireProxy;
    }

    loadConfig(): Partial<UmbraConfig> | null {
        try {
            const packageJson = require(path.resolve(process.cwd(), "./package.json"));
            return packageJson.umbra ? packageJson.umbra : null;
        } catch (error) {
            // TODO: Add verbose logging.
            return null;
        }
    }
}

export {PackageJsonConfigLoader};
