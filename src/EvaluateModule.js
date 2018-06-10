const fs = require('fs')

const MapRequires = require('./MapRequires')
const FileUtils = require('./FileUtils')
const debug = require('debug')('unused-exports:evaluate-model')

function getUsedModuleVariable(requiresMap, moduleName) {
    let indexOfRequire = requiresMap.map(entry => entry.module).indexOf(moduleName)
    if (indexOfRequire > -1) {
        return requiresMap[indexOfRequire].variable
    } else {
        debug('Failed to get used module variable', requiresMap, moduleName)
        throw new Error('Failed to get used module variable')
    }
}

function isMethodUsed(userModule, variableName, methodName) {
    let fileContent = fs.readFileSync(userModule, 'utf8')
    return fileContent.includes(`${variableName}.${methodName}`) || fileContent.includes(`${variableName}['${methodName}']`) || fileContent.includes(`${variableName}["${methodName}"]`)
}

function getModuleUsedExportsByModule(userModulePath, usedModulePath) {
    debug('UserModulePath', userModulePath)
    debug('UsedModulePath', usedModulePath)
    let requiresMap = MapRequires(userModulePath)
    let usedVariable = getUsedModuleVariable(requiresMap, FileUtils.getFileNameFromPath(usedModulePath))
    let moduleExports = FileUtils.getListOfExports(usedModulePath)
    return moduleExports.filter(exp => isMethodUsed(userModulePath, usedVariable, exp))
}

function isModuleBeingUsedByModule(usedModulePath, userModulePath) {
    let requiresMap = MapRequires(userModulePath)
    let usedModuleFileName = FileUtils.getFileNameFromPath(usedModulePath)
    return requiresMap.map(entry => entry.module).indexOf(usedModuleFileName) > -1
}

module.exports = {
    getModuleUsedExportsByModule,
    isModuleBeingUsedByModule
}
