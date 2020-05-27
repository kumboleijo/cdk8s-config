// -------------------------------------------------------------
//
// 4-require.ts
// ------------
//
// This example shows you how you can use cdk8s-config to access
// a config value from a file inside your code using the
// require() function.
//
// require() will throw an error if value is not set!
//
// -------------------------------------------------------------

import Config, { ConfigFileOptions } from '../../lib/index';
const path = require('path');

const CONFIG = Config.getInstance();

const configFilesPath: string = path.resolve(__dirname, './config');
CONFIG.setup({ configFilesPath: configFilesPath });

async function run() {
  console.log('\nrunning example 4-require...\n');

  // using absolute file path
  // ------------------------------------------------------------
  const configFilesPath: string = path.resolve(__dirname, './config');

  try {
    const configFileOptions2: ConfigFileOptions = { filePath: configFilesPath + '/test.yaml', key: 'my-key' };
    const config2 = await CONFIG.require(configFileOptions2);

    console.log(`# -- require(${JSON.stringify(configFileOptions2)})\n`);
    console.log(JSON.stringify(config2, undefined, 2));
    console.log();
  } catch (error) {
    console.error(error);
  }

  // ------------------------------------------------------------

  // use setup() to provide a base path for config files
  // ------------------------------------------------------------
  CONFIG.setup({ configFilesPath: configFilesPath });

  try {
    const configFileOptions: ConfigFileOptions = { fileName: 'test.yaml', key: 'my-key' };
    const config = await CONFIG.require(configFileOptions);

    console.log(`# -- require(${JSON.stringify(configFileOptions)})\n`);
    console.log(JSON.stringify(config, undefined, 2));
    console.log();
  } catch (error) {
    console.error(error);
  }
  // ------------------------------------------------------------

  // this will throw an error
  // ------------------------------------------------------------
  CONFIG.setup({ configFilesPath: configFilesPath });

  try {
    const configFileOptions3: ConfigFileOptions = { fileName: 'test.yaml', key: 'foo' };
    const config3 = await CONFIG.require(configFileOptions3);

    console.log(`# -- require(${JSON.stringify(configFileOptions3)})\n`);
    console.log(JSON.stringify(config3, undefined, 2));
    console.log();
  } catch (error) {
    console.error(error);
  }
  // ------------------------------------------------------------
}

run();
