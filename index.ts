const fs = require('fs');
const fsPromises = fs.promises;
const yaml = require('js-yaml');

const Bro = require('brototype');

require('dotenv').config();

export type ConfigOptions = {
  configFile: string;
};

export type ConfigFileOptions = {
  filePath?: string;
  fileName?: string;
  key?: string | Array<string>;
};

export type RequiredConfigFileOptions = {
  filePath?: string;
  fileName?: string;
  key: string;
};

export default class Config {
  private configOptions: ConfigOptions | undefined;
  private data: any;
  private env: NodeJS.ProcessEnv;

  private constructor(data: Object) {
    this.data = data;
    this.env = process.env;
  }

  public static async fromFile(filePath: string) {
    try {
      const fileContents = await fsPromises.readFile(filePath, { encoding: 'utf8' });
      const data = yaml.safeLoad(fileContents);
      return new Config(data);
    } catch (error) {
      console.error(error);
      return new Config({});
    }
  }

  public getEnv(key: string) {
    const returnValue = this.env[key];
    return returnValue;
  }

  public requireEnv(key: string) {
    const returnValue = this.env[key];
    if (!returnValue) throw new Error('no such key in ENV: ' + key);
    return returnValue;
  }

  public get() {
    return this.data;
  }

  public byKey(key: string) {
    if (Bro(this.data).doYouEven(key)) {
      const keySplit = key.split('.');
      let data: any = undefined;
      keySplit.forEach((key) => {
        if (!data) {
          let tempData = this.data[key];
          data = tempData;
        } else {
          let tempData = data[key];
          data = tempData;
        }
      });
      return new Config(data);
    } else {
      return new Config({});
    }
  }

  public requireByKey(key: string) {
    if (Bro(this.data).doYouEven(key)) {
      const keySplit = key.split('.');
      let data: any = undefined;
      keySplit.forEach((key) => {
        if (!data) {
          let tempData = this.data[key];
          data = tempData;
        } else {
          let tempData = data[key];
          data = tempData;
        }
      });
      return new Config(data);
    } else {
      throw new Error('no such key: ' + key);
    }
  }

  public filterBy(searchString: string) {
    let data: any = {};

    for (const key in this.data) {
      if (key.indexOf(searchString) == 0) {
        if (this.data.hasOwnProperty(key)) {
          const element = this.data[key];
          data[key] = element;
        }
      }
    }

    return new Config(data);
  }
}
