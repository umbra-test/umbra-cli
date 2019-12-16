class PackageDetector {
    static exists(packageName) {
        try {
            require(packageName);
            return true;
        }
        catch (e) {
            return false;
        }
    }
}
export { PackageDetector };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUGFja2FnZURldGVjdG9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL1BhY2thZ2VEZXRlY3Rvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLGVBQWU7SUFFakIsTUFBTSxDQUFDLE1BQU0sQ0FBQyxXQUFtQjtRQUM3QixJQUFJO1lBQ0EsT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDO1lBQ3JCLE9BQU8sSUFBSSxDQUFDO1NBQ2Y7UUFBQyxPQUFPLENBQUMsRUFBRTtZQUNSLE9BQU8sS0FBSyxDQUFDO1NBQ2hCO0lBQ0wsQ0FBQztDQUVKO0FBRUQsT0FBTyxFQUFDLGVBQWUsRUFBQyxDQUFDIn0=