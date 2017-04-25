#! /usr/bin/env node

const program = require('commander')
const PrettierRator = require('../src')

program
  .version('0.1.2')
  .option('-c, --create [editor]', 'Create configuration files for all editors or the ones you want')

program.on('--help', function() {
  console.log('  [editor] parameters could be: \n')
  console.log('    * General API:                  $ prettier-rator -c api \n')
  console.log('    * Sublime Text:                 $ prettier-rator -c st \n')
  console.log('    * Visual Studio Code:           $ prettier-rator -c vsc \n')
  console.log('    * All editors + General API:    $ prettier-rator -c \n')
})

program.parse(process.argv)

if (program.create) {
  new PrettierRator(program.create)
}
