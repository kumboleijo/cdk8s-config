import { ConfigOptions, ConfigFileOptions, RequiredConfigFileOptions } from './src/types';

const fs = require('fs');
const fsPromises = fs.promises;
const yaml = require('js-yaml');

require('dotenv').config();

export default class Config {
  private static instance: Config;
  private isSetup: Boolean = false;
  private configOptions: ConfigOptions | undefined;
  private env: NodeJS.ProcessEnv = {};

  private debugStack: string = '';

  private constructor() {}

  public static getInstance(): Config {
    if (!Config.instance) {
      Config.instance = new Config();
      Config.instance.loadEnv();
    }
    return Config.instance;
  }

  public setup(configOptions?: ConfigOptions): ConfigOptions | undefined {
    this.configOptions = configOptions;

    this.debugStack += `configOptions: ${JSON.stringify(this.configOptions, undefined, 1)}\n`;

    this.isSetup = true;
    this.loadEnv();

    return this.configOptions;
  }

  private loadEnv() {
    this.env = process.env;
  }

  public getEnv(key: string) {
    const returnValue = this.env[key];
    return returnValue;
  }

  public requireEnv(key: string) {
    const returnValue = this.env[key];
    if (!returnValue) throw new Error('no such key in ENV');
    return returnValue;
  }

  public async get(configFileOptions: ConfigFileOptions) {
    let options = {
      filePath: configFileOptions.filePath || `${this.configOptions?.configFilesPath}/${configFileOptions.fileName}`,
      fileName: configFileOptions.fileName,
      key: configFileOptions.key,
    };

    try {
      if (options.filePath) {
        const data = await fsPromises.readFile(options.filePath, { encoding: 'utf8' });
        const fileContents = yaml.safeLoad(data);
        const returnValue = configFileOptions.key ? fileContents[configFileOptions.key] : fileContents;
        return returnValue;
      }
    } catch (error) {
      return undefined;
    }
  }

  public async require(configFileOptions: RequiredConfigFileOptions) {
    let options = {
      filePath: configFileOptions.filePath || `${this.configOptions?.configFilesPath}/${configFileOptions.fileName}`,
      fileName: configFileOptions.fileName,
      key: configFileOptions.key,
    };

    try {
      if (options.filePath) {
        const data = await fsPromises.readFile(options.filePath, { encoding: 'utf8' });
        const fileContents = yaml.safeLoad(data);
        const returnValue = fileContents[configFileOptions.key];
        if (!returnValue) throw new Error('no such key in the config');
        return returnValue;
      }
    } catch (error) {
      throw error;
    }
  }

  // ---
  public printReport() {
    const configHeaderText = ' Configuration Report ';
    const configPrintWidth = 60;
    const configHeaderCharsCount = Math.floor((configPrintWidth - configHeaderText.length) / 2);
    const configHeader =
      '\n\n' + '='.repeat(configHeaderCharsCount) + configHeaderText + '='.repeat(configHeaderCharsCount) + '\n\n';
    const configFooterText = ' End Of Configuration Report ';
    const configFooterCharsCount = Math.floor((configPrintWidth - configFooterText.length) / 2);
    const configFooter =
      '\n\n' + '='.repeat(configFooterCharsCount) + configFooterText + '='.repeat(configFooterCharsCount) + '\n\n';

    console.log(configHeader);

    console.log('\n' + this.debugStack);

    // this.debugStack = '';

    console.log(configFooter);
  }
}
