export default class Config {
    private readonly data;
    private constructor();
    /**
     * This function creates a new config object out of a yaml file.
     * @param {string} filePath
     * @returns {Config}
     * @example const configFromFile = await Config.fromFile('file.yaml');
     */
    static fromFile(filePath: string): Promise<Config>;
    /**
     * This function creates a new config object out of multiple yaml files.
     * @param {Array<string>} files
     * @returns {Config}
     * @example const configFromMultipleFiles = await Config.fromFiles(['file1.yaml', 'file2.yaml']);
     */
    static fromFiles(files: Array<string>): Promise<Config>;
    /**
     * This function returns a ENV variable by a given key.
     * @param {string} key
     * @returns {string | undefined}
     */
    static getEnv(key: string): string | undefined;
    /**
     * This function returns a ENV variable by a given key. If the ENV is not found the function will throw an error.
     * @param {string} key
     * @returns {string}
     */
    static requireEnv(key: string): string;
    /**
     * This function returns the all the data of the current config object.
     * @returns {Object}
     */
    get(): any;
    /**
     * This function returns a new Config for a given key.
     * @param {string} key
     * @returns {Config}
     */
    byKey(key: string): Config;
    /**
     * This function returns a new Config for a given key. If the key is not found the function will throw an error.
     * @param {string} key
     * @returns {Config}
     */
    requireByKey(key: string): Config;
    /**
     * This function returns a new Config for a given searchString.
     * @param {string} searchString
     * @returns {Config}
     */
    filterBy(searchString: string): Config;
}
