import {UmbraConfig} from "../Config/UmbraConfig";

class ConfigMerger {

    /**
     * Super basic helper method for merging configurations together. Overwrites earlier configs with later ones, with
     * special handling for timeoutMs, which can be either an object or a single number.
     */
    merge(baseConfig: UmbraConfig, ...configs: Partial<UmbraConfig>[]): UmbraConfig {
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
                    } else {
                        baseConfig[attribute] = config[attribute];
                    }
                }
            }
        }

        return baseConfig;
    }
}

export {ConfigMerger};
