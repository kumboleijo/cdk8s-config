# cdk8s-config

_Add configuration 🛠 features to your cdk8s project._

## Overview 👀

```yaml
# my-config.yaml
# --------------

my-key:
  key1: value1
```

```ts
// index.ts
// --------

import Config from 'cdk8s-config';

const CONFIG = await Config.fromFile('<path to your config yaml>');
const data = CONFIG.get();

// data = { 'my-key': { 'key1': 'value1' } }
```

## Installation 💻

```sh
$ npm i cdk8s-config
```

or

```sh
$ yarn add cdk8s-config
```

## Documentation 📖
 
Check out the full documentation here: https://kumboleijo.github.io/cdk8s-config/

## Run the Examples 🏃🏽‍♀️

```sh
$ npx ts-node ./examples/1-basic/
```
