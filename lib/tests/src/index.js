"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = require("child_process");
const path = require("path");
const fs_1 = require("fs");
const umbra_test_runner_1 = require("umbra-test-runner");
const ArgsParser_1 = require("./Config/ArgsParser");
const ConfigMerger_1 = require("./Config/ConfigMerger");
const StockReporterMap_1 = require("./Reporter/Stock/StockReporterMap");
const ModuleResolver_1 = require("./ModuleResolver");
const DefaultConfig_1 = require("./Config/DefaultConfig");
const FancyReporter_1 = require("./Reporter/Stock/FancyReporter");
const parser = new ArgsParser_1.ArgsParser();
const argConfig = parser.parse();
const configMerger = new ConfigMerger_1.ConfigMerger();
let finalConfig;
if (fs_1.existsSync(argConfig.configPath)) {
    const cacheDir = argConfig.cacheDir ? argConfig.cacheDir : DefaultConfig_1.DefaultConfig.cacheDir;
    if (!fs_1.existsSync(cacheDir)) {
        fs_1.mkdirSync(cacheDir);
    }
    let finalPath = argConfig.configPath;
    if (path.extname(argConfig.configPath) === "ts") {
        finalPath = path.resolve(cacheDir, "config.js");
        child_process_1.spawnSync("tsc", ["--outFile", finalPath, argConfig.configPath], { stdio: "inherit" });
    }
    const fileConfig = require(finalPath);
    finalConfig = configMerger.merge(DefaultConfig_1.DefaultConfig, fileConfig, argConfig);
}
else {
    finalConfig = configMerger.merge(DefaultConfig_1.DefaultConfig, argConfig);
}
const runner = new umbra_test_runner_1.TestRunner({
    timeoutMs: finalConfig.timeoutMs,
    stopOnFirstFail: false
});
const reporterNames = finalConfig.reporting.reporters;
let reporters;
if (reporterNames.length === 0) {
    reporters = [new FancyReporter_1.FancyReporter()];
}
else {
    reporters = reporterNames.map((name) => {
        try {
            return require(name);
        }
        catch (e) {
            if (StockReporterMap_1.StockReporterMap[name]) {
                return new StockReporterMap_1.StockReporterMap[name]();
            }
            throw new Error(`Unable to load reporter: ${name}`);
        }
    });
}
for (const reporter of reporters) {
    runner.on("activeFileChanged", reporter.activeFileChanged);
    runner.on("beforeTest", reporter.beforeTest);
    runner.on("testSuccess", reporter.testSuccess);
    runner.on("testFail", reporter.testFail);
    runner.on("testTimeout", reporter.testTimeout);
    runner.on("beforeDescribe", reporter.beforeDescribe);
    runner.on("afterDescribe", reporter.afterDescribe);
}
const globalFunctions = ["it", "describe", "after", "afterEach", "before", "beforeEach"];
for (const fnName of globalFunctions) {
    global[fnName] = runner[fnName];
}
global["__testRunner"] = runner;
const moduleResolver = new ModuleResolver_1.ModuleResolver(runner);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxpREFBd0M7QUFDeEMsNkJBQTZCO0FBQzdCLDJCQUF5QztBQUN6Qyx5REFBNkM7QUFDN0Msb0RBQTJEO0FBQzNELHdEQUFtRDtBQUVuRCx3RUFBbUU7QUFDbkUscURBQWdEO0FBQ2hELDBEQUFxRDtBQUNyRCxrRUFBNkQ7QUFFN0QsTUFBTSxNQUFNLEdBQUcsSUFBSSx1QkFBVSxFQUFFLENBQUM7QUFDaEMsTUFBTSxTQUFTLEdBQWUsTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFDO0FBRTdDLE1BQU0sWUFBWSxHQUFHLElBQUksMkJBQVksRUFBRSxDQUFDO0FBQ3hDLElBQUksV0FBd0IsQ0FBQztBQUM3QixJQUFJLGVBQVUsQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLEVBQUU7SUFDbEMsTUFBTSxRQUFRLEdBQUcsU0FBUyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsNkJBQWEsQ0FBQyxRQUFRLENBQUM7SUFDbEYsSUFBSSxDQUFDLGVBQVUsQ0FBQyxRQUFRLENBQUMsRUFBRTtRQUN2QixjQUFTLENBQUMsUUFBUSxDQUFDLENBQUM7S0FDdkI7SUFFRCxJQUFJLFNBQVMsR0FBRyxTQUFTLENBQUMsVUFBVSxDQUFDO0lBQ3JDLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLEtBQUssSUFBSSxFQUFFO1FBQzdDLFNBQVMsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxXQUFXLENBQUMsQ0FBQztRQUNoRCx5QkFBUyxDQUFDLEtBQUssRUFBRSxDQUFDLFdBQVcsRUFBRSxTQUFTLEVBQUUsU0FBUyxDQUFDLFVBQVUsQ0FBQyxFQUFFLEVBQUMsS0FBSyxFQUFFLFNBQVMsRUFBQyxDQUFDLENBQUM7S0FDeEY7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