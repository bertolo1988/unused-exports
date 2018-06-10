const _ = require('lodash')

const FileUtils = require('./FileUtils')
const EvaluateModule = require('./EvaluateModule')
const debug = require('debug')('unused-exports:evaluate-project')

function flattenArray(myArray) {
    return myArray.reduce((acc, val) => acc.concat(val), [])
}

function getModuleUsedExports(projectPath, modulePath, ignore) {
    let files = FileUtils.getAllFiles(projectPath, '.js', ignore)
    let usedExports = []
    for (let file of files) {
        if (EvaluateModule.isModuleBeingUsedByModule(modulePath, file)) {
            debug('File: ', modulePath, ' is being used by: ', file)
            usedExports.push(EvaluateModule.getModuleUsedExportsByModule(file, modulePath))
        }
    }
    return [...new Set(flattenArray(usedExports))]
}

function getModuleUnusedExports(projectPath, modulePath, ignore) {
    let usedExports = getModuleUsedExports(projectPath, modulePath, ignore)
    return _.difference(FileUtils.getListOfNamedExports(modulePath), usedExports)
}

function getAllUnusedExports(projectPath, ignore) {
    let files = FileUtils.getAllFiles(projectPath, '.js', ignore)
    debug('All files: ', files)
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