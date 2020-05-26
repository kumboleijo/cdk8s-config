import { ConfigOptions } from './src/types/configOptions';
import { ConfigKeyValue } from './src/types/configKeyValue';
import { Stage } from './src/types/stage';
export default class Config {
    private static instance;
    private isSetup;
    private configFilesPath;
    private configKeys;
    private configOptions;
    private env;
    private configKeyValues;
    private debugStack;
    private constructor();
    static getInstance(): Config;
    setup(configFilePath?: string, configKeys?: Array<string>, configOptions?: ConfigOptions): void;
    load(): void;
    getData(moduleName: string): Promise<{
        data: Object;
    } | undefined>;
    getConfigOptions(): ConfigOptions | undefined;
    getEnv(): any;
    getConfigKeys(): string[] | undefined;
    getConfigKeyValues(): ConfigKeyValue[] | undefined;
    getConfigValueForKey(key: string): string | undefined;
    getStage(): Stage;
    printReport(): void;
}
