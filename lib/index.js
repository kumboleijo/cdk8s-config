"use strict";
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
var fs = require('fs');
var fsPromises = fs.promises;
var yaml = require('js-yaml');
var Bro = require('brototype');
var merge = require('deepmerge');
require('dotenv').config();
var Config = /** @class */ (function () {
    function Config(data) {
        this.data = data;
    }
    /**
     * This function creates a new config object out of a yaml file.
     * @param {string} filePath
     * @returns {Config}
     */
    Config.fromFile = function (filePath) {
        return __awaiter(this, void 0, void 0, function () {
            var fileContents, data, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, fsPromises.readFile(filePath, { encoding: 'utf8' })];
                    case 1:
                        fileContents = _a.sent();
                        data = yaml.safeLoad(fileContents);
                        return [2 /*return*/, new Config(data)];
                    case 2:
                        error_1 = _a.sent();
                        console.error(error_1);
                        return [2 /*return*/, new Config({})];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * This function creates a new config object out of multiple yaml files.
     * @param {Array<string>} files
     * @returns {Config}
     */
    Config.fromFiles = function (files) {
        return __awaiter(this, void 0, void 0, function () {
            var data_1, mergedData_1, error_2;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        data_1 = [];
                        mergedData_1 = {};
                        return [4 /*yield*/, asyncForEach(files, function (file) { return __awaiter(_this, void 0, void 0, function () {
                                var fileContents, tempData;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, fsPromises.readFile(file, { encoding: 'utf8' })];
                                        case 1:
                                            fileContents = _a.sent();
                                            tempData = yaml.safeLoad(fileContents);
                                            data_1.push(tempData);
                                            mergedData_1 = merge.all(data_1);
                                            return [2 /*return*/];
                                    }
                                });
                            }); })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, new Config(mergedData_1)];
                    case 2:
                        error_2 = _a.sent();
                        console.error(error_2);
                        return [2 /*return*/, new Config({})];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * This function returns a ENV variable by a given key.
     * @param {string} key
     * @returns {string | undefined}
     */
    Config.getEnv = function (key) {
        var returnValue = process.env[key];
        return returnValue;
    };
    Config.requireEnv = function (key) {
        var returnValue = process.env[key];
        if (!returnValue)
            throw new Error('no such key in ENV: ' + key);
        return returnValue;
    };
    Config.prototype.get = function () {
        return this.data;
    };
    Config.prototype.byKey = function (key) {
        var _this = this;
        if (Bro(this.data).doYouEven(key)) {
            var keySplit = key.split('.');
            var data_2 = undefined;
            keySplit.forEach(function (key) {
                if (!data_2) {
                    var tempData = _this.data[key];
                    data_2 = tempData;
                }
                else {
                    var tempData = data_2[key];
                    data_2 = tempData;
                }
            });
            return new Config(data_2);
        }
        else {
            return new Config({});
        }
    };
    Config.prototype.requireByKey = function (key) {
        var _this = this;
        if (Bro(this.data).doYouEven(key)) {
            var keySplit = key.split('.');
            var data_3 = undefined;
            keySplit.forEach(function (key) {
                if (!data_3) {
                    var tempData = _this.data[key];
                    data_3 = tempData;
                }
                else {
                    var tempData = data_3[key];
                    data_3 = tempData;
                }
            });
            return new Config(data_3);
        }
        else {
            throw new Error('no such key: ' + key);
        }
    };
    Config.prototype.filterBy = function (searchString) {
        var data = {};
        for (var key in this.data) {
            if (key.indexOf(searchString) == 0) {
                if (this.data.hasOwnProperty(key)) {
                    var element = this.data[key];
                    data[key] = element;
                }
            }
        }
        return new Config(data);
    };
    return Config;
}());
exports.default = Config;
// ----- SOME HELPERS -----
function asyncForEach(array, callback) {
    return __awaiter(this, void 0, void 0, function () {
        var index;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    index = 0;
                    _a.label = 1;
                case 1:
                    if (!(index < array.length)) return [3 /*break*/, 4];
                    return [4 /*yield*/, callback(array[index], index, array)];
                case 2:
                    _a.sent();
                    _a.label = 3;
                case 3:
                    index++;
                    return [3 /*break*/, 1];
                case 4: return [2 /*return*/];
            }
        });
    });
}
