/// <reference types="node" />
import { UmbraConfig } from "../Config/UmbraConfig";
declare class PackageJsonConfigLoader {
    private readonly requireRef;
    constructor(requireProxy?: NodeRequire);
    loadConfig(): Partial<UmbraConfig> | null;
}
export { PackageJsonConfigLoader };
