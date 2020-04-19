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
import { promises } from "fs";
import { PackageJsonConfigLoader } from "./PackageJsonConfigLoader";
import { ConfigMerger } from "./ConfigMerger";
const DEFAULT_TS_CONFIG = "./umbra.config.ts";
const DEFAULT_JS_CONFIG = "./umbra.config.js";
class CompositeConfigResolver {
    constructor(statPromise = promises.stat, argParser = new CliConfigResolver(), configFileLoader = new ConfigFileLoader(), packageJsonConfigLoader = new PackageJsonConfigLoader(), configMerger = new ConfigMerger()) {
        this.statPromise = statPromise;
        this.cliConfigResolver = argParser;
        this.configFileLoader = configFileLoader;
        this.packageJsonConfigLoader = packageJsonConfigLoader;
        this.configMerger = configMerger;
    }
    resolve(argv) {
        return __awaiter(this, void 0, void 0, function* () {
            const cliConfig = this.cliConfigResolver.parse(argv.slice(2));
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
            let fileConfig;
            if (cliConfigPath) {
                return this.configFileLoader.loadConfig(cliConfigPath, DefaultConfig.cacheDir);
            }
            // TypeScript is preferred, if it exists.
            try {
                return this.configFileLoader.loadConfig(DEFAULT_TS_CONFIG, DefaultConfig.cacheDir);
            }
            catch (error) {
                // Intentionally blank. TODO: Add verbose logging.
            }
            if (!fileConfig) {
                try {
                    return this.configFileLoader.loadConfig(DEFAULT_JS_CONFIG, DefaultConfig.cacheDir);
                }
                catch (error) {
                    // Intentionally blank. TODO: Add verbose logging.
                }
            }
            return null;
        });
    }
}
export { CompositeConfigResolver };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29tcG9zaXRlQ29uZmlnUmVzb2x2ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvQ29uZmlnL0NvbXBvc2l0ZUNvbmZpZ1Jlc29sdmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sRUFBQyxpQkFBaUIsRUFBQyxNQUFNLHFCQUFxQixDQUFDO0FBQ3RELE9BQU8sRUFBQyxnQkFBZ0IsRUFBQyxNQUFNLG9CQUFvQixDQUFDO0FBQ3BELE9BQU8sRUFBQyxhQUFhLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUM5QyxPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0sSUFBSSxDQUFDO0FBQzVCLE9BQU8sRUFBQyx1QkFBdUIsRUFBQyxNQUFNLDJCQUEyQixDQUFDO0FBQ2xFLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUU1QyxNQUFNLGlCQUFpQixHQUFHLG1CQUFtQixDQUFDO0FBQzlDLE1BQU0saUJBQWlCLEdBQUcsbUJBQW1CLENBQUM7QUFFOUMsTUFBTSx1QkFBdUI7SUFRekIsWUFBWSxXQUFXLEdBQUcsUUFBUSxDQUFDLElBQUksRUFBRSxTQUFTLEdBQUcsSUFBSSxpQkFBaUIsRUFBRSxFQUFFLGdCQUFnQixHQUFHLElBQUksZ0JBQWdCLEVBQUUsRUFBRSx1QkFBdUIsR0FBRyxJQUFJLHVCQUF1QixFQUFFLEVBQUUsWUFBWSxHQUFHLElBQUksWUFBWSxFQUFFO1FBQy9NLElBQUksQ0FBQyxXQUFXLEdBQUcsV0FBVyxDQUFDO1FBQy9CLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxTQUFTLENBQUM7UUFDbkMsSUFBSSxDQUFDLGdCQUFnQixHQUFHLGdCQUFnQixDQUFDO1FBQ3pDLElBQUksQ0FBQyx1QkFBdUIsR0FBRyx1QkFBdUIsQ0FBQztRQUN2RCxJQUFJLENBQUMsWUFBWSxHQUFHLFlBQVksQ0FBQztJQUNyQyxDQUFDO0lBRUssT0FBTyxDQUFDLElBQWM7O1lBQ3hCLE1BQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzlELE1BQU0sVUFBVSxHQUFHLE1BQU0sSUFBSSxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLENBQUM7WUFDbEUsTUFBTSxpQkFBaUIsR0FBRyxJQUFJLENBQUMsdUJBQXVCLENBQUMsVUFBVSxFQUFFLENBQUM7WUFFcEUsSUFBSSxVQUFVLElBQUksaUJBQWlCLEVBQUU7Z0JBQ2pDLE1BQU0sSUFBSSxLQUFLLENBQUMscUZBQXFGLENBQUMsQ0FBQzthQUMxRztZQUVELE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsYUFBYSxFQUFFLGlCQUFpQixFQUFFLFVBQVUsRUFBRSxTQUFTLENBQUMsQ0FBQztRQUM1RixDQUFDO0tBQUE7SUFFYSxhQUFhLENBQUMsYUFBcUI7O1lBQzdDLElBQUksVUFBZ0MsQ0FBQztZQUNyQyxJQUFJLGFBQWEsRUFBRTtnQkFDZixPQUFPLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxVQUFVLENBQUMsYUFBYSxFQUFFLGFBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQzthQUNsRjtZQUVELHlDQUF5QztZQUN6QyxJQUFJO2dCQUNBLE9BQU8sSUFBSSxDQUFDLGdCQUFnQixDQUFDLFVBQVUsQ0FBQyxpQkFBaUIsRUFBRSxhQUFhLENBQUMsUUFBUSxDQUFDLENBQUM7YUFDdEY7WUFBQyxPQUFPLEtBQUssRUFBRTtnQkFDWixrREFBa0Q7YUFDckQ7WUFFRCxJQUFJLENBQUMsVUFBVSxFQUFFO2dCQUNiLElBQUk7b0JBQ0EsT0FBTyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsVUFBVSxDQUFDLGlCQUFpQixFQUFFLGFBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQztpQkFDdEY7Z0JBQUMsT0FBTyxLQUFLLEVBQUU7b0JBQ1osa0RBQWtEO2lCQUNyRDthQUNKO1lBRUQsT0FBTyxJQUFJLENBQUM7UUFDaEIsQ0FBQztLQUFBO0NBQ0o7QUFFRCxPQUFPLEVBQUMsdUJBQXVCLEVBQUMsQ0FBQyJ9