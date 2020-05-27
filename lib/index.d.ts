import { ConfigOptions, ConfigFileOptions, RequiredConfigFileOptions } from './src/types';
export declare type ConfigFileOptions = {
    filePath?: string;
    fileName?: string;
    key?: string;
};
export declare type RequiredConfigFileOptions = {
    filePath?: string;
    fileName?: string;
    key: string;
};
export declare type ConfigOptions = {
    configFilesPath?: string;
};
export default class Config {
    private static instance;
    private isSetup;
    private configOptions;
    private env;
    private constructor();
    static getInstance(): Config;
    setup(configOptions?: ConfigOptions): ConfigOptions | undefined;
    private loadEnv;
    getEnv(key: string): string | undefined;
    requireEnv(key: string): string;
    get(configFileOptions: ConfigFileOptions): Promise<any>;
    require(configFileOptions: RequiredConfigFileOptions): Promise<any>;
}
