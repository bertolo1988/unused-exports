#!/usr/bin/env node
/* eslint no-console:off */
const debug = require('debug')('unused-exports:cli')
const path = require('path')
const EvaluateProject = require('../src/EvaluateProject')

let pathValue = process.env.PWD
let ignoreValue
let pathIndex = process.argv.indexOf('--path')
let ignoreIndex = process.argv.indexOf('--ignore')

if (pathIndex > -1) {
    pathValue = path.join(process.env.PWD, process.argv[pathIndex + 1])
}
if (ignoreIndex > -1) {
    ignoreValue = process.argv[ignoreIndex + 1]
}

debug('path:', pathValue)
debug('ignore:', ignoreValue)

console.log(EvaluateProject.getAllUnusedExports(pathValue, ignoreValue))
