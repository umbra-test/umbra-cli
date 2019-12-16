"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DEFAULT_TIMEOUT_MS = 100;
const DefaultConfig = {
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
exports.DefaultConfig = DefaultConfig;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRGVmYXVsdENvbmZpZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9Db25maWcvRGVmYXVsdENvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLE1BQU0sa0JBQWtCLEdBQUcsR0FBRyxDQUFDO0FBRS9CLE1BQU0sYUFBYSxHQUFnQjtJQUMvQixLQUFLLEVBQUUsRUFBRTtJQUNULEtBQUssRUFBRSxLQUFLO0lBQ1osVUFBVSxFQUFFLEtBQUs7SUFDakIsS0FBSyxFQUFFLEtBQUs7SUFDWixRQUFRLEVBQUUsY0FBYztJQUN4QixTQUFTLEVBQUU7UUFDUCxFQUFFLEVBQUUsa0JBQWtCO1FBQ3RCLE1BQU0sRUFBRSxrQkFBa0I7UUFDMUIsVUFBVSxFQUFFLGtCQUFrQjtRQUM5QixLQUFLLEVBQUUsa0JBQWtCO1FBQ3pCLFNBQVMsRUFBRSxrQkFBa0I7S0FDaEM7SUFDRCxTQUFTLEVBQUU7UUFDUCxVQUFVLEVBQUUsU0FBUztRQUNyQixTQUFTLEVBQUUsRUFBRTtLQUNoQjtJQUNELFFBQVEsRUFBRTtRQUNOLGVBQWUsRUFBRSxLQUFLO1FBQ3RCLGVBQWUsRUFBRSxLQUFLO0tBQ3pCO0NBQ0osQ0FBQztBQUVNLHNDQUFhIn0=