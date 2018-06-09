#!/usr/bin/env node
var path = require('path')
var args = process.argv.splice(process.execArgv.length + 2)
var EvaluateProject = require('../src/EvaluateProject')
var myPath = path.resolve(__dirname, args[0])
console.log('path:', myPath)
console.log(EvaluateProject.getAllUnusedExports(myPath))
