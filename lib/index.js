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
    .catch((error) => {
    console.error(error);
    process.exit(1);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFDLE9BQU8sSUFBSSx1QkFBdUIsRUFBQyxNQUFNLG9CQUFvQixDQUFDO0FBQ3RFLE9BQU8sRUFBQyxlQUFlLEVBQUMsTUFBTSxpQ0FBaUMsQ0FBQztBQUNoRSxPQUFPLEVBQUMsZUFBZSxFQUFDLE1BQU0saUNBQWlDLENBQUM7QUFDaEUsT0FBTyxFQUFDLGFBQWEsRUFBQyxNQUFNLCtCQUErQixDQUFDO0FBQzVELE9BQU8sRUFBQyx1QkFBdUIsRUFBQyxNQUFNLGtDQUFrQyxDQUFDO0FBQ3pFLE9BQU8sRUFBQyxhQUFhLEVBQUMsTUFBTSwrQkFBK0IsQ0FBQztBQUM1RCxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0sOEJBQThCLENBQUM7QUFDMUQsT0FBTyxFQUFDLG1CQUFtQixFQUFDLE1BQU0scUNBQXFDLENBQUM7QUFDeEUsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLDBCQUEwQixDQUFDO0FBRWxELHVCQUF1QixFQUFFLENBQUM7QUFFMUIsTUFBTSxjQUFjLEdBQUcsSUFBSSx1QkFBdUIsRUFBRSxDQUFDO0FBQ3JELGNBQWMsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQztLQUMvQixJQUFJLENBQUMsYUFBYSxDQUFDO0tBQ25CLElBQUksQ0FBQyxZQUFZLENBQUM7S0FDbEIsSUFBSSxDQUFDLGVBQWUsQ0FBQztLQUNyQixJQUFJLENBQUMsZUFBZSxDQUFDO0tBQ3JCLElBQUksQ0FBQyxhQUFhLENBQUM7S0FDbkIsSUFBSSxDQUFDLG1CQUFtQixDQUFDO0tBQ3pCLElBQUksQ0FBQyxRQUFRLENBQUM7S0FDZCxLQUFLLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRTtJQUNiLE9BQU8sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDckIsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNwQixDQUFDLENBQUMsQ0FBQyJ9