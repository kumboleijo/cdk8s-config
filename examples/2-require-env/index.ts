// -------------------------------------------------------------
//
// 2-require-env.ts
// ----------------
//
// This example shows you how you can use cdk8s-config to access
// ENV from inside your code using the requireEnv() function.
//
// requireEnv() will throw an error if ENV is not set!
//
// -------------------------------------------------------------

import Config from '../../lib/index';

const CONFIG = Config.getInstance();

function run() {
  console.log('\nrunning example 2-require-env...\n');

  try {
    const user = CONFIG.requireEnv('USER');
    console.log(`# -- getEnv('USER') -> ${user}\n`);

    const stage = CONFIG.requireEnv('STAGE');
    console.log(`# -- getEnv('STAGE') -> ${stage}\n`);

    const test = CONFIG.requireEnv('THIS_KEY_FOR_SURE_DOESNT_EXIST');
    console.log(`# -- getEnv('THIS_KEY_FOR_SURE_DOESNT_EXIST') -> ${test}\n`);
  } catch (error) {
    console.error(error);
  }
}

run();
