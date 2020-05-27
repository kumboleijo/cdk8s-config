// -------------------------------------------------------------
//
// 3-get.ts
// --------
//
// This example shows you how you can use cdk8s-config to access
// a config value from a file inside your code using the get()
// function.
//
// get() can return undefined
//
// -------------------------------------------------------------

import Config from '../../lib/index';
import { ConfigFileOptions } from '../../lib/src/types';
const path = require('path');

const CONFIG = Config.getInstance();

async function run() {
  console.log('\nrunning example 3-get...\n');

  // using absolute file path
  // ------------------------------------------------------------
  const configFilesPath: string = path.resolve(__dirname, './config');

  const configFileOptions2: ConfigFileOptions = { filePath: configFilesPath + '/test.yaml', key: 'my-key' };
  const config2 = await CONFIG.get(configFileOptions2);

  console.log(`# -- get(${JSON.stringify(configFileOptions2)})\n`);
  console.log(JSON.stringify(config2, undefined, 2));
  console.log();
  // ------------------------------------------------------------

  // use setup() to provide a base path for config files
  // ------------------------------------------------------------
  CONFIG.setup({ configFilesPath: configFilesPath });

  const configFileOptions: ConfigFileOptions = { fileName: 'test.yaml', key: 'my-key' };
  const config = await CONFIG.get(configFileOptions);

  console.log(`# -- get(${JSON.stringify(configFileOptions)})\n`);
  console.log(JSON.stringify(config, undefined, 2));
  console.log();
  // ------------------------------------------------------------

  // this will return undefined
  // ------------------------------------------------------------
  CONFIG.setup({ configFilesPath: configFilesPath });

  const configFileOptions3: ConfigFileOptions = { fileName: 'test.yaml', key: 'foo' };
  const config3 = await CONFIG.get(configFileOptions3);

  console.log(`# -- get(${JSON.stringify(configFileOptions3)})\n`);
  console.log(JSON.stringify(config3, undefined, 2));
  console.log();
  // ------------------------------------------------------------
}

run();
