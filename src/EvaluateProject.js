const _ = require('lodash')
const debug = require('debug')('unused-exports:evaluate-project')

const FileUtils = require('./FileUtils')
const EvaluateModule = require('./EvaluateModule')

function flattenArray(myArray) {
    return myArray.reduce((acc, val) => acc.concat(val), [])
}

function getModuleUsedExports(projectPath, modulePath, ignore) {
    let files = FileUtils.getAllFiles(projectPath, '.js', ignore)
    let usedExports = []
    for (let file of files) {
        usedExports.push(EvaluateModule.getModuleUsedExportsByModule(file, modulePath))
    }
    return [...new Set(flattenArray(usedExports))]
}

function getModuleUnusedExports(projectPath, modulePath, ignore) {
    let usedExports = getModuleUsedExports(projectPath, modulePath, ignore)
    return _.difference(FileUtils.getListOfNamedExports(modulePath), usedExports)
}

function getAllUnusedExports(projectPath, ignore) {
    let files = FileUtils.getAllFiles(projectPath, '.js', ignore)
    debug('All files: %O', files)
    let unusedExports = []
    for (let file of files) {
        unusedExports.push({ file, unusedExports: getModuleUnusedExports(projectPath, file, ignore) })
    }
    return unusedExports.filter(entry => entry.unusedExports.length > 0)
}

module.exports = {
    getModuleUnusedExports,
    getAllUnusedExports
}