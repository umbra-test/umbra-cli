declare type ArgType = "boolean" | "string" | "trailing";
declare class SimpleArgParser<ArgResults> {
    private readonly watchedArgs;
    private banner;
    withBanner(banner: string): SimpleArgParser<ArgResults>;
    addArgument<Key extends keyof ArgResults>(name: Key, aliases: string[], help: string, required: boolean, type: ArgType): SimpleArgParser<ArgResults>;
    parse<ArgResults>(argv: string[]): ArgResults;
    private extractBoolean;
    private extractString;
    private extractTrailing;
    private getStartOfTail;
}
export { SimpleArgParser };
