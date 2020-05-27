export declare type ConfigOptions = {
    configFile: string;
};
export declare type ConfigFileOptions = {
    filePath?: string;
    fileName?: string;
    key?: string | Array<string>;
};
export declare type RequiredConfigFileOptions = {
    filePath?: string;
    fileName?: string;
    key: string;
};
export default class Config {
    private configOptions;
    private data;
    private env;
    private constructor();
    static fromFile(filePath: string): Promise<Config>;
    getEnv(key: string): string | undefined;
    requireEnv(key: string): string;
    get(): any;
    byKey(key: string): Config;
    requireByKey(key: string): Config;
}
