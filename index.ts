import { readFile } from './src/utils/yaml-reader';
import { ConfigOptions } from './src/types/configOptions';
import { ConfigKeyValue } from './src/types/configKeyValue';
import { Stage } from './src/types/stage';

require('dotenv').config();

export default class Config {
  private static instance: Config;
  private isSetup: Boolean = false;
  private configFilesPath: string | undefined;
  private configKeys: Array<string> | undefined;
  private configOptions: ConfigOptions | undefined;
  private env: any = {};
  private configKeyValues: Array<ConfigKeyValue> = [];

  private debugStack: string = '';

  private constructor() {}

  public static getInstance(): Config {
    if (!Config.instance) {
      Config.instance = new Config();
    }
    return Config.instance;
  }

  public setup(configFilePath?: string, configKeys?: Array<string>, configOptions?: ConfigOptions) {
    this.configFilesPath = configFilePath || undefined;
    this.configKeys = configKeys || ['STAGE'];
    this.configOptions = configOptions || {
      stages: [
        { name: 'production', prefix: 'prod' },
        { name: 'integration', prefix: 'int' },
        { name: 'testing', prefix: 'test' },
        { name: 'development', prefix: 'dev' },
        { name: 'staging', prefix: 'stage' },
      ],
    };

    this.debugStack += `configFilePath: ${this.configFilesPath}\n`;
    this.debugStack += `configKeys: ${this.configKeys}\n`;
    this.debugStack += `configOptions: ${JSON.stringify(this.configOptions, undefined, 1)}\n`;

    this.isSetup = true;
  }

  public load() {
    if (!this.isSetup) return;

    this.env = process.env;

    this.configKeys?.forEach((key) => {
      for (const envKey in this.env) {
        if (this.env.hasOwnProperty(envKey)) {
          const value = this.env[envKey];
          if (envKey.toLowerCase().includes(key.toLowerCase())) {
            this.configKeyValues.push({ key, value });
          }
        }
      }
    });
  }

  public async getData(moduleName: string) {
    if (!this.isSetup) return;

    const stage: Stage | undefined = this.getStage();

    const baseFilePath: string = this.configFilesPath + '/' + moduleName + '.yaml';
    const specificFilePath: string =
      this.configFilesPath + '/' + `${moduleName}-${stage?.prefix || this.getConfigValueForKey('stage')}.yaml`;

    this.debugStack += '\n-------\n';
    this.debugStack += `MODULE:\t${moduleName}\n`;
    this.debugStack += `STAGE:\t${this.getConfigValueForKey('stage')}\n`;
    this.debugStack += `PREFIX:\t${stage?.prefix || this.getConfigValueForKey('stage')}\n`;

    let baseData: Object = {};
    let moreData: Object = {};
    let mergedData: Object = {};

    // BASE DATA
    try {
      this.debugStack += `FILE:\t${baseFilePath}\n`;
      const fileContents: any = await readFile(baseFilePath);
      const data = fileContents.data;

      baseData = data;

      this.debugStack += `DATA:\t${JSON.stringify(baseData, undefined, 2)}\n`;
    } catch (error) {
      this.debugStack += `DATA:\tnone`;
    }

    // STAGE DATA
    try {
      this.debugStack += `FILE:\t${specificFilePath}\n`;
      const fileContents: any = await readFile(specificFilePath);
      const data = fileContents.data;

      moreData = data;

      this.debugStack += `DATA:\t${JSON.stringify(moreData, undefined, 2)}\n`;
    } catch (error) {
      this.debugStack += `DATA:\tnone`;
    }

    mergedData = { ...baseData, ...moreData };
    return { data: mergedData };
  }

  // ---
  public getConfigOptions() {
    if (!this.isSetup) return;
    return this.configOptions;
  }

  public getEnv() {
    if (!this.isSetup) return;
    return this.env;
  }

  public getConfigKeys() {
    if (!this.isSetup) return;
    return this.configKeys;
  }

  public getConfigKeyValues() {
    if (!this.isSetup) return;
    return this.configKeyValues;
  }

  public getConfigValueForKey(key: string) {
    if (!this.isSetup) return;

    const found: ConfigKeyValue | undefined = this.configKeyValues.find(
      (keyVal) => keyVal.key.toLowerCase() == key.toLowerCase(),
    );

    if (found) {
      return found.value;
    } else {
      return undefined;
    }
  }

  public getStage() {
    return (
      this.configOptions?.stages.find(
        (stage) => stage.name.toLowerCase() == this.getConfigValueForKey('stage')?.toLowerCase(),
      ) || {
        name: this.getConfigValueForKey('stage') || 'undefined',
        prefix: this.getConfigValueForKey('stage') || 'undefined',
      }
    );
  }

  // ---
  public printReport() {
    const configHeaderText = ' Configuration Report ';
    const configPrintWidth = 60;
    const configHeaderCharsCount = Math.floor((configPrintWidth - configHeaderText.length) / 2);
    const configHeader =
      '\n\n' + '='.repeat(configHeaderCharsCount) + configHeaderText + '='.repeat(configHeaderCharsCount) + '\n\n';
    const configFooterText = ' End Of Configuration ';
    const configFooterCharsCount = Math.floor((configPrintWidth - configFooterText.length) / 2);
    const configFooter =
      '\n\n' + '='.repeat(configFooterCharsCount) + configFooterText + '='.repeat(configFooterCharsCount) + '\n\n';

    console.log(configHeader);

    console.log('\n' + this.debugStack);

    console.log(configFooter);
  }
}
