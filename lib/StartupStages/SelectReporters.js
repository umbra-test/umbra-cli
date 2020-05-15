import { BasicReporter } from "../Reporter/Stock/BasicReporter";
import { StockReporterMap } from "../Reporter/Stock/StockReporterMap";
const SelectReporters = (context) => {
    const reportingConfig = context.config.reporting;
    const reporterNames = reportingConfig ? reportingConfig.reporters : null;
    if (!reporterNames || reporterNames.length === 0) {
        context.reporters = [new BasicReporter()];
    }
    else {
        context.reporters = reporterNames.map((name) => {
            try {
                return require(name);
            }
            catch (e) {
                if (StockReporterMap[name]) {
                    return new StockReporterMap[name]();
                }
                throw new Error(`Unable to load reporter: ${name}`);
            }
        });
    }
    return context;
};
export { SelectReporters };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2VsZWN0UmVwb3J0ZXJzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL1N0YXJ0dXBTdGFnZXMvU2VsZWN0UmVwb3J0ZXJzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBQyxhQUFhLEVBQUMsTUFBTSxpQ0FBaUMsQ0FBQztBQUM5RCxPQUFPLEVBQUMsZ0JBQWdCLEVBQUMsTUFBTSxvQ0FBb0MsQ0FBQztBQUdwRSxNQUFNLGVBQWUsR0FBRyxDQUFDLE9BQXNELEVBQWtCLEVBQUU7SUFDL0YsTUFBTSxlQUFlLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUM7SUFDakQsTUFBTSxhQUFhLEdBQUcsZUFBZSxDQUFDLENBQUMsQ0FBQyxlQUFlLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7SUFDekUsSUFBSSxDQUFDLGFBQWEsSUFBSSxhQUFhLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTtRQUM5QyxPQUFPLENBQUMsU0FBUyxHQUFHLENBQUMsSUFBSSxhQUFhLEVBQUUsQ0FBQyxDQUFDO0tBQzdDO1NBQU07UUFDSCxPQUFPLENBQUMsU0FBUyxHQUFHLGFBQWEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRTtZQUMzQyxJQUFJO2dCQUNBLE9BQU8sT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO2FBQ3hCO1lBQUMsT0FBTyxDQUFDLEVBQUU7Z0JBQ1IsSUFBSSxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsRUFBRTtvQkFDeEIsT0FBTyxJQUFJLGdCQUFnQixDQUFDLElBQUksQ0FBQyxFQUFFLENBQUM7aUJBQ3ZDO2dCQUVELE1BQU0sSUFBSSxLQUFLLENBQUMsNEJBQTRCLElBQUksRUFBRSxDQUFDLENBQUM7YUFDdkQ7UUFDTCxDQUFDLENBQUMsQ0FBQztLQUNOO0lBRUQsT0FBTyxPQUF5QixDQUFDO0FBQ3JDLENBQUMsQ0FBQztBQUVGLE9BQU8sRUFBQyxlQUFlLEVBQUMsQ0FBQyJ9