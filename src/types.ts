export type ConfigFileOptions = {
  filePath?: string;
  fileName?: string;
  key?: string;
};

export type RequiredConfigFileOptions = {
  filePath?: string;
  fileName?: string;
  key: string;
};

export type ConfigOptions = {
  configFilesPath?: string;
};
