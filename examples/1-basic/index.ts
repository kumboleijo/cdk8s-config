// -------------------------------------------------------------
//
// 1-basic
// -------
//
//
// -------------------------------------------------------------

import Config from '../../lib/index';
const path = require('path');

async function run() {
  const configFilePath: string = path.resolve(__dirname, './config/base.yaml');

  const CONFIG: Config = await Config.fromFile(configFilePath);
  console.log(CONFIG.get());

  const user = Config.getEnv('USER');
  console.log(user);

  const confByKey: Config = CONFIG.byKey('my-key.key3');
  console.log(confByKey.get());

  const filterBy = confByKey.filterBy('a');
  console.log(filterBy.get());

  console.log(CONFIG.byKey('my-key.key3').filterBy('a').get());

  try {
    console.log(CONFIG.requireByKey('my-key.key1').get());
  } catch (error) {
    console.log(error);
  }
}

async function playground() {
  const configFiles: Array<string> = [
    path.resolve(__dirname, './config/base.yaml'),
    path.resolve(__dirname, './config/overrides.yaml'),
  ];

  const baseConfig = await Config.fromFile(configFiles[0]);
  const overrideConfig = await Config.fromFile(configFiles[1]);
  const mergedConfig = await Config.fromFiles(configFiles);

  console.log(baseConfig.get());
  console.log(overrideConfig.get());
  console.log(mergedConfig.get());
}

run();

playground();
