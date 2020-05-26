"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var yaml_reader_1 = require("./src/utils/yaml-reader");
require('dotenv').config();
var Config = /** @class */ (function () {
    function Config() {
        this.isSetup = false;
        this.env = {};
        this.configKeyValues = [];
        this.debugStack = '';
    }
    Config.getInstance = function () {
        if (!Config.instance) {
            Config.instance = new Config();
        }
        return Config.instance;
    };
    Config.prototype.setup = function (configFilePath, configKeys, configOptions) {
        this.configFilesPath = configFilePath || undefined;
        this.configKeys = configKeys || ['STAGE'];
        this.configOptions = configOptions || {
            stages: [
                { name: 'production', prefix: 'prod' },
                { name: 'integration', prefix: 'int' },
                { name: 'testing', prefix: 'test' },
                { name: 'development', prefix: 'dev' },
                { name: 'staging', prefix: 'stage' },
            ],
        };
        this.debugStack += "configFilePath: " + this.configFilesPath + "\n";
        this.debugStack += "configKeys: " + this.configKeys + "\n";
        this.debugStack += "configOptions: " + JSON.stringify(this.configOptions, undefined, 1) + "\n";
        this.isSetup = true;
    };
    Config.prototype.load = function () {
        var _this = this;
        var _a;
        if (!this.isSetup)
            return;
        this.env = process.env;
        (_a = this.configKeys) === null || _a === void 0 ? void 0 : _a.forEach(function (key) {
            for (var envKey in _this.env) {
                if (_this.env.hasOwnProperty(envKey)) {
                    var value = _this.env[envKey];
                    if (envKey.toLowerCase().includes(key.toLowerCase())) {
                        _this.configKeyValues.push({ key: key, value: value });
                    }
                }
            }
        });
    };
    Config.prototype.getData = function (moduleName) {
        return __awaiter(this, void 0, void 0, function () {
            var stage, baseFilePath, specificFilePath, baseData, moreData, mergedData, fileContents, data, error_1, fileContents, data, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.isSetup)
                            return [2 /*return*/];
                        stage = this.getStage();
                        baseFilePath = this.configFilesPath + '/' + moduleName + '.yaml';
                        specificFilePath = this.configFilesPath + '/' + (moduleName + "-" + ((stage === null || stage === void 0 ? void 0 : stage.prefix) || this.getConfigValueForKey('stage')) + ".yaml");
                        this.debugStack += '\n-------\n';
                        this.debugStack += "MODULE:\t" + moduleName + "\n";
                        this.debugStack += "STAGE:\t" + this.getConfigValueForKey('stage') + "\n";
                        this.debugStack += "PREFIX:\t" + ((stage === null || stage === void 0 ? void 0 : stage.prefix) || this.getConfigValueForKey('stage')) + "\n";
                        baseData = {};
                        moreData = {};
                        mergedData = {};
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        this.debugStack += "FILE:\t" + baseFilePath + "\n";
                        return [4 /*yield*/, yaml_reader_1.readFile(baseFilePath)];
                    case 2:
                        fileContents = _a.sent();
                        data = fileContents.data;
                        baseData = data;
                        this.debugStack += "BASE:\t" + JSON.stringify(baseData, undefined, 2) + "\n";
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _a.sent();
                        this.debugStack += "BASE:\tnone";
                        return [3 /*break*/, 4];
                    case 4:
                        _a.trys.push([4, 6, , 7]);
                        this.debugStack += "FILE:\t" + specificFilePath + "\n";
                        return [4 /*yield*/, yaml_reader_1.readFile(specificFilePath)];
                    case 5:
                        fileContents = _a.sent();
                        data = fileContents.data;
                        moreData = data;
                        this.debugStack += "MORE:\t" + JSON.stringify(moreData, undefined, 2) + "\n";
                        return [3 /*break*/, 7];
                    case 6:
                        error_2 = _a.sent();
                        this.debugStack += "MORE:\tnone";
                        return [3 /*break*/, 7];
                    case 7:
                        mergedData = __assign(__assign({}, baseData), moreData);
                        return [2 /*return*/, { data: mergedData }];
                }
            });
        });
    };
    // ---
    Config.prototype.getConfigOptions = function () {
        if (!this.isSetup)
            return;
        return this.configOptions;
    };
    Config.prototype.getEnv = function () {
        if (!this.isSetup)
            return;
        return this.env;
    };
    Config.prototype.getConfigKeys = function () {
        if (!this.isSetup)
            return;
        return this.configKeys;
    };
    Config.prototype.getConfigKeyValues = function () {
        if (!this.isSetup)
            return;
        return this.configKeyValues;
    };
    Config.prototype.getConfigValueForKey = function (key) {
        if (!this.isSetup)
            return;
        var found = this.configKeyValues.find(function (keyVal) { return keyVal.key.toLowerCase() == key.toLowerCase(); });
        if (found) {
            return found.value;
        }
        else {
            return undefined;
        }
    };
    Config.prototype.getStage = function () {
        var _this = this;
        var _a;
        return (((_a = this.configOptions) === null || _a === void 0 ? void 0 : _a.stages.find(function (stage) { var _a; return stage.name.toLowerCase() == ((_a = _this.getConfigValueForKey('stage')) === null || _a === void 0 ? void 0 : _a.toLowerCase()); })) || {
            name: this.getConfigValueForKey('stage') || 'undefined',
            prefix: this.getConfigValueForKey('stage') || 'undefined',
        });
    };
    // ---
    Config.prototype.printReport = function () {
        var configHeaderText = ' Configuration Report ';
        var configPrintWidth = 60;
        var configHeaderCharsCount = Math.floor((configPrintWidth - configHeaderText.length) / 2);
        var configHeader = '\n\n' + '='.repeat(configHeaderCharsCount) + configHeaderText + '='.repeat(configHeaderCharsCount) + '\n\n';
        var configFooterText = ' End Of Configuration ';
        var configFooterCharsCount = Math.floor((configPrintWidth - configFooterText.length) / 2);
        var configFooter = '\n\n' + '='.repeat(configFooterCharsCount) + configFooterText + '='.repeat(configFooterCharsCount) + '\n\n';
        console.log(configHeader);
        console.log('\n' + this.debugStack);
        console.log(configFooter);
    };
    return Config;
}());
exports.default = Config;
