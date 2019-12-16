"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = require("child_process");
const path = require("path");
const fs_1 = require("fs");
const fast_glob_1 = require("fast-glob");
const umbra_test_runner_1 = require("umbra-test-runner");
const ArgsParser_1 = require("./ArgsParser");
const parser = new ArgsParser_1.ArgsParser();
const parsedArgs = parser.parse();
if (!fs_1.existsSync(parsedArgs.cacheDir)) {
    fs_1.mkdirSync(parsedArgs.cacheDir);
}
let finalConfig = parsedArgs;
if (fs_1.existsSync(parsedArgs.configPath)) {
    let finalPath = parsedArgs.configPath;
    if (path.extname(parsedArgs.configPath) === "ts") {
        finalPath = path.resolve(parsedArgs.cacheDir, "config.js");
        child_process_1.spawnSync("tsc", ["--outFile", finalPath, parsedArgs.configPath], { stdio: "inherit" });
    }
    const config = require(finalPath);
    console.error("got config!");
    console.error(config);
}
const runner = new umbra_test_runner_1.TestRunner();
const globalFunctions = ["it", "describe", "after", "afterEach", "before", "beforeEach"];
for (const fnName of globalFunctions) {
    global[fnName] = runner[fnName];
}
(function () {
    var e_1, _a;
    return __awaiter(this, void 0, void 0, function* () {
        const stream = fast_glob_1.stream(finalConfig.input);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsaURBQXdDO0FBQ3hDLDZCQUE2QjtBQUM3QiwyQkFBeUM7QUFDekMseUNBQStDO0FBQy9DLHlEQUE2QztBQUM3Qyw2Q0FBb0Q7QUFFcEQsTUFBTSxNQUFNLEdBQUcsSUFBSSx1QkFBVSxFQUFFLENBQUM7QUFDaEMsTUFBTSxVQUFVLEdBQWUsTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFDO0FBRTlDLElBQUksQ0FBQyxlQUFVLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxFQUFFO0lBQ2xDLGNBQVMsQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLENBQUM7Q0FDbEM7QUFFRCxJQUFJLFdBQVcsR0FBZ0IsVUFBVSxDQUFDO0FBQzFDLElBQUksZUFBVSxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsRUFBRTtJQUNuQyxJQUFJLFNBQVMsR0FBRyxVQUFVLENBQUMsVUFBVSxDQUFDO0lBQ3RDLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLEtBQUssSUFBSSxFQUFFO1FBQzlDLFNBQVMsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxRQUFRLEVBQUUsV0FBVyxDQUFDLENBQUM7UUFDM0QseUJBQVMsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxXQUFXLEVBQUUsU0FBUyxFQUFFLFVBQVUsQ0FBQyxVQUFVLENBQUMsRUFBRSxFQUFDLEtBQUssRUFBRSxTQUFTLEVBQUMsQ0FBQyxDQUFDO0tBQ3pGO0lBRUQsTUFBTSxNQUFNLEdBQWdCLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUMvQyxPQUFPLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FBQyxDQUFDO0lBQzdCLE9BQU8sQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7Q0FDekI7QUFFRCxNQUFNLE1BQU0sR0FBZSxJQUFJLDhCQUFVLEVBQUUsQ0FBQztBQVk1QyxNQUFNLGVBQWUsR0FBRyxDQUFDLElBQUksRUFBRSxVQUFVLEVBQUUsT0FBTyxFQUFFLFdBQVcsRUFBRSxRQUFRLEVBQUUsWUFBWSxDQUFDLENBQUM7QUFDekYsS0FBSyxNQUFNLE1BQU0sSUFBSSxlQUFlLEVBQUU7SUFDbEMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztDQUNuQztBQUVELENBQUM7OztRQUNHLE1BQU0sTUFBTSxHQUFHLGtCQUFVLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDOztZQUM3QyxLQUEwQixJQUFBLFdBQUEsY0FBQSxNQUFNLENBQUEsWUFBQTtnQkFBckIsTUFBTSxLQUFLLG1CQUFBLENBQUE7Z0JBQ2xCLE1BQU0sWUFBWSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUM7Z0JBQ3BELE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQzthQUN6Qjs7Ozs7Ozs7O1FBRUQsT0FBTyxNQUFNLENBQUMsR0FBRyxFQUFFLENBQUM7O0NBQ3ZCLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLE9BQU8sRUFBRSxFQUFFO0lBQ2xCLE9BQU8sQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDM0IsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUU7SUFDZixPQUFPLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3JCLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDcEIsQ0FBQyxDQUFDLENBQUMifQ==