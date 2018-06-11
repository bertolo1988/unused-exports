#!/usr/bin/env node
/* eslint no-console:off */
const debug = require('debug')('unused-exports:cli')
const path = require('path')
const chalk = require('chalk')
const EvaluateProject = require('../src/EvaluateProject')

let pathValue = process.env.PWD
let ignoreValue
let pathIndex = process.argv.indexOf('--path')
let ignoreIndex = process.argv.indexOf('--ignore')

if (pathIndex > -1) {
    pathValue = path.join(process.env.PWD, process.argv[pathIndex + 1])
}
if (ignoreIndex > -1) {
    ignoreValue = path.join(process.env.PWD, process.argv[ignoreIndex + 1])
}

debug('path:', pathValue)
debug('ignore:', ignoreValue)

function printResults(results) {
    if (results && results.length > 0) {
        for (let entry of results) {
            console.log('\nFile:\t', chalk.red.bold(entry.file))
            console.log('Unused exports:')
            for (let exp of entry.unusedExports) {
                console.log('\t', chalk.blue(exp))
            }
            console.log('')
        }
        console.log(chalk.red.bold(`${results.length} modules have unused exports!`))
    } else {
        console.log(chalk.green('No unused exports found!'))
    }
}

let result = EvaluateProject.getAllUnusedExports(pathValue, ignoreValue)
printResults(result)