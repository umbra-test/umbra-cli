import {CliConfigResolver} from "./CliConfigResolver";
import {ConfigFileLoader} from "./ConfigFileLoader";
import {DefaultConfig} from "./DefaultConfig";
import {promises} from "fs";
import {PackageJsonConfigLoader} from "./PackageJsonConfigLoader";
import {ConfigMerger} from "./ConfigMerger";
import {UmbraConfig} from "../Config/UmbraConfig";

const DEFAULT_TS_CONFIG = "./umbra.config.ts";
const DEFAULT_JS_CONFIG = "./umbra.config.js";

class CompositeConfigResolver {

    private readonly statPromise: typeof promises.stat;
    private readonly cliConfigResolver: CliConfigResolver;
    private readonly configFileLoader: ConfigFileLoader;
    private readonly packageJsonConfigLoader: PackageJsonConfigLoader;
    private readonly configMerger: ConfigMerger;

    constructor(statPromise = promises.stat, argParser = new CliConfigResolver(), configFileLoader = new ConfigFileLoader(), packageJsonConfigLoader = new PackageJsonConfigLoader(), configMerger = new ConfigMerger()) {
        this.statPromise = statPromise;
        this.cliConfigResolver = argParser;
        this.configFileLoader = configFileLoader;
        this.packageJsonConfigLoader = packageJsonConfigLoader;
        this.configMerger = configMerger;
    }

    async resolve(argv: string[]): Promise<UmbraConfig> {
        const cliConfig = this.cliConfigResolver.parse(argv);
        const fileConfig = await this.getFileConfig(cliConfig.configPath);
        const packageJsonConfig = this.packageJsonConfigLoader.loadConfig();

        if (fileConfig && packageJsonConfig) {
            throw new Error("Config exists within both package.json and an umbra.config file. Please remove one.");
        }

        return this.configMerger.merge(DefaultConfig, packageJsonConfig, fileConfig, cliConfig);
    }

    private async getFileConfig(cliConfigPath: string): Promise<Partial<UmbraConfig>> {
        let fileConfig: Partial<UmbraConfig>;
        if (cliConfigPath) {
            return await this.configFileLoader.loadConfig(cliConfigPath, DefaultConfig.cacheDir);
        }

        // TypeScript is preferred, if it exists.
        try {
            return await this.configFileLoader.loadConfig(DEFAULT_TS_CONFIG, DefaultConfig.cacheDir);
        } catch (error) {
            // Intentionally blank. TODO: Add verbose logging.
        }

        if (!fileConfig) {
            try {
                return await this.configFileLoader.loadConfig(DEFAULT_JS_CONFIG, DefaultConfig.cacheDir);
            } catch (error) {
                // Intentionally blank. TODO: Add verbose logging.
            }
        }

        return null;
    }
}

export {CompositeConfigResolver};
