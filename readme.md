# [![prettierRATOR](media/logo.png)](https://github.com/Fenwil/prettierRATOR)

> CLI to generate a Prettier file config for each text editor plugin

## Why?
There's no prettier config file (like .eslintrc) to share along your team or your text editors

## How?
Just insert your custom parameters and it will generate a file for each text editor (plugin) and a general config file:
* [General Configuration (matching the official API)](https://github.com/prettier/prettier#api)
* [Visual Studio Code (prettier-vscode)](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
* [Sublime Text (JsPrettier)](https://packagecontrol.io/packages/JsPrettier)
* And more to come...

## What?
I saw an early and big adoption and wanted to make it more accessible and easy to use

## Install
```bash
$ npm install --global prettier-rator
```

## Usage
Go to your project folder and run

```
  $ prettier-rator
```

Your configuration files will be generated under the `configs` folder
  * General Configuration (API): `prettierconfig.json`
  * Sublime Text: `JsPrettier.sublime-settings`
  * Visual Studio Code: `settings.json`

## NPM Dependencies
* readline-sync
* jsonfile
* chalk

## License
MIT
