/// <reference types="node" />
declare class PackageJsonConfigLoader {
    private readonly requireRef;
    constructor(requireProxy?: NodeRequire);
    loadConfig(): Partial<UmbraConfig> | null;
}
export { PackageJsonConfigLoader };
