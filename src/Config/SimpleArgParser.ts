type ArgType = "boolean" | "string" | "trailing";

interface ArgInfo {
    name: string;
    allAliases: string[];
    help: string;
    required: boolean;
    type: ArgType;
}

class SimpleArgParser<ArgResults> {

    private readonly watchedArgs: ArgInfo[] = [];
    private banner: string | null = null;

    withBanner(banner: string): SimpleArgParser<ArgResults> {
        this.banner = banner;
        return this;
    }

    addArgument<Key extends keyof ArgResults>(name: Key, aliases: string[], help: string, required: boolean, type: ArgType): SimpleArgParser<ArgResults> {
        if (type === "trailing") {
            if (this.watchedArgs.some((arg) => arg.type === "trailing")) {
                throw new Error(`Can't add arg with name: ${name}, since another trailing arg already exists`);
            }
        }

        const allAliases = [`--${name}`, `-${name}`, ...aliases];
        for (const arg of allAliases) {
            const argExists = this.watchedArgs.some((argInfo) => argInfo.allAliases.indexOf(arg as string) !== -1);
            if (argExists) {
                throw new Error(`Can't add arg with name ${arg}, since it already was added.`);
            }
        }

        this.watchedArgs.push({
            name: name as string,
            allAliases: allAliases as string[],
            help: help,
            required: required,
            type: type
        });

        return this;
    }

    parse<ArgResults>(argv: string[]): ArgResults {
        const trimmedArgv = argv.slice(2); // Remove the name + path.
        // TODO: Support a fancy help file.

        const requiredArgs = this.watchedArgs.filter((argInfo) => argInfo.required);
        for (const requiredArgInfo of requiredArgs) {
            if (!requiredArgInfo.allAliases.some((argName) => trimmedArgv.indexOf(argName) !== -1)) {
                throw new Error(`Missing required arg with name ${requiredArgInfo.name}, or aliases: ${requiredArgInfo.allAliases.splice(1)}`);
            }
        }

        const argResults: { [name: string]: any } = {};
        for (const argInfo of this.watchedArgs) {
            if (argInfo.type === "boolean") {
                argResults[argInfo.name] = this.extractBoolean(argInfo.allAliases, trimmedArgv);
            } else if (argInfo.type === "string") {
                const result = this.extractString(argInfo.allAliases, trimmedArgv);
                if (result !== null) {
                    argResults[argInfo.name] = result;
                }
            } else if (argInfo.type === "trailing") {
                const result = this.extractTrailing(trimmedArgv);
                if (result !== null) {
                    argResults[argInfo.name] = result;
                }
            }
        }

        return argResults as ArgResults;
    }

    private extractBoolean(names: string[], argv: string[]): boolean {
        for (let i = 0; i < argv.length; i++) {
            if (names.indexOf(argv[i]) !== -1) {
                const nextValue = argv[i + 1];
                const isExplicitlyFalse = typeof nextValue === "string" && nextValue.toLowerCase() === "false";

                return !isExplicitlyFalse;
            }
        }

        return false;
    }

    private extractString(names: string[], argv: string[]): string | null {
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

    private extractTrailing(argv: string[]): string[] | null {
        const startOfTail = this.getStartOfTail(argv);
        if (startOfTail !== null && startOfTail < argv.length) {
            return argv.slice(startOfTail);
        }

        return null;
    }

    private getStartOfTail(argv: string[]): number | null {
        const typeMap: { [alias: string]: ArgType } = {};
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
                    } else {
                        return i + 1;
                    }
                } else {
                    return i + 1;
                }
            }
        }

        return null;
    }
}

export { SimpleArgParser };
