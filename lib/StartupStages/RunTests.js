import { ModuleResolver } from "../ModuleResolver";
const RunTests = (context) => {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUnVuVGVzdHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvU3RhcnR1cFN0YWdlcy9SdW5UZXN0cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQSxPQUFPLEVBQUMsY0FBYyxFQUFDLE1BQU0sbUJBQW1CLENBQUM7QUFHakQsTUFBTSxRQUFRLEdBQUcsQ0FBQyxPQUF1QixFQUF1QixFQUFFO0lBQzlELE9BQU8sSUFBSSxjQUFjLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQztTQUNwQyxXQUFXLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUM7U0FDakMsSUFBSSxDQUFDLEdBQUcsRUFBRTtRQUNQLEtBQUssTUFBTSxRQUFRLElBQUksT0FBTyxDQUFDLFNBQVMsRUFBRTtZQUN0QyxRQUFRLENBQUMsUUFBUSxFQUFFLENBQUM7U0FDdkI7SUFDTCxDQUFDLENBQUM7U0FDRCxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsQ0FBQztTQUNoQyxJQUFJLENBQUMsQ0FBQyxPQUFPLEVBQUUsRUFBRTtRQUNkLEtBQUssTUFBTSxRQUFRLElBQUksT0FBTyxDQUFDLFNBQVMsRUFBRTtZQUN0QyxRQUFRLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1NBQzVCO1FBRUQsT0FBTyxPQUFPLENBQUM7SUFDbkIsQ0FBQyxDQUFDLENBQUM7QUFDWCxDQUFDLENBQUM7QUFFRixPQUFPLEVBQUMsUUFBUSxFQUFDLENBQUMifQ==