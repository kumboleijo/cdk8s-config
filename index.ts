const fs = require('fs');
const fsPromises = fs.promises;
const yaml = require('js-yaml');
const Bro = require('brototype');
const merge = require('deepmerge');

require('dotenv').config();

export default class Config {
  private readonly data: any;

  private constructor(data: Object) {
    this.data = data;
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

  public static async fromFiles(files: Array<string>) {
    try {
      let data: Array<Object> = [];
      let mergedData: Object = {};
      await asyncForEach(files, async (file: any) => {
        const fileContents = await fsPromises.readFile(file, { encoding: 'utf8' });
        const tempData = yaml.safeLoad(fileContents);

        data.push(tempData);
        mergedData = merge.all(data);
      });

      return new Config(mergedData);

      // return new Config(data);
    } catch (error) {
      console.error(error);
      return new Config({});
    }
  }

  public static getEnv(key: string) {
    const returnValue = process.env[key];
    return returnValue;
  }

  public static requireEnv(key: string) {
    const returnValue = process.env[key];
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

// ----- SOME HELPERS -----

async function asyncForEach(array: any, callback: any) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}
