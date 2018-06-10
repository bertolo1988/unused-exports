#!/usr/bin/env node
/* eslint no-console:off */
const path = require('path')
const EvaluateProject = require('../src/EvaluateProject')

let pathIndex = (process.argv.indexOf("--path") > -1)
let ignore = (process.argv.indexOf("--ignore") > -1)



console.log(myPath)
console.log(EvaluateProject.getAllUnusedExports(myPath))


// ignore path flag