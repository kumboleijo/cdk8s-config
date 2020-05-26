const path = require('path');
const fs = require('fs');
const yaml = require('js-yaml');

export async function readFile(filePath: String) {
  return new Promise<any>((resolve: any, reject: any) => {
    fs.access(filePath, fs.constants.F_OK, (err: any) => {
      if (err) reject(err);
      fs.readFile(filePath, 'utf8', (err: any, fileContents: any) => {
        if (err) reject(err);
        resolve(yaml.safeLoad(fileContents));
      });
    });
  });
}

export async function readFileJSON(filePath: String) {
  return new Promise<Object>((resolve: any, reject: any) => {
    fs.access(filePath, fs.constants.F_OK, (err: any) => {
      if (err) reject(err);
      fs.readFile(filePath, 'utf8', (err: any, fileContents: any) => {
        if (err) reject(err);
        resolve(JSON.parse(fileContents));
      });
    });
  });
}
