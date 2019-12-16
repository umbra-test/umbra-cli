const DEFAULT_TIMEOUT_MS = 100;

const DefaultConfig: UmbraConfig = {
    input: [],
    debug: false,
    debugBreak: false,
    watch: false,
    cacheDir: ".umbra-cache",
    timeoutMs: {
        it: DEFAULT_TIMEOUT_MS,
        before: DEFAULT_TIMEOUT_MS,
        beforeEach: DEFAULT_TIMEOUT_MS,
        after: DEFAULT_TIMEOUT_MS,
        afterEach: DEFAULT_TIMEOUT_MS
    },
    reporting: {
        outputPath: undefined,
        reporters: []
    },
    parallel: {
        idempotentFiles: false,
        idempotentTests: false,
    }
};

export {DefaultConfig};
