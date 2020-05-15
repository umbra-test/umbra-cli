interface UmbraConfig {
    /**
     * List of globs pointing to test files to execute.
     */
    input?: string[];
    /**
     * Whether or not to run with the Node debugger enabled.
     */
    debug?: boolean;
    /**
     * Whether or not to run with the Node Debugger, immediately breaking after the first file.
     */
    debugBreak?: boolean;
    /**
     * Whether or not to run in "watch mode", which will execute all tests once, and then again once the individual files
     * change.
     */
    watch?: boolean;
    /**
     * The directory in which to store all Umbra cache files.
     */
    cacheDir?: string;
    /**
     * Timeout values to use for asynchronous tests execution, in milliseconds. If a number, it's used across all async
     * functions (it, before, beforeEach, after, afterEach).
     */
    timeoutMs?: number | {
        it?: number;
        before?: number;
        beforeEach?: number;
        after?: number;
        afterEach?: number;
    };
    reporting?: {
        outputPath?: string;
        reporters?: string[];
    };
    parallel?: {
        idempotentFiles?: boolean;
        idempotentTests?: boolean;
    };
}
export { UmbraConfig };
