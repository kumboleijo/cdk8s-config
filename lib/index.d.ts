export default class Config {
    private readonly data;
    private constructor();
    static fromFile(filePath: string): Promise<Config>;
    static fromFiles(files: Array<string>): Promise<Config>;
    static getEnv(key: string): string | undefined;
    static requireEnv(key: string): string;
    get(): any;
    byKey(key: string): Config;
    requireByKey(key: string): Config;
    filterBy(searchString: string): Config;
}
