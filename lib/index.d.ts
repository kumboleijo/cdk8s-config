export default class Config {
    private readonly data;
    private constructor();
    /**
     * This function creates a new config object out of a yaml file.
     * @param {string} filePath
     * @returns {Config}
     */
    static fromFile(filePath: string): Promise<Config>;
    /**
     * This function creates a new config object out of multiple yaml files.
     * @param {Array<string>} files
     * @returns {Config}
     */
    static fromFiles(files: Array<string>): Promise<Config>;
    /**
     * This function returns a ENV variable by a given key.
     * @param {string} key
     * @returns {string | undefined}
     */
    static getEnv(key: string): string | undefined;
    static requireEnv(key: string): string;
    get(): any;
    byKey(key: string): Config;
    requireByKey(key: string): Config;
    filterBy(searchString: string): Config;
}
