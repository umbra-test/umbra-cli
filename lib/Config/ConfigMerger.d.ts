declare class ConfigMerger {
    /**
     * Super basic helper method for merging configurations together. Overwrites earlier configs with later ones, with
     * special handling for timeoutMs, which can be either an object or a single number.
     */
    merge(baseConfig: UmbraConfig, ...configs: Partial<UmbraConfig>[]): UmbraConfig;
}
export { ConfigMerger };
