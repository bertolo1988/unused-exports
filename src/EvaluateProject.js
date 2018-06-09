const _ = require('lodash')

const FileUtils = require('./FileUtils')
const EvaluateModule = require('./EvaluateModule')

function flattenArray(myArray) {
    return myArray.reduce((acc, val) => acc.concat(val), [])
}

function getModuleUsedExports(projectPath, modulePath) {
    let files = FileUtils.getAllFiles(projectPath, '.js')
    let usedExports = []
    for (let file of files) {
        if (EvaluateModule.isModuleBeingUsedByModule(file, FileUtils.getFileNameFromPath(modulePath))) {
            usedExports.push(EvaluateModule.getModuleUsedExportsByModule(file, modulePath))
        }
    }
    return [...new Set(flattenArray(usedExports))]
}

function isModuleUsed(projectPath, modulePath) {
    let myModuleName = FileUtils.getFileNameFromPath(modulePath)
    let files = FileUtils.getAllFiles(projectPath, '.js').filter(filePath => EvaluateModule.isModuleBeingUsedByModule(filePath, myModuleName))
    return files.length > 0
}

function getModuleUnusedExports(projectPath, modulePath) {
    let usedExports = getModuleUsedExports(projectPath, modulePath)
    return _.difference(FileUtils.getListOfExports(modulePath), usedExports)
}

function getAllUnusedExports(projectPath) {
    let files = FileUtils.getAllFiles(projectPath, '.js')
    let unusedExports = []
    for (let file of files) {
        unusedExports.push({ file, unusedExports: getModuleUnusedExports(projectPath, file) })
    }
    return unusedExports.filter(entry => entry.unusedExports.length > 0)
}

module.exports = {
    isModuleUsed,
    getModuleUsedExports,
    getModuleUnusedExports,
    getAllUnusedExports
}