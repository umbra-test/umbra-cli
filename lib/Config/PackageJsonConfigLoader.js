import * as path from "path";
class PackageJsonConfigLoader {
    constructor(requireProxy = require) {
        this.requireRef = requireProxy;
    }
    loadConfig() {
        try {
            const packageJson = require(path.resolve(process.cwd(), "./package.json"));
            return packageJson.umbra ? packageJson.umbra : null;
        }
        catch (error) {
            // TODO: Add verbose logging.
            return null;
        }
    }
}
export { PackageJsonConfigLoader };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUGFja2FnZUpzb25Db25maWdMb2FkZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvQ29uZmlnL1BhY2thZ2VKc29uQ29uZmlnTG9hZGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sS0FBSyxJQUFJLE1BQU0sTUFBTSxDQUFDO0FBRTdCLE1BQU0sdUJBQXVCO0lBR3pCLFlBQVksWUFBWSxHQUFHLE9BQU87UUFDOUIsSUFBSSxDQUFDLFVBQVUsR0FBRyxZQUFZLENBQUM7SUFDbkMsQ0FBQztJQUVELFVBQVU7UUFDTixJQUFJO1lBQ0EsTUFBTSxXQUFXLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxFQUFFLGdCQUFnQixDQUFDLENBQUMsQ0FBQztZQUMzRSxPQUFPLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztTQUN2RDtRQUFDLE9BQU8sS0FBSyxFQUFFO1lBQ1osNkJBQTZCO1lBQzdCLE9BQU8sSUFBSSxDQUFDO1NBQ2Y7SUFDTCxDQUFDO0NBQ0o7QUFFRCxPQUFPLEVBQUMsdUJBQXVCLEVBQUMsQ0FBQyJ9