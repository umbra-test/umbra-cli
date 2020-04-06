import {spawnSync} from "child_process";
import * as path from "path";
import {existsSync, mkdirSync} from "fs";
import {install as installSourceMapSupport} from "source-map-support";
import {TestRunner} from "@umbra-test/umbra-test-runner";
import {ArgsParser, ParsedArgs} from "./Config/ArgsParser";
import {ConfigMerger} from "./Config/ConfigMerger";
import {Reporter} from "./Reporter/Reporter";
import {StockReporterMap} from "./Reporter/Stock/StockReporterMap";
import {ModuleResolver} from "./ModuleResolver";
import {DefaultConfig} from "./Config/DefaultConfig";
import {BasicReporter} from "./Reporter/Stock/BasicReporter";

installSourceMapSupport();

const parser = new ArgsParser();
const argConfig: ParsedArgs = parser.parse();

const configMerger = new ConfigMerger();
let finalConfig: UmbraConfig;
if (existsSync(argConfig.configPath)) {
    const cacheDir = argConfig.cacheDir ? argConfig.cacheDir : DefaultConfig.cacheDir;
    if (!existsSync(cacheDir)) {
        mkdirSync(cacheDir);
    }

    let finalPath = argConfig.configPath;
    if (path.extname(argConfig.configPath) === "ts") {
        finalPath = path.resolve(cacheDir, "config.js");
        spawnSync("tsc", ["--outFile", finalPath, argConfig.configPath], {stdio: "inherit"});
    }

    const fileConfig: UmbraConfig = require(finalPath);
    finalConfig = configMerger.merge(DefaultConfig, fileConfig, argConfig);
} else {
    finalConfig = configMerger.merge(DefaultConfig, argConfig);
}

const runner: TestRunner = new TestRunner({
    timeoutMs: finalConfig.timeoutMs,
    stopOnFirstFail: false
});

const reporterNames = finalConfig.reporting.reporters;
let reporters: Reporter[];
if (reporterNames.length === 0) {
    reporters = [new BasicReporter()];
} else {
    reporters = reporterNames.map((name) => {
        try {
            return require(name);
        } catch (e) {
            if (StockReporterMap[name]) {
                return new StockReporterMap[name]();
            }

            throw new Error(`Unable to load reporter: ${name}`);
        }
    });
}

for (const reporter of reporters) {
    runner.on("activeFileChanged", reporter.activeFileChanged.bind(reporter));
    runner.on("beforeTest", reporter.beforeTest.bind(reporter));
    runner.on("testSuccess", reporter.testSuccess.bind(reporter));
    runner.on("testFail", reporter.testFail.bind(reporter));
    runner.on("testTimeout", reporter.testTimeout.bind(reporter));
    runner.on("beforeDescribe", reporter.beforeDescribe.bind(reporter));
    runner.on("afterDescribe", reporter.afterDescribe.bind(reporter));
}

// Expose global methods
declare global {
    const it: typeof runner.it;
    const describe: typeof runner.describe;
    const after: typeof runner.after;
    const afterEach: typeof runner.afterEach;
    const before: typeof runner.before;
    const beforeEach: typeof runner.beforeEach;

    // Used for extensions, specifically umbra-mock.
    const __testRunner: TestRunner;
}

const globalFunctions = ["it", "describe", "after", "afterEach", "before", "beforeEach"];
for (const fnName of globalFunctions) {
    global[fnName] = runner[fnName];
}
global["__testRunner"] = runner;

const moduleResolver = new ModuleResolver(runner);

Promise.all(reporters.map((reporter) => reporter.initialize()))
    .then(() => moduleResolver.resolveGlob(finalConfig.input))
    .then(() => {
        for (const reporter of reporters) {
            reporter.runStart();
        }
    })
    .then(() => runner.run())
    .then((results) => {
        for (const reporter of reporters) {
            reporter.runEnd(results);
        }
    })
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });

export {}
