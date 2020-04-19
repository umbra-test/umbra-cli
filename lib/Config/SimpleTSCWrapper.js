import { spawn } from "child_process";
class SimpleTSCWrapper {
    constructor(spawnRef = spawn) {
        this.spawnRef = spawn;
    }
    spawn(inFile, outFile) {
        // TODO: Add better verbose logging flags, tsc config options, error messaging.
        return new Promise((resolve, reject) => {
            const tscProcess = this.spawnRef("tsc", ["--outFile", outFile, inFile], { stdio: "inherit", shell: true });
            tscProcess.on("error", reject);
            tscProcess.on("close", resolve);
        });
    }
}
export { SimpleTSCWrapper };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2ltcGxlVFNDV3JhcHBlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9Db25maWcvU2ltcGxlVFNDV3JhcHBlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUMsS0FBSyxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBRXBDLE1BQU0sZ0JBQWdCO0lBR2xCLFlBQVksUUFBUSxHQUFHLEtBQUs7UUFDeEIsSUFBSSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7SUFDMUIsQ0FBQztJQUVELEtBQUssQ0FBQyxNQUFjLEVBQUUsT0FBZTtRQUNqQywrRUFBK0U7UUFDL0UsT0FBTyxJQUFJLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRTtZQUNuQyxNQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssRUFBRSxDQUFDLFdBQVcsRUFBRSxPQUFPLEVBQUUsTUFBTSxDQUFDLEVBQUUsRUFBQyxLQUFLLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUMsQ0FBQyxDQUFDO1lBQ3pHLFVBQVUsQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFLE1BQU0sQ0FBQyxDQUFDO1lBQy9CLFVBQVUsQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBQ3BDLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztDQUNKO0FBRUQsT0FBTyxFQUFDLGdCQUFnQixFQUFDLENBQUMifQ==