import fastGlob from "fast-glob";
import * as path from "path";
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
        return fastGlob(inputGlobs, { ignore: ["node_modules/**/*"] })
            .then((resolvedEntries) => {
            for (const entry of resolvedEntries) {
                const resolvedPath = path.resolve(entry.toString());
                this.testRunner.setCurrentFile(resolvedPath);
                require(resolvedPath);
            }
        });
    }
}
export { ModuleResolver };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTW9kdWxlUmVzb2x2ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvTW9kdWxlUmVzb2x2ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxRQUFRLE1BQU0sV0FBVyxDQUFDO0FBQ2pDLE9BQU8sS0FBSyxJQUFJLE1BQU0sTUFBTSxDQUFDO0FBRzdCLE1BQU0sY0FBYztJQUloQixZQUFZLFVBQXNCO1FBQzlCLElBQUksQ0FBQyxVQUFVLEdBQUcsVUFBVSxDQUFDO0lBQ2pDLENBQUM7SUFFRDs7OztPQUlHO0lBQ0ksV0FBVyxDQUFDLFVBQW9CO1FBQ25DLE9BQU8sUUFBUSxDQUFDLFVBQVUsRUFBRSxFQUFDLE1BQU0sRUFBRSxDQUFDLG1CQUFtQixDQUFDLEVBQUMsQ0FBQzthQUN2RCxJQUFJLENBQUMsQ0FBQyxlQUFlLEVBQUUsRUFBRTtZQUN0QixLQUFLLE1BQU0sS0FBSyxJQUFJLGVBQWUsRUFBRTtnQkFDakMsTUFBTSxZQUFZLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztnQkFDcEQsSUFBSSxDQUFDLFVBQVUsQ0FBQyxjQUFjLENBQUMsWUFBWSxDQUFDLENBQUM7Z0JBQzdDLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQzthQUN6QjtRQUNMLENBQUMsQ0FBQyxDQUFDO0lBQ1gsQ0FBQztDQUNKO0FBRUQsT0FBTyxFQUFDLGNBQWMsRUFBQyxDQUFDIn0=