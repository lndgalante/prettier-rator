const readlineSync = require('readline-sync');
const jsonfile = require('jsonfile');
const path = require('path');
const fs = require('fs');
jsonfile.spaces = 2;

module.exports = class PrettierConfigGenerator {
  constructor() {
    // Default values do no touch ! (unless they change on the documentation)
    this.config = {
      printWidth: 80,
      tabWidth: 2,
      singleQuote: false,
      trailingComma: 'none',
      bracketSpacing: true,
      jsxBracketSameLine: false,
      parser: 'babylon'
    };
    // Current path name for letting know the user where to find the files
    this.currentPath = path.resolve('./');
    // Folder name where config files will be saved
    this.configFolderPath = './configs';
    // File paths for each text editor new config file
    this.sublimeConfigPath = `${this.configFolderPath}/JsPrettier.sublime-settings`;
    this.vsCodeConfigPath = `${this.configFolderPath}/settings.json`;
    // Ask for each property in Prettier
    this.askAll();
    // Create config for each text editor
    this.createConfig();
  }
  askPrintWidth() {
    console.log('Fit code within this line limit.');
    this.config.printWidth = readlineSync.questionInt(`Insert Print Width (default: ${this.config.printWidth}): `, {
      defaultInput: this.config.printWidth
    });
  }
  askTabWidth() {
    console.log('Number of spaces it should use per tab.');
    this.config.tabWidth = readlineSync.questionInt(`Insert Tab Width (default: ${this.config.tabWidth}): `, {
      defaultInput: this.config.tabWidth
    });
  }
  askSingleQuote() {
    console.log('If true, will use single instead of double quotes.');
    this.config.singleQuote = readlineSync.keyInYNStrict(`Want Single Quotes? (default: ${this.config.singleQuote}): `);
  }
  askTrailingComma() {
    console.log('Controls the printing of trailing commas wherever possible.');
    const options = [
      'none - No trailing commas',
      'es5 - Trailing commas where valid in ES5 (objects, arrays, etc)',
      'all - Trailing commas wherever possible (function arguments)'
    ];
    const index = readlineSync.keyInSelect(options, `Which option you want? (default: ${this.config.trailingComma})`, {
      cancel: false
    });
    switch (index) {
      case 0:
        this.config.trailingComma = 'none';
        break;
      case 1:
        this.config.trailingComma = 'es5';
        break;
      case 2:
        this.config.trailingComma = 'all';
        break;
      default:
        break;
    }
  }
  askBacketSpacing() {
    console.log('Controls the printing of spaces inside object literals.');
    this.config.bracketSpacing = readlineSync.keyInYNStrict(
      `Want bracket spacing? (default: ${this.config.bracketSpacing}): `
    );
  }
  askJsxBracketSameLine() {
    console.log(
      `If true, puts the '>' of a multi-line jsx element at the end of
    the last line instead of being alone on the next line.
    `
    );
    this.config.jsxBracketSameLine = readlineSync.keyInYNStrict(
      `Want '>' on the same line? (default: ${this.config.jsxBracketSameLine}): `
    );
  }
  askParser() {
    console.log('Which parser to use.');
    const options = ['babylon', 'flow'];
    const index = readlineSync.keyInSelect(options, `Which option you want? (default: ${this.config.parser})`, {
      cancel: false
    });
    this.config.parser = options[index];
  }
  askAll() {
    this.askPrintWidth();
    console.log('\n');
    this.askTabWidth();
    console.log('\n');
    this.askSingleQuote();
    console.log('\n');
    this.askTrailingComma();
    console.log('\n');
    this.askBacketSpacing();
    console.log('\n');
    this.askJsxBracketSameLine();
    console.log('\n');
    this.askParser();
    console.log('\n');
  }
  createSublimeConfig() {
    const sublimeConfig = {
      prettier_cli_path: '',
      auto_format_on_save: false,
      allow_inline_formatting: false,
      prettier_options: this.config
    };
    jsonfile.writeFileSync(this.sublimeConfigPath, sublimeConfig, err => {
      if (err) console.error(err);
      console.log('Sublime Text config generated!');
      console.log(`Find it in: ${this.currentPath + this.sublimeConfigPath.replace('.', '')} \n`);
    });
  }
  createVsCodeConfig() {
    const vsCodeConfig = {
      'prettier.printWidth': this.config.printWidth,
      'prettier.tabWidth': this.config.tabWidth,
      'prettier.singleQuote': this.config.singleQuote,
      'prettier.trailingComma': this.config.trailingComma,
      'prettier.bracketSpacing': this.config.bracketSpacing,
      'prettier.parser': this.config.parser
    };
    jsonfile.writeFile(this.vsCodeConfigPath, vsCodeConfig, err => {
      if (err) console.error(err);
      console.log('Visual Studio Code config generated!');
      console.log(`Find it in: ${this.currentPath + this.vsCodeConfigPath.replace('.', '')} \n`);
    });
  }
  createConfig() {
    if (!fs.existsSync(this.configFolderPath)) {
      fs.mkdirSync(this.configFolderPath);
    }
    this.createSublimeConfig();
    this.createVsCodeConfig();
  }
};
