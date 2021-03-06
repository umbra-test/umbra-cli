import { CliConfigResolver } from "./CliConfigResolver";
import { ConfigFileLoader } from "./ConfigFileLoader";
import { PackageJsonConfigLoader } from "./PackageJsonConfigLoader";
import { ConfigMerger } from "./ConfigMerger";
import { UmbraConfig } from "../Config/UmbraConfig";
declare class CompositeConfigResolver {
    private readonly cliConfigResolver;
    private readonly configFileLoader;
    private readonly packageJsonConfigLoader;
    private readonly configMerger;
    constructor(argParser?: CliConfigResolver, configFileLoader?: ConfigFileLoader, packageJsonConfigLoader?: PackageJsonConfigLoader, configMerger?: ConfigMerger);
    resolve(argv: string[]): Promise<UmbraConfig>;
    private getFileConfig;
}
export { CompositeConfigResolver };
