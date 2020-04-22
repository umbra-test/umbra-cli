class SimpleArgParser {
    constructor() {
        this.watchedArgs = [];
        this.banner = null;
    }
    withBanner(banner) {
        this.banner = banner;
        return this;
    }
    addArgument(name, aliases, help, required, type) {
        if (type === "trailing") {
            if (this.watchedArgs.some((arg) => arg.type === "trailing")) {
                throw new Error(`Can't add arg with name: ${name}, since another trailing arg already exists`);
            }
        }
        const allAliases = [`--${name}`, `-${name}`, ...aliases];
        for (const arg of allAliases) {
            const argExists = this.watchedArgs.some((argInfo) => argInfo.allAliases.indexOf(arg) !== -1);
            if (argExists) {
                throw new Error(`Can't add arg with name ${arg}, since it already was added.`);
            }
        }
        this.watchedArgs.push({
            name: name,
            allAliases: allAliases,
            help: help,
            required: required,
            type: type
        });
        return this;
    }
    parse(argv) {
        const trimmedArgv = argv.slice(2); // Remove the name + path.
        // TODO: Support a fancy help file.
        const requiredArgs = this.watchedArgs.filter((argInfo) => argInfo.required);
        for (const requiredArgInfo of requiredArgs) {
            if (!requiredArgInfo.allAliases.some((argName) => trimmedArgv.indexOf(argName) !== -1)) {
                throw new Error(`Missing required arg with name ${requiredArgInfo.name}, or aliases: ${requiredArgInfo.allAliases.splice(1)}`);
            }
        }
        const argResults = {};
        for (const argInfo of this.watchedArgs) {
            if (argInfo.type === "boolean") {
                argResults[argInfo.name] = this.extractBoolean(argInfo.allAliases, trimmedArgv);
            }
            else if (argInfo.type === "string") {
                const result = this.extractString(argInfo.allAliases, trimmedArgv);
                if (result !== null) {
                    argResults[argInfo.name] = result;
                }
            }
            else if (argInfo.type === "trailing") {
                const result = this.extractTrailing(trimmedArgv);
                if (result !== null) {
                    argResults[argInfo.name] = result;
                }
            }
        }
        return argResults;
    }
    extractBoolean(names, argv) {
        for (let i = 0; i < argv.length; i++) {
            if (names.indexOf(argv[i]) !== -1) {
                const nextValue = argv[i + 1];
                const isExplicitlyFalse = typeof nextValue === "string" && nextValue.toLowerCase() === "false";
                return !isExplicitlyFalse;
            }
        }
        return false;
    }
    extractString(names, argv) {
        for (let i = 0; i < argv.length; i++) {
            if (names.indexOf(argv[i]) !== -1) {
                const nextValue = argv[i + 1];
                if (i === argv.length - 1) {
                    throw new Error(`Missing required arg value for string arg with name ${names[0]}`);
                }
                return nextValue;
            }
        }
        return null;
    }
    extractTrailing(argv) {
        const startOfTail = this.getStartOfTail(argv);
        if (startOfTail !== null && startOfTail < argv.length) {
            return argv.slice(startOfTail);
        }
        return null;
    }
    getStartOfTail(argv) {
        const typeMap = {};
        for (const argInfo of this.watchedArgs) {
            for (const alias of argInfo.allAliases) {
                typeMap[alias] = argInfo.type;
            }
        }
        for (let i = argv.length - 1; i >= 0; i--) {
            const currentArg = argv[i].toLowerCase();
            const previousArg = i > 0 ? argv[i - 1].toLowerCase() : null;
            if (typeMap[currentArg]) {
                continue;
            }
            if (previousArg === null) {
                return i;
            }
            if (typeMap[previousArg]) {
                if (typeMap[previousArg] === "boolean") {
                    if (currentArg !== "false" && currentArg !== "true") {
                        return i;
                    }
                    else {
                        return i + 1;
                    }
                }
                else {
                    return i + 1;
                }
            }
        }
        return null;
    }
}
export { SimpleArgParser };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2ltcGxlQXJnUGFyc2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL0NvbmZpZy9TaW1wbGVBcmdQYXJzZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBVUEsTUFBTSxlQUFlO0lBQXJCO1FBRXFCLGdCQUFXLEdBQWMsRUFBRSxDQUFDO1FBQ3JDLFdBQU0sR0FBa0IsSUFBSSxDQUFDO0lBd0l6QyxDQUFDO0lBdElHLFVBQVUsQ0FBQyxNQUFjO1FBQ3JCLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO1FBQ3JCLE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFFRCxXQUFXLENBQStCLElBQVMsRUFBRSxPQUFpQixFQUFFLElBQVksRUFBRSxRQUFpQixFQUFFLElBQWE7UUFDbEgsSUFBSSxJQUFJLEtBQUssVUFBVSxFQUFFO1lBQ3JCLElBQUksSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLEdBQUcsQ0FBQyxJQUFJLEtBQUssVUFBVSxDQUFDLEVBQUU7Z0JBQ3pELE1BQU0sSUFBSSxLQUFLLENBQUMsNEJBQTRCLElBQUksNkNBQTZDLENBQUMsQ0FBQzthQUNsRztTQUNKO1FBRUQsTUFBTSxVQUFVLEdBQUcsQ0FBQyxLQUFLLElBQUksRUFBRSxFQUFFLElBQUksSUFBSSxFQUFFLEVBQUUsR0FBRyxPQUFPLENBQUMsQ0FBQztRQUN6RCxLQUFLLE1BQU0sR0FBRyxJQUFJLFVBQVUsRUFBRTtZQUMxQixNQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDLE9BQU8sRUFBRSxFQUFFLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsR0FBYSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN2RyxJQUFJLFNBQVMsRUFBRTtnQkFDWCxNQUFNLElBQUksS0FBSyxDQUFDLDJCQUEyQixHQUFHLCtCQUErQixDQUFD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