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
                return;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29uZmlnRmlsZUxvYWRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9Db25maWcvQ29uZmlnRmlsZUxvYWRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSxPQUFPLEVBQUMsUUFBUSxJQUFJLFVBQVUsRUFBQyxNQUFNLElBQUksQ0FBQztBQUMxQyxPQUFPLEtBQUssSUFBSSxNQUFNLE1BQU0sQ0FBQztBQUM3QixPQUFPLEVBQUMsZ0JBQWdCLEVBQUMsTUFBTSxvQkFBb0IsQ0FBQztBQUdwRCxNQUFNLGdCQUFnQjtJQU9sQixZQUFZLFlBQVksR0FBRyxVQUFVLENBQUMsS0FBSyxFQUFFLFdBQVcsR0FBRyxVQUFVLENBQUMsSUFBSSxFQUFFLFlBQVksR0FBRyxPQUFPLEVBQUUsVUFBVSxHQUFHLElBQUksZ0JBQWdCLEVBQUU7UUEwQy9ILGlCQUFZLEdBQUcsQ0FBQyxRQUFnQixFQUFFLEVBQUU7WUFDeEMsT0FBTyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7UUFDckYsQ0FBQyxDQUFDO1FBRU0sb0JBQWUsR0FBRyxDQUFDLFlBQW9CLEVBQUUsUUFBZ0IsRUFBRSxFQUFFO1lBQ2pFLE1BQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsWUFBWSxFQUFFLEtBQUssQ0FBQyxDQUFDO1lBQ3BELE9BQU8sR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsUUFBUSxHQUFHLEtBQUssQ0FBQyxDQUFDO1FBQzFELENBQUMsQ0FBQztRQUVNLG9CQUFlLEdBQUcsQ0FBQyxVQUFVLEVBQUUsRUFBRTtZQUNyQyxPQUFPLENBQUMsU0FBUyxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxVQUFVLEVBQUUsU0FBUyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQzdGLENBQUMsQ0FBQTtRQXBERyxJQUFJLENBQUMsWUFBWSxHQUFHLFlBQVksQ0FBQztRQUNqQyxJQUFJLENBQUMsV0FBVyxHQUFHLFdBQVcsQ0FBQztRQUMvQixJQUFJLENBQUMsVUFBVSxHQUFHLFlBQVksQ0FBQztRQUMvQixJQUFJLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQztJQUNqQyxDQUFDO0lBRUssVUFBVSxDQUFDLFVBQWtCLEVBQUUsUUFBZ0I7O1lBQ2pELElBQUksQ0FBQyxVQUFVLEVBQUU7Z0JBQ2IsT0FBTzthQUNWO1lBRUQsTUFBTSxZQUFZLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUM5QyxJQUFJLFlBQVksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLEVBQUU7Z0JBQzlCLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyxZQUFZLENBQUMsQ0FBQzthQUMxQztpQkFBTSxJQUFJLFlBQVksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLEVBQUU7Z0JBQ3JDLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyxZQUFZLEVBQUUsUUFBUSxDQUFDLENBQUM7YUFDcEQ7aUJBQU07Z0JBQ0gsTUFBTSxJQUFJLEtBQUssQ0FBQywrREFBK0QsSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLENBQUM7YUFDaEg7UUFDTCxDQUFDO0tBQUE7SUFFYSxZQUFZLENBQUMsVUFBa0I7O1lBQ3pDLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxFQUFFO2dCQUM3QixPQUFPLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7YUFDaEM7WUFFRCxPQUFPLElBQUksQ0FBQyxXQUFXLENBQUMsVUFBVSxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDbEcsQ0FBQztLQUFBO0lBRWEsWUFBWSxDQUFDLFVBQWtCLEVBQUUsUUFBZ0I7O1lBQzNELElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxFQUFFO2dCQUM3QixPQUFPLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7YUFDaEM7WUFFRCxPQUFPLElBQUksQ0FBQyxXQUFXLENBQUMsVUFBVSxDQUFDO2lCQUM5QixJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsQ0FBQztpQkFDakMsSUFBSSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsVUFBVSxFQUFFLFFBQVEsQ0FBQyxDQUFDO2lCQUNoRCxJQUFJLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxVQUFVLENBQUMsQ0FBQztpQkFDdEMsSUFBSSxDQUFDLENBQUMsU0FBaUIsRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO1FBQ2pFLENBQUM7S0FBQTtDQWNKO0FBRUQsT0FBTyxFQUFDLGdCQUFnQixFQUFDLENBQUMifQ==