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
                    if (value === undefined) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29uZmlnTWVyZ2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL0NvbmZpZy9Db25maWdNZXJnZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBRUEsTUFBTSxZQUFZO0lBRWQ7OztPQUdHO0lBQ0gsS0FBSyxDQUFDLFVBQXVCLEVBQUUsR0FBRyxPQUF3QztRQUN0RSxLQUFLLE1BQU0sTUFBTSxJQUFJLE9BQU8sRUFBRTtZQUMxQixJQUFJLENBQUMsTUFBTSxFQUFFO2dCQUNULFNBQVM7YUFDWjtZQUVELEtBQUssTUFBTSxTQUFTLElBQUksTUFBTSxFQUFFO2dCQUM1QixJQUFJLE1BQU0sQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUFDLEVBQUU7b0JBQ2xDLE1BQU0sS0FBSyxHQUFJLE1BQWMsQ0FBQyxTQUFTLENBQUMsQ0FBQztvQkFDekMsSUFBSSxLQUFLLEtBQUssU0FBUyxFQUFFO3dCQUNyQixTQUFTO3FCQUNaO29CQUVELDRGQUE0RjtvQkFDNUYsSUFBSSxTQUFTLEtBQUssV0FBVyxJQUFJLE9BQU8sS0FBSyxLQUFLLFFBQVEsRUFBRTt3QkFDeEQsVUFBVSxDQUFDLFNBQVMsR0FBRzs0QkFDbkIsRUFBRSxFQUFFLEtBQUs7NEJBQ1QsTUFBTSxFQUFFLEtBQUs7NEJBQ2IsVUFBVSxFQUFFLEtBQUs7NEJBQ2pCLEtBQUssRUFBRSxLQUFLOzRCQUNaLFNBQVMsRUFBRSxLQUFLO3lCQUNuQixDQUFDO3FCQUNMO3lCQUFNO3dCQUNGLFVBQWtCLENBQUMsU0FBUyxDQUFDLEdBQUksTUFBYyxDQUFDLFNBQVMsQ0FBQyxDQUFDO3FCQUMvRDtpQkFDSjthQUNKO1NBQ0o7UUFFRCxPQUFPLFVBQVUsQ0FBQztJQUN0QixDQUFDO0NBQ0o7QUFFRCxPQUFPLEVBQUMsWUFBWSxFQUFDLENBQUMifQ==