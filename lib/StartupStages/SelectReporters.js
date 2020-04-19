import { BasicReporter } from "../Reporter/Stock/BasicReporter";
import { StockReporterMap } from "../Reporter/Stock/StockReporterMap";
const SelectReporters = (context) => {
    const reporterNames = context.config.reporting.reporters;
    if (reporterNames.length === 0) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2VsZWN0UmVwb3J0ZXJzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL1N0YXJ0dXBTdGFnZXMvU2VsZWN0UmVwb3J0ZXJzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBQyxhQUFhLEVBQUMsTUFBTSxpQ0FBaUMsQ0FBQztBQUM5RCxPQUFPLEVBQUMsZ0JBQWdCLEVBQUMsTUFBTSxvQ0FBb0MsQ0FBQztBQUdwRSxNQUFNLGVBQWUsR0FBRyxDQUFDLE9BQXVCLEVBQWtCLEVBQUU7SUFDaEUsTUFBTSxhQUFhLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDO0lBQ3pELElBQUksYUFBYSxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7UUFDNUIsT0FBTyxDQUFDLFNBQVMsR0FBRyxDQUFDLElBQUksYUFBYSxFQUFFLENBQUMsQ0FBQztLQUM3QztTQUFNO1FBQ0gsT0FBTyxDQUFDLFNBQVMsR0FBRyxhQUFhLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUU7WUFDM0MsSUFBSTtnQkFDQSxPQUFPLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQzthQUN4QjtZQUFDLE9BQU8sQ0FBQyxFQUFFO2dCQUNSLElBQUksZ0JBQWdCLENBQUMsSUFBSSxDQUFDLEVBQUU7b0JBQ3hCLE9BQU8sSUFBSSxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDO2lCQUN2QztnQkFFRCxNQUFNLElBQUksS0FBSyxDQUFDLDRCQUE0QixJQUFJLEVBQUUsQ0FBQyxDQUFDO2FBQ3ZEO1FBQ0wsQ0FBQyxDQUFDLENBQUM7S0FDTjtJQUVELE9BQU8sT0FBTyxDQUFDO0FBQ25CLENBQUMsQ0FBQztBQUVGLE9BQU8sRUFBQyxlQUFlLEVBQUMsQ0FBQyJ9