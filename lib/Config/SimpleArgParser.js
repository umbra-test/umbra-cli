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