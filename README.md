# cdk8s-config

*Add configuration 🛠 features to your cdk8s project.*

## Usage 👀

```ts
import Config from 'cdk8s-config';
const path = require('path');

const CONFIG = Config.getInstance();

const configFilesPath = path.resolve(__dirname, './config');
CONFIG.setup({ configFilesPath: configFilesPath });

async function start() {
  const configFileOptions = { fileName: 'test.yaml', key: 'my-key' };
  const config = await CONFIG.get(configFileOptions);
}
```

## Installation 💻

```sh
$ npm i cdk8s-config
```

or

```sh
$ yarn add cdk8s-config
```

## 

## Running the Examples 🏃🏽‍♀️

```sh
$ npx ts-node ./examples/1-get-env/index.ts
```


