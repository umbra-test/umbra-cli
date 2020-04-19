class ConfigMerger {
    /**
     * Super basic helper method for merging configurations together. Overwrites earlier configs with later ones, with
     * special handling for timeoutMs, which can be either an object or a single number.
     */
    merge(baseConfig, ...configs) {
        for (const config of configs) {
            if (!config) {
                continue;
            }
            for (const attribute in config) {
                if (config.hasOwnProperty(attribute)) {
                    const value = config[attribute];
                    if (typeof value === "undefined") {
                        continue;
                    }
                    // The user has the option to set a global timeout value, rather than set them individually.
                    if (attribute === "timeoutMs" && typeof value === "number") {
                        baseConfig.timeoutMs = {
                            it: value,
                            before: value,
                            beforeEach: value,
                            after: value,
                            afterEach: value
                        };
                    }
                    else {
                        baseConfig[attribute] = config[attribute];
                    }
                }
            }
        }
        return baseConfig;
    }
}
export { ConfigMerger };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29uZmlnTWVyZ2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL0NvbmZpZy9Db25maWdNZXJnZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTSxZQUFZO0lBRWQ7OztPQUdHO0lBQ0gsS0FBSyxDQUFDLFVBQXVCLEVBQUUsR0FBRyxPQUErQjtRQUM3RCxLQUFLLE1BQU0sTUFBTSxJQUFJLE9BQU8sRUFBRTtZQUMxQixJQUFJLENBQUMsTUFBTSxFQUFFO2dCQUNULFNBQVM7YUFDWjtZQUVELEtBQUssTUFBTSxTQUFTLElBQUksTUFBTSxFQUFFO2dCQUM1QixJQUFJLE1BQU0sQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUFDLEVBQUU7b0JBQ2xDLE1BQU0sS0FBSyxHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQztvQkFDaEMsSUFBSSxPQUFPLEtBQUssS0FBSyxXQUFXLEVBQUU7d0JBQzlCLFNBQVM7cUJBQ1o7b0JBRUQsNEZBQTRGO29CQUM1RixJQUFJLFNBQVMsS0FBSyxXQUFXLElBQUksT0FBTyxLQUFLLEtBQUssUUFBUSxFQUFFO3dCQUN4RCxVQUFVLENBQUMsU0FBUyxHQUFHOzRCQUNuQixFQUFFLEVBQUUsS0FBSzs0QkFDVCxNQUFNLEVBQUUsS0FBSzs0QkFDYixVQUFVLEVBQUUsS0FBSzs0QkFDakIsS0FBSyxFQUFFLEtBQUs7NEJBQ1osU0FBUyxFQUFFLEtBQUs7eUJBQ25CLENBQUM7cUJBQ0w7eUJBQU07d0JBQ0gsVUFBVSxDQUFDLFNBQVMsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQztxQkFDN0M7aUJBQ0o7YUFDSjtTQUNKO1FBRUQsT0FBTyxVQUFVLENBQUM7SUFDdEIsQ0FBQztDQUNKO0FBRUQsT0FBTyxFQUFDLFlBQVksRUFBQyxDQUFDIn0=