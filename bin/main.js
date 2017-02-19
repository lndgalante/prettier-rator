const readlineSync = require('readline-sync');
const jsonfile = require('jsonfile');

module.exports = class PrettierConfigGenerator {
  constructor() {
    // Default values do no touch!
    this.printWidth = 80;
    this.tabWidth = 2;
    this.singleQuote = false;
    this.trailingComma = 'none';
    this.bracketSpacing = true;
    this.jsxBracketSameLine = false;
    this.parser = 'babylon';
    this.askPrintWidth();
    this.askTabWidth();
    this.askSingleQuote();
    this.askTrailingComma();
    this.askBacketSpacing();
    this.askJsxBracketSameLine();
    this.askParser();
    this.createJson();
  }
  askPrintWidth() {
    console.log('Fit code within this line limit.');
    this.printWidth = readlineSync.questionInt(
      `Insert Print Width (default: ${this.printWidth}): `,
      {
        defaultInput: this.printWidth
      }
    );
    console.log('\n');
  }
  askTabWidth() {
    console.log('Number of spaces it should use per tab.');
    this.tabWidth = readlineSync.questionInt(
      `Insert Tab Width (default: ${this.tabWidth}): `,
      {
        defaultInput: this.tabWidth
      }
    );
    console.log('\n');
  }
  askSingleQuote() {
    console.log('If true, will use single instead of double quotes.');
    this.singleQuote = readlineSync.keyInYNStrict(
      `Want Single Quotes? (default: ${this.singleQuote}): `
    );
    console.log('\n');
  }
  askTrailingComma() {
    console.log('Controls the printing of trailing commas wherever possible.');
    const options = [
      'none - No trailing commas',
      'es5 - Trailing commas where valid in ES5 (objects, arrays, etc)',
      'all - Trailing commas wherever possible (function arguments)'
    ];
    const index = readlineSync.keyInSelect(
      options,
      `Which option you want? (default: ${this.trailingComma})`,
      {
        cancel: false
      }
    );
    switch (index) {
      case 0:
        this.trailingComma = 'none';
        break;
      case 1:
        this.trailingComma = 'es5';
        break;
      case 2:
        this.trailingComma = 'all';
        break;
      default:
        break;
    }
    console.log('\n');
  }
  askBacketSpacing() {
    console.log('Controls the printing of spaces inside object literals.');
    this.bracketSpacing = readlineSync.keyInYNStrict(
      `Want bracket spacing? (default: ${this.bracketSpacing}): `
    );
    console.log('\n');
  }
  askJsxBracketSameLine() {
    console.log(
      `If true, puts the '>' of a multi-line jsx element at the end of
    the last line instead of being alone on the next line.
    `
    );
    this.jsxBracketSameLine = readlineSync.keyInYNStrict(
      `Want '>' on the same line? (default: ${this.jsxBracketSameLine}): `
    );
    console.log('\n');
  }
  askParser() {
    console.log('Which parser to use.');
    const options = ['babylon', 'flow'];
    const index = readlineSync.keyInSelect(
      options,
      `Which option you want? (default: ${this.parser})`,
      {
        cancel: false
      }
    );
    this.parser = options[index];
    console.log('\n');
  }
  createJson() {
    const file = './prettierconfig.json';
    const configuration = {
      printWidth: this.printWidth,
      tabWidth: this.tabWidth,
      singleQuote: this.singleQuote,
      trailingComma: this.trailingComma,
      bracketSpacing: this.bracketSpacing,
      jsxBracketSameline: this.jsxBracketSameLine,
      parser: this.parser
    };
    jsonfile.writeFile(file, configuration, { spaces: 2 }, err => {
      if (err) console.error(err);
    });
  }
};
