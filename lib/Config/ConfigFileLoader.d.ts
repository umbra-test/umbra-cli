/// <reference types="node" />
import { promises as fsPromises } from "fs";
import { SimpleTSCWrapper } from "./SimpleTSCWrapper";
import { UmbraConfig } from "../Config/UmbraConfig";
declare class ConfigFileLoader {
    private readonly mkdirPromise;
    private readonly statPromise;
    private readonly requireRef;
    private readonly tsExecutor;
    constructor(mkdirPromise?: typeof fsPromises.mkdir, statPromise?: typeof fsPromises.stat, requireProxy?: NodeRequire, tsExecutor?: SimpleTSCWrapper);
    loadConfig(configPath: string, cacheDir: string): Promise<Partial<UmbraConfig>>;
    private loadJsConfig;
    private loadTsConfig;
    private makeCacheDir;
    private getJsConfigPath;
    private compileTsConfig;
}
export { ConfigFileLoader };
