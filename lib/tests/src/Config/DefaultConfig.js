"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DEFAULT_TIMEOUT_MS = 100;
const DefaultConfig = {
    input: ["./**/*.test.js"],
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRGVmYXVsdENvbmZpZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9Db25maWcvRGVmYXVsdENvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLE1BQU0sa0JBQWtCLEdBQUcsR0FBRyxDQUFDO0FBRS9CLE1BQU0sYUFBYSxHQUFnQjtJQUMvQixLQUFLLEVBQUUsQ0FBQyxnQkFBZ0IsQ0FBQztJQUN6QixLQUFLLEVBQUUsS0FBSztJQUNaLFVBQVUsRUFBRSxLQUFLO0lBQ2pCLEtBQUssRUFBRSxLQUFLO0lBQ1osUUFBUSxFQUFFLGNBQWM7SUFDeEIsU0FBUyxFQUFFO1FBQ1AsRUFBRSxFQUFFLGtCQUFrQjtRQUN0QixNQUFNLEVBQUUsa0JBQWtCO1FBQzFCLFVBQVUsRUFBRSxrQkFBa0I7UUFDOUIsS0FBSyxFQUFFLGtCQUFrQjtRQUN6QixTQUFTLEVBQUUsa0JBQWtCO0tBQ2hDO0lBQ0QsU0FBUyxFQUFFO1FBQ1AsVUFBVSxFQUFFLFNBQVM7UUFDckIsU0FBUyxFQUFFLEVBQUU7S0FDaEI7SUFDRCxRQUFRLEVBQUU7UUFDTixlQUFlLEVBQUUsS0FBSztRQUN0QixlQUFlLEVBQUUsS0FBSztLQUN6QjtDQUNKLENBQUM7QUFFTSxzQ0FBYSJ9