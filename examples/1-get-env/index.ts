// -------------------------------------------------------------
//
// 1-get-env.ts
// ------------
//
// This example shows you how you can use cdk8s-config to access
// ENV from inside your code using the getEnv() function.
//
// getEnv() will return undefined if ENV is not set
//
// -------------------------------------------------------------

import Config from '../../lib/index';

const CONFIG = Config.getInstance();

function run() {
  console.log('\nrunning example 1-get-env...\n');

  const user = CONFIG.getEnv('USER');
  console.log(`# -- getEnv('USER') -> ${user}\n`);

  const stage = CONFIG.getEnv('STAGE');
  console.log(`# -- getEnv('STAGE') -> ${stage}\n`);

  const test = CONFIG.getEnv('THIS_KEY_FOR_SURE_DOESNT_EXIST');
  console.log(`# -- getEnv('THIS_KEY_FOR_SURE_DOESNT_EXIST') -> ${test}\n`);
}

run();
