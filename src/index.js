const readlineSync = require('readline-sync')
const jsonfile = require('jsonfile')
const chalk = require('chalk')
const path = require('path')
const fs = require('fs')
const log = console.log
jsonfile.spaces = 2

module.exports = class PrettierRator {
  constructor(editorName) {
    // Default values do no touch ! (unless they change on the documentation)
    this.config = {
      useTabs: false,
      printWidth: 80,
      tabWidth: 2,
      singleQuote: false,
      trailingComma: 'none',
      bracketSpacing: true,
      jsxBracketSameLine: false,
      parser: 'babylon',
      semi: false
    }
    // Current path name for letting know the user where to find the files
    this.currentPath = path.resolve('./')
    // Folder name where config files will be saved
    this.configFolderPath = './configs'
    // File paths for each text editor new config file
    this.sublimeTextConfigPath = `${this.configFolderPath}/JsPrettier.sublime-settings`
    this.visualStudioCodeConfigPath = `${this.configFolderPath}/settings.json`
    this.generalConfigPath = `${this.configFolderPath}/prettierconfig.json`
    // Create config for each text editor
    switch (editorName) {
      case true:
        this.askAll()
        this.createAllConfigs()
        return
      case 'api':
        this.askAll()
        this.createGeneralConfig()
        return
      case 'st':
        this.askAll()
        this.createSublimeTextConfig()
        return
      case 'vsc':
        this.askAll()
        this.createVisualStudioCodeConfig()
        return
      default:
        return
    }
  }

  askTabs() {
    log(chalk.dim('Indent lines with tabs. \n'))
    this.config.useTabs = readlineSync.keyInYNStrict(`Want to use tabs? (default: ${this.config.useTabs}): `)
  }

  askPrintWidth() {
    log(chalk.dim('Fit code within this line limit. \n'))
    this.config.printWidth = readlineSync.questionInt(`Insert Print Width (default: ${this.config.printWidth}): `, {
      defaultInput: this.config.printWidth
    })
  }

  askTabWidth() {
    log(chalk.dim('Number of spaces it should use per tab. \n'))
    this.config.tabWidth = readlineSync.questionInt(`Insert Tab Width (default: ${this.config.tabWidth}): `, {
      defaultInput: this.config.tabWidth
    })
  }

  askSingleQuote() {
    log(chalk.dim('If true, will use single instead of double quotes. \n'))
    this.config.singleQuote = readlineSync.keyInYNStrict(`Want Single Quotes? (default: ${this.config.singleQuote}): `)
  }

  askTrailingComma() {
    log(chalk.dim('Controls the printing of trailing commas wherever possible.'))
    log(chalk.dim('Options below is only available in 0.19.0 and above. Previously this was a boolean argument.'))
    const options = [
      'none - No trailing commas',
      'es5 - Trailing commas where valid in ES5 (objects, arrays, etc)',
      'all - Trailing commas wherever possible (function arguments)'
    ]
    const index = readlineSync.keyInSelect(options, `Which option you want? (default: ${this.config.trailingComma})`, {
      cancel: false
    })
    switch (index) {
      case 0:
        this.config.trailingComma = 'none'
        break
      case 1:
        this.config.trailingComma = 'es5'
        break
      case 2:
        this.config.trailingComma = 'all'
        break
      default:
        break
    }
  }

  askBacketSpacing() {
    log(chalk.dim('Controls the printing of spaces inside object literals. \n'))
    this.config.bracketSpacing = readlineSync.keyInYNStrict(
      `Want bracket spacing? (default: ${this.config.bracketSpacing}): `
    )
  }

  askJSXBracketSameLine() {
    log(
      chalk.dim(
        `If true, puts the '>' of a multi-line jsx element at the end of 
the last line instead of being alone on the next line.
    `
      )
    )
    this.config.jsxBracketSameLine = readlineSync.keyInYNStrict(
      `Want '>' on the same line? (default: ${this.config.jsxBracketSameLine}): `
    )
  }

  askParser() {
    log(chalk.dim('Which parser to use.'))
    const options = ['babylon (default)', 'flow']
    const index = readlineSync.keyInSelect(options, `Which option you want? (default: ${this.config.parser})`, {
      cancel: false
    })
    this.config.parser = options[index]
  }

  askSemi() {
    log(chalk.dim('Whether to add a semicolon at the end of every line. \n'))
    this.config.semi = readlineSync.keyInYNStrict(`Want bracket spacing? (default: ${this.config.semi}): `)
  }

  askAll() {
    this.askTabs()
    log(chalk.bold.yellow('\n------------------------------------------------------------------------ \n'))
    this.askPrintWidth()
    log(chalk.bold.yellow('\n------------------------------------------------------------------------ \n'))
    this.askTabWidth()
    log(chalk.bold.yellow('\n------------------------------------------------------------------------ \n'))
    this.askSingleQuote()
    log(chalk.bold.yellow('\n------------------------------------------------------------------------ \n'))
    this.askTrailingComma()
    log(chalk.bold.yellow('\n------------------------------------------------------------------------ \n'))
    this.askBacketSpacing()
    log(chalk.bold.yellow('\n------------------------------------------------------------------------ \n'))
    this.askJSXBracketSameLine()
    log(chalk.bold.yellow('\n------------------------------------------------------------------------ \n'))
    this.askParser()
    log(chalk.bold.yellow('\n------------------------------------------------------------------------ \n'))
    this.askSemi()
    log(chalk.bold.yellow('\n------------------------------------------------------------------------ \n'))
  }

  createFolder() {
    if (!fs.existsSync(this.configFolderPath)) {
      fs.mkdirSync(this.configFolderPath)
    }
  }

  createGeneralConfig() {
    this.createFolder()
    const generalConfig = {
      useTabs: this.config.useTabs,
      printWidth: this.config.printWidth,
      tabWidth: this.config.tabWidth,
      singleQuote: this.config.singleQuote,
      trailingComma: this.config.trailingComma,
      bracketSpacing: this.config.bracketSpacing,
      parser: this.config.parser,
      semi: this.config.semi
    }
    try {
      jsonfile.writeFileSync(this.generalConfigPath, generalConfig)
      log(chalk.underline.green('Prettier General config generated!'))
      log(`Find it in: ${this.currentPath + this.generalConfigPath.replace('.', '')} \n`)
    } catch (err) {
      log(chalk.red(err))
    }
  }

  createSublimeTextConfig() {
    this.createFolder()
    const sublimeTextConfig = {
      prettier_cli_path: '',
      auto_format_on_save: false,
      allow_inline_formatting: false,
      prettier_options: this.config
    }
    try {
      jsonfile.writeFileSync(this.sublimeTextConfigPath, sublimeTextConfig)
      log(chalk.underline.green('Sublime Text config generated!'))
      log(`Find it in: ${this.currentPath + this.sublimeTextConfigPath.replace('.', '')} \n`)
    } catch (err) {
      log(chalk.red(err))
    }
  }

  createVisualStudioCodeConfig() {
    this.createFolder()
    const visualStudioCodeConfig = {
      'prettier.useTabs': this.config.useTabs,
      'prettier.printWidth': this.config.printWidth,
      'prettier.tabWidth': this.config.tabWidth,
      'prettier.singleQuote': this.config.singleQuote,
      'prettier.trailingComma': this.config.trailingComma,
      'prettier.bracketSpacing': this.config.bracketSpacing,
      'prettier.parser': this.config.parser,
      'prettier.semi': this.config.semi
    }
    try {
      jsonfile.writeFileSync(this.visualStudioCodeConfigPath, visualStudioCodeConfig)
      log(chalk.underline.green('Visual Studio Code config generated!'))
      log(`Find it in: ${this.currentPath + this.visualStudioCodeConfigPath.replace('.', '')} \n`)
    } catch (err) {
      log(chalk.red(err))
    }
  }

  createAllConfigs() {
    this.createFolder()
    this.createGeneralConfig()
    this.createSublimeTextConfig()
    this.createVisualStudioCodeConfig()
  }
}
