var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { CliConfigResolver } from "./CliConfigResolver";
import { ConfigFileLoader } from "./ConfigFileLoader";
import { DefaultConfig } from "./DefaultConfig";
import { PackageJsonConfigLoader } from "./PackageJsonConfigLoader";
import { ConfigMerger } from "./ConfigMerger";
const DEFAULT_TS_CONFIG = "./umbra.config.ts";
const DEFAULT_JS_CONFIG = "./umbra.config.js";
class CompositeConfigResolver {
    constructor(argParser = new CliConfigResolver(), configFileLoader = new ConfigFileLoader(), packageJsonConfigLoader = new PackageJsonConfigLoader(), configMerger = new ConfigMerger()) {
        this.cliConfigResolver = argParser;
        this.configFileLoader = configFileLoader;
        this.packageJsonConfigLoader = packageJsonConfigLoader;
        this.configMerger = configMerger;
    }
    resolve(argv) {
        return __awaiter(this, void 0, void 0, function* () {
            const cliConfig = this.cliConfigResolver.parse(argv);
            const fileConfig = yield this.getFileConfig(cliConfig.configPath);
            const packageJsonConfig = this.packageJsonConfigLoader.loadConfig();
            if (fileConfig && packageJsonConfig) {
                throw new Error("Config exists within both package.json and an umbra.config file. Please remove one.");
            }
            return this.configMerger.merge(DefaultConfig, packageJsonConfig, fileConfig, cliConfig);
        });
    }
    getFileConfig(cliConfigPath) {
        return __awaiter(this, void 0, void 0, function* () {
            if (cliConfigPath) {
                return yield this.configFileLoader.loadConfig(cliConfigPath, DefaultConfig.cacheDir);
            }
            // TypeScript is preferred, if it exists.
            try {
                return yield this.configFileLoader.loadConfig(DEFAULT_TS_CONFIG, DefaultConfig.cacheDir);
            }
            catch (error) {
                // Intentionally blank. TODO: Add verbose logging.
            }
            try {
                return yield this.configFileLoader.loadConfig(DEFAULT_JS_CONFIG, DefaultConfig.cacheDir);
            }
            catch (error) {
                // Intentionally blank. TODO: Add verbose logging.
            }
            return null;
        });
    }
}
export { CompositeConfigResolver };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29tcG9zaXRlQ29uZmlnUmVzb2x2ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvQ29uZmlnL0NvbXBvc2l0ZUNvbmZpZ1Jlc29sdmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ3hELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQ3RELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUVoRCxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUNwRSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFHOUMsTUFBTSxpQkFBaUIsR0FBRyxtQkFBbUIsQ0FBQztBQUM5QyxNQUFNLGlCQUFpQixHQUFHLG1CQUFtQixDQUFDO0FBRTlDLE1BQU0sdUJBQXVCO0lBT3pCLFlBQVksU0FBUyxHQUFHLElBQUksaUJBQWlCLEVBQUUsRUFBRSxnQkFBZ0IsR0FBRyxJQUFJLGdCQUFnQixFQUFFLEVBQUUsdUJBQXVCLEdBQUcsSUFBSSx1QkFBdUIsRUFBRSxFQUFFLFlBQVksR0FBRyxJQUFJLFlBQVksRUFBRTtRQUNsTCxJQUFJLENBQUMsaUJBQWlCLEdBQUcsU0FBUyxDQUFDO1FBQ25DLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxnQkFBZ0IsQ0FBQztRQUN6QyxJQUFJLENBQUMsdUJBQXVCLEdBQUcsdUJBQXVCLENBQUM7UUFDdkQsSUFBSSxDQUFDLFlBQVksR0FBRyxZQUFZLENBQUM7SUFDckMsQ0FBQztJQUVLLE9BQU8sQ0FBQyxJQUFjOztZQUN4QixNQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3JELE1BQU0sVUFBVSxHQUFHLE1BQU0sSUFBSSxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLENBQUM7WUFDbEUsTUFBTSxpQkFBaUIsR0FBRyxJQUFJLENBQUMsdUJBQXVCLENBQUMsVUFBVSxFQUFFLENBQUM7WUFFcEUsSUFBSSxVQUFVLElBQUksaUJBQWlCLEVBQUU7Z0JBQ2pDLE1BQU0sSUFBSSxLQUFLLENBQUMscUZBQXFGLENBQUMsQ0FBQzthQUMxRztZQUVELE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsYUFBYSxFQUFFLGlCQUFpQixFQUFFLFVBQVUsRUFBRSxTQUFTLENBQUMsQ0FBQztRQUM1RixDQUFDO0tBQUE7SUFFYSxhQUFhLENBQUMsYUFBcUI7O1lBQzdDLElBQUksYUFBYSxFQUFFO2dCQUNmLE9BQU8sTUFBTSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsVUFBVSxDQUFDLGFBQWEsRUFBRSxhQUFhLENBQUMsUUFBUSxDQUFDLENBQUM7YUFDeEY7WUFFRCx5Q0FBeUM7WUFDekMsSUFBSTtnQkFDQSxPQUFPLE1BQU0sSUFBSSxDQUFDLGdCQUFnQixDQUFDLFVBQVUsQ0FBQyxpQkFBaUIsRUFBRSxhQUFhLENBQUMsUUFBUSxDQUFDLENBQUM7YUFDNUY7WUFBQyxPQUFPLEtBQUssRUFBRTtnQkFDWixrREFBa0Q7YUFDckQ7WUFFRCxJQUFJO2dCQUNBLE9BQU8sTUFBTSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsVUFBVSxDQUFDLGlCQUFpQixFQUFFLGFBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQzthQUM1RjtZQUFDLE9BQU8sS0FBSyxFQUFFO2dCQUNaLGtEQUFrRDthQUNyRDtZQUVELE9BQU8sSUFBSSxDQUFDO1FBQ2hCLENBQUM7S0FBQTtDQUNKO0FBRUQsT0FBTyxFQUFFLHVCQUF1QixFQUFFLENBQUMifQ==