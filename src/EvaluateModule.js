const fs = require('fs')
const debug = require('debug')('unused-exports:evaluate-model')

const MapRequires = require('./MapRequires')
const FileUtils = require('./FileUtils')

function getUsedModuleVariable(requiresMap, moduleName) {
    let indexOfRequire = requiresMap.map(entry => entry.module).indexOf(moduleName)
    if (indexOfRequire > -1) {
        return requiresMap[indexOfRequire].variable
    } else {
        debug('Failed to get used module variable %O for module %s', requiresMap, moduleName)
        throw new Error('Failed to get used module variable')
    }
}

function isMethodUsed(userModule, variableName, methodName) {
    let fileContent = fs.readFileSync(userModule, 'utf8')
    return fileContent.includes(`${variableName}.${methodName}`) || fileContent.includes(`${variableName}['${methodName}']`) || fileContent.includes(`${variableName}["${methodName}"]`)
}

/**
 * Returns which exported methods from usedModule are being used by userModule
 * @param {*} userModulePath - 
 * @param {*} usedModulePath 
 * @returns One 
 */
function getModuleUsedExportsByModule(userModulePath, usedModulePath) {
    if (isModuleBeingUsedByModule(usedModulePath, userModulePath)) {
        debug('File: %s is being used by: %s', usedModulePath, userModulePath)
        let requiresMap = MapRequires(userModulePath)
        let usedVariable = getUsedModuleVariable(requiresMap, FileUtils.getFileNameFromPath(usedModulePath))
        let moduleExports = FileUtils.getListOfNamedExports(usedModulePath)
        let result = moduleExports.filter(exp => isMethodUsed(userModulePath, usedVariable, exp))
        debug('Following methods: %O from %s are being used by %s', result, usedModulePath, userModulePath)
        return result
    }
    else { return [] }
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
