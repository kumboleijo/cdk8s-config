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

  /**
   * This function creates a new config object out of a yaml file.
   * @param {string} filePath
   * @returns {Config}
   * @example const configFromFile = await Config.fromFile('file.yaml');
   */
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

  /**
   * This function creates a new config object out of multiple yaml files.
   * @param {Array<string>} files
   * @returns {Config}
   * @example const configFromMultipleFiles = await Config.fromFiles(['file1.yaml', 'file2.yaml']);
   */
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

  /**
   * This function returns a ENV variable by a given key.
   * @param {string} key
   * @returns {string | undefined}
   */
  public static getEnv(key: string) {
    const returnValue = process.env[key];
    return returnValue;
  }

  /**
   * This function returns a ENV variable by a given key. If the ENV is not found the function will throw an error.
   * @param {string} key
   * @returns {string}
   */
  public static requireEnv(key: string) {
    const returnValue = process.env[key];
    if (!returnValue) throw new Error('no such key in ENV: ' + key);
    return returnValue;
  }

  /**
   * This function returns the all the data of the current config object.
   * @returns {Object}
   */
  public get() {
    return this.data;
  }

  /**
   * This function returns a new Config for a given key.
   * @param {string} key
   * @returns {Config}
   */
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

  /**
   * This function returns a new Config for a given key. If the key is not found the function will throw an error.
   * @param {string} key
   * @returns {Config}
   */
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

  /**
   * This function returns a new Config for a given searchString.
   * @param {string} searchString
   * @returns {Config}
   */
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
