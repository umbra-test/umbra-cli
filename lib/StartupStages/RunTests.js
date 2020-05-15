import { ModuleResolver } from "../ModuleResolver";
const RunTests = (context) => {
    if (!context.config.input) {
        throw new Error("Config is missing an input file.");
    }
    return new ModuleResolver(context.runner)
        .resolveGlob(context.config.input)
        .then(() => {
        for (const reporter of context.reporters) {
            reporter.runStart();
        }
    })
        .then(() => context.runner.run())
        .then((results) => {
        for (const reporter of context.reporters) {
            reporter.runEnd(results);
        }
        return results;
    });
};
export { RunTests };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUnVuVGVzdHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvU3RhcnR1cFN0YWdlcy9SdW5UZXN0cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQSxPQUFPLEVBQUMsY0FBYyxFQUFDLE1BQU0sbUJBQW1CLENBQUM7QUFHakQsTUFBTSxRQUFRLEdBQUcsQ0FBQyxPQUF1QixFQUF1QixFQUFFO0lBQzlELElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRTtRQUN2QixNQUFNLElBQUksS0FBSyxDQUFDLGtDQUFrQyxDQUFDLENBQUM7S0FDdkQ7SUFDRCxPQUFPLElBQUksY0FBYyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUM7U0FDcEMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDO1NBQ2pDLElBQUksQ0FBQyxHQUFHLEVBQUU7UUFDUCxLQUFLLE1BQU0sUUFBUSxJQUFJLE9BQU8sQ0FBQyxTQUFTLEVBQUU7WUFDdEMsUUFBUSxDQUFDLFFBQVEsRUFBRSxDQUFDO1NBQ3ZCO0lBQ0wsQ0FBQyxDQUFDO1NBQ0QsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFLENBQUM7U0FDaEMsSUFBSSxDQUFDLENBQUMsT0FBTyxFQUFFLEVBQUU7UUFDZCxLQUFLLE1BQU0sUUFBUSxJQUFJLE9BQU8sQ0FBQyxTQUFTLEVBQUU7WUFDdEMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQztTQUM1QjtRQUVELE9BQU8sT0FBTyxDQUFDO0lBQ25CLENBQUMsQ0FBQyxDQUFDO0FBQ1gsQ0FBQyxDQUFDO0FBRUYsT0FBTyxFQUFDLFFBQVEsRUFBQyxDQUFDIn0=