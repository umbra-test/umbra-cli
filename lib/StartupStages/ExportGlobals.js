const ExportGlobals = (context) => {
    const runner = context.runner;
    // Note: using bind results in property loss, so `it` has to be re-assigned.
    const itOnly = runner.it.only.bind(runner);
    const describeOnly = runner.describe.only.bind(runner);
    const globalFunctions = ["it", "describe", "after", "afterEach", "before", "beforeEach"];
    for (const fnName of globalFunctions) {
        global[fnName] = runner[fnName].bind(runner);
    }
    global["it"]["only"] = itOnly;
    global["describe"]["only"] = describeOnly;
    global["__testRunner"] = runner;
    return context;
};
export { ExportGlobals };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRXhwb3J0R2xvYmFscy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9TdGFydHVwU3RhZ2VzL0V4cG9ydEdsb2JhbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBZUEsTUFBTSxhQUFhLEdBQUcsQ0FBQyxPQUF1QixFQUFrQixFQUFFO0lBQzlELE1BQU0sTUFBTSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUM7SUFFOUIsNEVBQTRFO0lBQzVFLE1BQU0sTUFBTSxHQUFHLE1BQU0sQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUMzQyxNQUFNLFlBQVksR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7SUFFdkQsTUFBTSxlQUFlLEdBQUcsQ0FBQyxJQUFJLEVBQUUsVUFBVSxFQUFFLE9BQU8sRUFBRSxXQUFXLEVBQUUsUUFBUSxFQUFFLFlBQVksQ0FBQyxDQUFDO0lBQ3pGLEtBQUssTUFBTSxNQUFNLElBQUksZUFBZSxFQUFFO1FBQ2xDLE1BQU0sQ0FBQyxNQUFNLENBQUMsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0tBQ2hEO0lBQ0QsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLE1BQU0sQ0FBQyxHQUFHLE1BQU0sQ0FBQztJQUM5QixNQUFNLENBQUMsVUFBVSxDQUFDLENBQUMsTUFBTSxDQUFDLEdBQUcsWUFBWSxDQUFDO0lBQzFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsR0FBRyxNQUFNLENBQUM7SUFFaEMsT0FBTyxPQUFPLENBQUM7QUFDbkIsQ0FBQyxDQUFDO0FBRUYsT0FBTyxFQUFDLGFBQWEsRUFBQyxDQUFDIn0=