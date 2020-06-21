/// <reference path="./StartupStages/ExportGlobals.ts" />
import { install as installSourceMapSupport } from "source-map-support";
import { SelectReporters } from "./StartupStages/SelectReporters";
import { AttachReporters } from "./StartupStages/AttachReporters";
import { ExportGlobals } from "./StartupStages/ExportGlobals";
import { CompositeConfigResolver } from "./Config/CompositeConfigResolver";
import { CreateContext } from "./StartupStages/CreateContext";
import { CreateRunner } from "./StartupStages/CreateRunner";
import { InitializeReporters } from "./StartupStages/InitializeReporters";
import { RunTests } from "./StartupStages/RunTests";
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
    .then((runResults) => {
    if (runResults.totalFailures > 0 || runResults.totalTimeouts > 0) {
        process.exit(2);
    }
})
    .catch((error) => {
    console.error(error);
    process.exit(1);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEseURBQXlEO0FBQ3pELE9BQU8sRUFBQyxPQUFPLElBQUksdUJBQXVCLEVBQUMsTUFBTSxvQkFBb0IsQ0FBQztBQUV0RSxPQUFPLEVBQUMsZUFBZSxFQUFDLE1BQU0saUNBQWlDLENBQUM7QUFDaEUsT0FBTyxFQUFDLGVBQWUsRUFBQyxNQUFNLGlDQUFpQyxDQUFDO0FBQ2hFLE9BQU8sRUFBQyxhQUFhLEVBQUMsTUFBTSwrQkFBK0IsQ0FBQztBQUM1RCxPQUFPLEVBQUMsdUJBQXVCLEVBQUMsTUFBTSxrQ0FBa0MsQ0FBQztBQUN6RSxPQUFPLEVBQUMsYUFBYSxFQUFDLE1BQU0sK0JBQStCLENBQUM7QUFDNUQsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLDhCQUE4QixDQUFDO0FBQzFELE9BQU8sRUFBQyxtQkFBbUIsRUFBQyxNQUFNLHFDQUFxQyxDQUFDO0FBQ3hFLE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSwwQkFBMEIsQ0FBQztBQUVsRCx1QkFBdUIsRUFBRSxDQUFDO0FBRTFCLE1BQU0sY0FBYyxHQUFHLElBQUksdUJBQXVCLEVBQUUsQ0FBQztBQUNyRCxjQUFjLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUM7S0FDL0IsSUFBSSxDQUFDLGFBQWEsQ0FBQztLQUNuQixJQUFJLENBQUMsWUFBWSxDQUFDO0tBQ2xCLElBQUksQ0FBQyxlQUFlLENBQUM7S0FDckIsSUFBSSxDQUFDLGVBQWUsQ0FBQztLQUNyQixJQUFJLENBQUMsYUFBYSxDQUFDO0tBQ25CLElBQUksQ0FBQyxtQkFBbUIsQ0FBQztLQUN6QixJQUFJLENBQUMsUUFBUSxDQUFDO0tBQ2QsSUFBSSxDQUFDLENBQUMsVUFBc0IsRUFBRSxFQUFFO0lBQzdCLElBQUksVUFBVSxDQUFDLGFBQWEsR0FBRyxDQUFDLElBQUksVUFBVSxDQUFDLGFBQWEsR0FBRyxDQUFDLEVBQUU7UUFDOUQsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztLQUNuQjtBQUNMLENBQUMsQ0FBQztLQUNELEtBQUssQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFO0lBQ2IsT0FBTyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNyQixPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ3BCLENBQUMsQ0FBQyxDQUFDIn0=