import {promises as fsPromises} from "fs";
import * as path from "path";
import {SimpleTSCWrapper} from "./SimpleTSCWrapper";
import {UmbraConfig} from "../Config/UmbraConfig";

class ConfigFileLoader {

    private readonly mkdirPromise: typeof fsPromises.mkdir;
    private readonly statPromise: typeof fsPromises.stat;
    private readonly requireRef: NodeRequire;
    private readonly tsExecutor: SimpleTSCWrapper;

    constructor(mkdirPromise = fsPromises.mkdir, statPromise = fsPromises.stat, requireProxy = require, tsExecutor = new SimpleTSCWrapper()) {
        this.mkdirPromise = mkdirPromise;
        this.statPromise = statPromise;
        this.requireRef = requireProxy;
        this.tsExecutor = tsExecutor;
    }

    async loadConfig(configPath: string, cacheDir: string | undefined): Promise<Partial<UmbraConfig> | null> {
        if (!configPath) {
            return Promise.resolve(null);
        }
        
        if (!cacheDir) {
            throw new Error("Missing cache directory");
        }

        const resolvedPath = path.resolve(configPath);
        if (resolvedPath.endsWith(".js")) {
            return this.loadJsConfig(resolvedPath);
        } else if (resolvedPath.endsWith(".ts")) {
            return this.loadTsConfig(resolvedPath, cacheDir);
        } else {
            throw new Error(`Invalid umbra config type! Must be either js or ts, but was ${path.extname(resolvedPath)}`);
        }
    }

    private async loadJsConfig(configPath: string): Promise<Partial<UmbraConfig> | null> {
        if (!configPath.endsWith(".js")) {
            return Promise.resolve(null);
        }

        return this.statPromise(configPath).then(() => this.requireRef(configPath)).catch(() => null);
    }

    private async loadTsConfig(configPath: string, cacheDir: string): Promise<Partial<UmbraConfig> | null> {
        if (!configPath.endsWith(".ts")) {
            return Promise.resolve(null);
        }

        return this.statPromise(configPath)
            .then(this.makeCacheDir(cacheDir))
            .then(this.getJsConfigPath(configPath, cacheDir))
            .then(this.compileTsConfig(configPath))
            .then((finalPath: string) => this.requireRef(finalPath));
    }

    private makeCacheDir = (cacheDir: string) => {
        return () => this.statPromise(cacheDir).catch(() => this.mkdirPromise(cacheDir));
    };

    private getJsConfigPath = (tsConfigPath: string, cacheDir: string) => {
        const fileName = path.basename(tsConfigPath, ".ts");
        return () => path.resolve(cacheDir, fileName + ".js");
    };

    private compileTsConfig = (configPath: string) => {
        return (finalPath: string) => this.tsExecutor.spawn(configPath, finalPath).then(() => finalPath);
    }
}

export {ConfigFileLoader};
