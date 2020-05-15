var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { promises as fsPromises } from "fs";
import * as path from "path";
import { SimpleTSCWrapper } from "./SimpleTSCWrapper";
class ConfigFileLoader {
    constructor(mkdirPromise = fsPromises.mkdir, statPromise = fsPromises.stat, requireProxy = require, tsExecutor = new SimpleTSCWrapper()) {
        this.makeCacheDir = (cacheDir) => {
            return () => this.statPromise(cacheDir).catch(() => this.mkdirPromise(cacheDir));
        };
        this.getJsConfigPath = (tsConfigPath, cacheDir) => {
            const fileName = path.basename(tsConfigPath, ".ts");
            return () => path.resolve(cacheDir, fileName + ".js");
        };
        this.compileTsConfig = (configPath) => {
            return (finalPath) => this.tsExecutor.spawn(configPath, finalPath).then(() => finalPath);
        };
        this.mkdirPromise = mkdirPromise;
        this.statPromise = statPromise;
        this.requireRef = requireProxy;
        this.tsExecutor = tsExecutor;
    }
    loadConfig(configPath, cacheDir) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!configPath) {
                return Promise.resolve(null);
            }
            if (!cacheDir) {
                throw new Error("Missing cache directory");
            }
            const resolvedPath = path.resolve(configPath);
            if (resolvedPath.endsWith(".js")) {
                return this.loadJsConfig(resolvedPath);
            }
            else if (resolvedPath.endsWith(".ts")) {
                return this.loadTsConfig(resolvedPath, cacheDir);
            }
            else {
                throw new Error(`Invalid umbra config type! Must be either js or ts, but was ${path.extname(resolvedPath)}`);
            }
        });
    }
    loadJsConfig(configPath) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!configPath.endsWith(".js")) {
                return Promise.resolve(null);
            }
            return this.statPromise(configPath).then(() => this.requireRef(configPath)).catch(() => null);
        });
    }
    loadTsConfig(configPath, cacheDir) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!configPath.endsWith(".ts")) {
                return Promise.resolve(null);
            }
            return this.statPromise(configPath)
                .then(this.makeCacheDir(cacheDir))
                .then(this.getJsConfigPath(configPath, cacheDir))
                .then(this.compileTsConfig(configPath))
                .then((finalPath) => this.requireRef(finalPath));
        });
    }
}
export { ConfigFileLoader };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29uZmlnRmlsZUxvYWRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9Db25maWcvQ29uZmlnRmlsZUxvYWRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSxPQUFPLEVBQUMsUUFBUSxJQUFJLFVBQVUsRUFBQyxNQUFNLElBQUksQ0FBQztBQUMxQyxPQUFPLEtBQUssSUFBSSxNQUFNLE1BQU0sQ0FBQztBQUM3QixPQUFPLEVBQUMsZ0JBQWdCLEVBQUMsTUFBTSxvQkFBb0IsQ0FBQztBQUdwRCxNQUFNLGdCQUFnQjtJQU9sQixZQUFZLFlBQVksR0FBRyxVQUFVLENBQUMsS0FBSyxFQUFFLFdBQVcsR0FBRyxVQUFVLENBQUMsSUFBSSxFQUFFLFlBQVksR0FBRyxPQUFPLEVBQUUsVUFBVSxHQUFHLElBQUksZ0JBQWdCLEVBQUU7UUE4Qy9ILGlCQUFZLEdBQUcsQ0FBQyxRQUFnQixFQUFFLEVBQUU7WUFDeEMsT0FBTyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7UUFDckYsQ0FBQyxDQUFDO1FBRU0sb0JBQWUsR0FBRyxDQUFDLFlBQW9CLEVBQUUsUUFBZ0IsRUFBRSxFQUFFO1lBQ2pFLE1BQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsWUFBWSxFQUFFLEtBQUssQ0FBQyxDQUFDO1lBQ3BELE9BQU8sR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsUUFBUSxHQUFHLEtBQUssQ0FBQyxDQUFDO1FBQzFELENBQUMsQ0FBQztRQUVNLG9CQUFlLEdBQUcsQ0FBQyxVQUFrQixFQUFFLEVBQUU7WUFDN0MsT0FBTyxDQUFDLFNBQWlCLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxD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