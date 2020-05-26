import Config from '../lib/index';
const path = require('path');

const CONFIG = Config.getInstance();

const configFilesPath: string = path.resolve(__dirname, './config');
CONFIG.setup({ configFilesPath: configFilesPath });

async function samples() {
  console.log('\nrunning some samples...\n');

  // get ENV variables
  // -----------------

  const user = CONFIG.getEnv('USER');
  console.log(`# -- getEnv('USER') -> ${user}\n`);

  const stage = CONFIG.getEnv('STAGE');
  console.log(`# -- getEnv('STAGE') -> ${stage}\n`);

  // require ENV variables
  // ---------------------

  try {
    console.log(`# -- requireEnv('foo')\n`);
    const foo = CONFIG.requireEnv('foo');
    console.log(`# -- requireEnv('foo') -> ${foo}\n`);
  } catch (error) {
    console.error(error);
    console.log();
  }

  // get config from a file
  // ----------------------

  const fileName = 'test.yaml';
  const filePath = configFilesPath + '/' + fileName;
  const config = await CONFIG.get({ filePath: filePath });
  console.log(`# -- get({ filePath: ${filePath}}\n`);
  console.log(JSON.stringify(config, undefined, 2));
  console.log();

  const config2 = await CONFIG.get({ fileName: 'test.yaml', key: 'my-key' });
  console.log(`# -- get({ fileName: ${fileName}}, key: 'my-key')\n`);
  console.log(JSON.stringify(config2, undefined, 2));
  console.log();

  // require config from a file
  // --------------------------

  try {
    console.log(`# -- require({ fileName: ${fileName}, key: 'bla'})\n`);
    const config3 = await CONFIG.require({ fileName: 'test.yaml', key: 'bla' });
    console.log(JSON.stringify(config3, undefined, 2));
    console.log();
  } catch (error) {
    console.error(error);
    console.log();
  }
}

async function playground() {}

samples();
