class ConfigMerger {
    /**
     * Super basic helper method for merging configurations together. Overwrites earlier configs with later ones, with
     * special handling for timeoutMs, which can be either an object or a single number.
     */
    merge(baseConfig, ...configs) {
        for (const config of configs) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29uZmlnTWVyZ2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL0NvbmZpZy9Db25maWdNZXJnZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTSxZQUFZO0lBRWQ7OztPQUdHO0lBQ0gsS0FBSyxDQUFDLFVBQXVCLEVBQUUsR0FBRyxPQUErQjtRQUM3RCxLQUFLLE1BQU0sTUFBTSxJQUFJLE9BQU8sRUFBRTtZQUMxQixLQUFLLE1BQU0sU0FBUyxJQUFJLE1BQU0sRUFBRTtnQkFDNUIsSUFBSSxNQUFNLENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FBQyxFQUFFO29CQUNsQyxNQUFNLEtBQUssR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUM7b0JBQ2hDLElBQUksT0FBTyxLQUFLLEtBQUssV0FBVyxFQUFFO3dCQUM5QixTQUFTO3FCQUNaO29CQUVELDRGQUE0RjtvQkFDNUYsSUFBSSxTQUFTLEtBQUssV0FBVyxJQUFJLE9BQU8sS0FBSyxLQUFLLFFBQVEsRUFBRTt3QkFDeEQsVUFBVSxDQUFDLFNBQVMsR0FBRzs0QkFDbkIsRUFBRSxFQUFFLEtBQUs7NEJBQ1QsTUFBTSxFQUFFLEtBQUs7NEJBQ2IsVUFBVSxFQUFFLEtBQUs7NEJBQ2pCLEtBQUssRUFBRSxLQUFLOzRCQUNaLFNBQVMsRUFBRSxLQUFLO3lCQUNuQixDQUFDO3FCQUNMO3lCQUFNO3dCQUNILFVBQVUsQ0FBQyxTQUFTLENBQUMsR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUM7cUJBQzdDO2lCQUNKO2FBQ0o7U0FDSjtRQUVELE9BQU8sVUFBVSxDQUFDO0lBQ3RCLENBQUM7Q0FDSjtBQUVELE9BQU8sRUFBQyxZQUFZLEVBQUMsQ0FBQyJ9