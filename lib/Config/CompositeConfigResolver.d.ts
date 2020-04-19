/// <reference types="node" />
import { CliConfigResolver } from "./CliConfigResolver";
import { ConfigFileLoader } from "./ConfigFileLoader";
import { promises } from "fs";
import { PackageJsonConfigLoader } from "./PackageJsonConfigLoader";
import { ConfigMerger } from "./ConfigMerger";
declare class CompositeConfigResolver {
    private readonly statPromise;
    private readonly cliConfigResolver;
    private readonly configFileLoader;
    private readonly packageJsonConfigLoader;
    private readonly configMerger;
    constructor(statPromise?: typeof promises.stat, argParser?: CliConfigResolver, configFileLoader?: ConfigFileLoader, packageJsonConfigLoader?: PackageJsonConfigLoader, configMerger?: ConfigMerger);
    resolve(argv: string[]): Promise<UmbraConfig>;
    private getFileConfig;
}
export { CompositeConfigResolver };
