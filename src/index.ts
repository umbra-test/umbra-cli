import {spawnSync} from "child_process";
import * as path from "path";
import {existsSync, mkdirSync} from "fs";
import {stream as globStream} from "fast-glob";
import {TestRunner} from "umbra-test-runner";
import {ArgsParser, ParsedArgs} from "./ArgsParser";

const parser = new ArgsParser();
const parsedArgs: ParsedArgs = parser.parse();

if (!existsSync(parsedArgs.cacheDir)) {
    mkdirSync(parsedArgs.cacheDir);
}

let finalConfig: UmbraConfig = parsedArgs;
if (existsSync(parsedArgs.configPath)) {
    let finalPath = parsedArgs.configPath;
    if (path.extname(parsedArgs.configPath) === "ts") {
        finalPath = path.resolve(parsedArgs.cacheDir, "config.js");
        spawnSync("tsc", ["--outFile", finalPath, parsedArgs.configPath], {stdio: "inherit"});
    }

    const config: UmbraConfig = require(finalPath);
    console.error(config);
}

const runner: TestRunner = new TestRunner();

// Expose global methods
declare global {
    const it: typeof runner.it;
    const describe: typeof runner.describe;
    const after: typeof runner.after;
    const afterEach: typeof runner.afterEach;
    const before: typeof runner.before;
    const beforeEach: typeof runner.beforeEach;
}

const globalFunctions = ["it", "describe", "after", "afterEach", "before", "beforeEach"];
for (const fnName of globalFunctions) {
    global[fnName] = runner[fnName];
}

(async function () {
    const stream = globStream(finalConfig.input);
    for await (const entry of stream) {
        const resolvedPath = path.resolve(entry.toString());
        require(resolvedPath);
    }

    return runner.run();
})().then((results) => {
    console.error(results);
}).catch((error) => {
    console.error(error);
    process.exit(1);
});

export {}
