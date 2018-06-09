const fs = require('fs')

const MapRequires = require('./MapRequires')
const FileUtils = require('./FileUtils')

function getUsedModuleVariable(requiresMap, moduleName) {
    let indexOfRequire = requiresMap.map(entry => entry.module).indexOf(moduleName)
    return requiresMap[indexOfRequire].variable
}

function isMethodUsed(userModule, variableName, methodName) {
    let fileContent = fs.readFileSync(userModule, 'utf8')
    return fileContent.includes(`${variableName}.${methodName}`) || fileContent.includes(`${variableName}['${methodName}']`) || fileContent.includes(`${variableName}["${methodName}"]`)
}

function getModuleUsedExportsByModule(userModulePath, usedModulePath) {
    let requiresMap = MapRequires(userModulePath)
    let usedVariable = getUsedModuleVariable(requiresMap, FileUtils.getFileNameFromPath(usedModulePath))
    let moduleExports = FileUtils.getListOfExports(usedModulePath)
    return moduleExports.filter(exp => isMethodUsed(userModulePath, usedVariable, exp))
}

function isModuleBeingUsedByModule(userModulePath, usedModulePath) {
    let fileContent = fs.readFileSync(userModulePath, 'utf8')
    let regex = new RegExp(FileUtils.getFileNameFromPath(usedModulePath), 'g')
    let count = (fileContent.match(regex) || []).length
    return count > 0
}

module.exports = {
    getModuleUsedExportsByModule,
    isModuleBeingUsedByModule
}
