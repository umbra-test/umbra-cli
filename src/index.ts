/// <reference path="./StartupStages/ExportGlobals.ts" />
import {install as installSourceMapSupport} from "source-map-support";
import {RunResults} from "@umbra-test/umbra-test-runner";
import {SelectReporters} from "./StartupStages/SelectReporters";
import {AttachReporters} from "./StartupStages/AttachReporters";
import {ExportGlobals} from "./StartupStages/ExportGlobals";
import {CompositeConfigResolver} from "./Config/CompositeConfigResolver";
import {CreateContext} from "./StartupStages/CreateContext";
import {CreateRunner} from "./StartupStages/CreateRunner";
import {InitializeReporters} from "./StartupStages/InitializeReporters";
import {RunTests} from "./StartupStages/RunTests";

installSourceMapSupport();

const configResolver = new CompositeConfigResolver();
configResolver.resolve(process.argv)
    .then(CreateContext)
    .then(CreateRunner)
    .then(SelectReporters)
    .then(AttachReporters)
    .then(ExportGlobals)
    .then(InitializeReporters)
    .then(RunTests)
    .then((runResults: RunResults) => {
        if (runResults.totalFailures > 0 || runResults.totalTimeouts > 0) {
            process.exit(2);
        }
    })
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });

export {};
