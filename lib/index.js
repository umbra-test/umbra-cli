var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
import { spawnSync } from "child_process";
import * as path from "path";
import { existsSync, mkdirSync } from "fs";
import { stream as globStream } from "fast-glob";
import { TestRunner } from "umbra-test-runner";
import { ArgsParser } from "./ArgsParser";
const parser = new ArgsParser();
const parsedArgs = parser.parse();
if (!existsSync(parsedArgs.cacheDir)) {
    mkdirSync(parsedArgs.cacheDir);
}
let finalConfig = parsedArgs;
if (existsSync(parsedArgs.configPath)) {
    let finalPath = parsedArgs.configPath;
    if (path.extname(parsedArgs.configPath) === "ts") {
        finalPath = path.resolve(parsedArgs.cacheDir, "config.js");
        spawnSync("tsc", ["--outFile", finalPath, parsedArgs.configPath], { stdio: "inherit" });
    }
    const config = require(finalPath);
    console.error("got config!");
    console.error(config);
}
const runner = new TestRunner();
const globalFunctions = ["it", "describe", "after", "afterEach", "before", "beforeEach"];
for (const fnName of globalFunctions) {
    global[fnName] = runner[fnName];
}
(function () {
    var e_1, _a;
    return __awaiter(this, void 0, void 0, function* () {
        const stream = globStream(finalConfig.input);
        try {
            for (var stream_1 = __asyncValues(stream), stream_1_1; stream_1_1 = yield stream_1.next(), !stream_1_1.done;) {
                const entry = stream_1_1.value;
                const resolvedPath = path.resolve(entry.toString());
                require(resolvedPath);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (stream_1_1 && !stream_1_1.done && (_a = stream_1.return)) yield _a.call(stream_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return runner.run();
    });
})().then((results) => {
    console.error(results);
}).catch((error) => {
    console.error(error);
    process.exit(1);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLE9BQU8sRUFBQyxTQUFTLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDeEMsT0FBTyxLQUFLLElBQUksTUFBTSxNQUFNLENBQUM7QUFDN0IsT0FBTyxFQUFDLFVBQVUsRUFBRSxTQUFTLEVBQUMsTUFBTSxJQUFJLENBQUM7QUFDekMsT0FBTyxFQUFDLE1BQU0sSUFBSSxVQUFVLEVBQUMsTUFBTSxXQUFXLENBQUM7QUFDL0MsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLG1CQUFtQixDQUFDO0FBQzdDLE9BQU8sRUFBQyxVQUFVLEVBQWEsTUFBTSxjQUFjLENBQUM7QUFFcEQsTUFBTSxNQUFNLEdBQUcsSUFBSSxVQUFVLEVBQUUsQ0FBQztBQUNoQyxNQUFNLFVBQVUsR0FBZSxNQUFNLENBQUMsS0FBSyxFQUFFLENBQUM7QUFFOUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLEVBQUU7SUFDbEMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsQ0FBQztDQUNsQztBQUVELElBQUksV0FBVyxHQUFnQixVQUFVLENBQUM7QUFDMUMsSUFBSSxVQUFVLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxFQUFFO0lBQ25DLElBQUksU0FBUyxHQUFHLFVBQVUsQ0FBQyxVQUFVLENBQUM7SUFDdEMsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsS0FBSyxJQUFJLEVBQUU7UUFDOUMsU0FBUyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLFFBQVEsRUFBRSxXQUFXLENBQUMsQ0FBQztRQUMzRCxTQUFTLENBQUMsS0FBSyxFQUFFLENBQUMsV0FBVyxFQUFFLFNBQVMsRUFBRSxVQUFVLENBQUMsVUFBVSxDQUFDLEVBQUUsRUFBQyxLQUFLLEVBQUUsU0FBUyxFQUFDLENBQUMsQ0FBQztLQUN6RjtJQUVELE1BQU0sTUFBTSxHQUFnQixPQUFPLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDL0MsT0FBTyxDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUMsQ0FBQztJQUM3QixPQUFPLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0NBQ3pCO0FBRUQsTUFBTSxNQUFNLEdBQWUsSUFBSSxVQUFVLEVBQUUsQ0FBQztBQVk1QyxNQUFNLGVBQWUsR0FBRyxDQUFDLElBQUksRUFBRSxVQUFVLEVBQUUsT0FBTyxFQUFFLFdBQVcsRUFBRSxRQUFRLEVBQUUsWUFBWSxDQUFDLENBQUM7QUFDekYsS0FBSyxNQUFNLE1BQU0sSUFBSSxlQUFlLEVBQUU7SUFDbEMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztDQUNuQztBQUVELENBQUM7OztRQUNHLE1BQU0sTUFBTSxHQUFHLFVBQVUsQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUM7O1lBQzdDLEtBQTBCLElBQUEsV0FBQSxjQUFBLE1BQU0sQ0FBQSxZQUFBO2dCQUFyQixNQUFNLEtBQUssbUJBQUEsQ0FBQTtnQkFDbEIsTUFBTSxZQUFZLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztnQkFDcEQsT0FBTyxDQUFDLFlBQVksQ0FBQyxDQUFDO2FBQ3pCOzs7Ozs7Ozs7UUFFRCxPQUFPLE1BQU0sQ0FBQyxHQUFHLEVBQUUsQ0FBQzs7Q0FDdkIsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsT0FBTyxFQUFFLEVBQUU7SUFDbEIsT0FBTyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUMzQixDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRTtJQUNmLE9BQU8sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDckIsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNwQixDQUFDLENBQUMsQ0FBQyJ9