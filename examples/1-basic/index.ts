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
  const configFilePath: string = path.resolve(__dirname, './config/test.yaml');
  const CONFIG = await Config.fromFile(configFilePath);

  console.log(CONFIG.getEnv('USER'));

  console.log(CONFIG.get());

  console.log(CONFIG.byKey('my-key.key2.key5').get());

  try {
    console.log(CONFIG.requireByKey('my-key.key1').get());
  } catch (error) {
    console.log(error);
  }
}

run();
