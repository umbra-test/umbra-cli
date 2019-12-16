"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fast_glob_1 = require("fast-glob");
const path = require("path");
class ModuleResolver {
    constructor(testRunner) {
        this.testRunner = testRunner;
    }
    /**
     * A helper method which will resolve modules matching the input glob.
     * @param inputGlobs
     * @return a promise which will be resolved when all modules are.
     */
    resolveGlob(inputGlobs) {
        return fast_glob_1.default(inputGlobs)
            .then((resolvedEntries) => {
            for (const entry of resolvedEntries) {
                const resolvedPath = path.resolve(entry.toString());
                this.testRunner.setCurrentFile(resolvedPath);
                require(resolvedPath);
            }
        });
    }
}
exports.ModuleResolver = ModuleResolver;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTW9kdWxlUmVzb2x2ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvTW9kdWxlUmVzb2x2ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSx5Q0FBaUM7QUFDakMsNkJBQTZCO0FBRzdCLE1BQU0sY0FBYztJQUloQixZQUFZLFVBQXNCO1FBQzlCLElBQUksQ0FBQyxVQUFVLEdBQUcsVUFBVSxDQUFDO0lBQ2pDLENBQUM7SUFFRDs7OztPQUlHO0lBQ0ksV0FBVyxDQUFDLFVBQW9CO1FBQ25DLE9BQU8sbUJBQVEsQ0FBQyxVQUFVLENBQUM7YUFDdEIsSUFBSSxDQUFDLENBQUMsZUFBZSxFQUFFLEVBQUU7WUFDdEIsS0FBSyxNQUFNLEtBQUssSUFBSSxlQUFlLEVBQUU7Z0JBQ2pDLE1BQU0sWUFBWSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUM7Z0JBQ3BELElBQUksQ0FBQyxVQUFVLENBQUMsY0FBYyxDQUFDLFlBQVksQ0FBQyxDQUFDO2dCQUM3QyxPQUFPLENBQUMsWUFBWSxDQUFDLENBQUM7YUFDekI7UUFDTCxDQUFDLENBQUMsQ0FBQztJQUNYLENBQUM7Q0FDSjtBQUVPLHdDQUFjIn0=