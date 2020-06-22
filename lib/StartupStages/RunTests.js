import { ModuleResolver } from "../ModuleResolver";
const RunTests = (context) => {
    if (!context.config.input) {
        throw new Error("Config is missing an input file.");
    }
    return new ModuleResolver(context.runner)
        .resolveGlob(context.config.input)
        .then(() => context.runner.run())
        .then((results) => {
        for (const reporter of context.reporters) {
            reporter.onRunEnd(results);
        }
        return results;
    });
};
export { RunTests };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUnVuVGVzdHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvU3RhcnR1cFN0YWdlcy9SdW5UZXN0cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQSxPQUFPLEVBQUMsY0FBYyxFQUFDLE1BQU0sbUJBQW1CLENBQUM7QUFHakQsTUFBTSxRQUFRLEdBQUcsQ0FBQyxPQUF1QixFQUF1QixFQUFFO0lBQzlELElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRTtRQUN2QixNQUFNLElBQUksS0FBSyxDQUFDLGtDQUFrQyxDQUFDLENBQUM7S0FDdkQ7SUFDRCxPQUFPLElBQUksY0FBYyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUM7U0FDcEMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDO1NBQ2pDLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRSxDQUFDO1NBQ2hDLElBQUksQ0FBQyxDQUFDLE9BQU8sRUFBRSxFQUFFO1FBQ2QsS0FBSyxNQUFNLFFBQVEsSUFBSSxPQUFPLENBQUMsU0FBUyxFQUFFO1lBQ3RDLFFBQVEsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUM7U0FDOUI7UUFFRCxPQUFPLE9BQU8sQ0FBQztJQUNuQixDQUFDLENBQUMsQ0FBQztBQUNYLENBQUMsQ0FBQztBQUVGLE9BQU8sRUFBQyxRQUFRLEVBQUMsQ0FBQyJ9