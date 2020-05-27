# cdk8s-config

*Add configuration 🛠 features to your cdk8s project.*

## Overview 👀

```ts
import Config from 'cdk8s-config';

async function run() {
  const configFilePath: string = '<path to your config yaml>'
  const CONFIG = await Config.fromFile(configFilePath);

  const confByKey: Config = CONFIG.byKey('my-key');
}

run();
```

## Installation 💻

```sh
$ npm i cdk8s-config
```

or

```sh
$ yarn add cdk8s-config
```

## Usage

```js
import Config from 'cdk8s-config';
```

## Running the Examples 🏃🏽‍♀️

```sh
$ npx ts-node ./examples/1-basic/
```


