const fs = require('fs')
const debug = require('debug')('unused-exports:map-requires')

function getRequireIndex(fileContent) {
    let regex = new RegExp('require', 'g')
    let matchIndexes = []
    let result
    while ((result = regex.exec(fileContent))) {
        matchIndexes.push(result.index)
    }
    return matchIndexes
}

function getFileNameFromPath(myPath) {
    return myPath.replace(/^.*[\\/]/, '')
}

function getRequireVariable(fileContent, index) {
    let assignIndex = 0
    for (let i = index; i > 0; i--) {
        if (fileContent[i] === ':' || fileContent[i] === '=') {
            assignIndex = i
            break
        }
    }
    let stringBeforeAssign = fileContent.substring(0, assignIndex)
    let variableName = stringBeforeAssign.split(' ').filter(str => str.length > 0).pop()
    // if it starts with } it means no package variable is used and methods are used directly
    return variableName && variableName.startsWith('}') ? undefined : variableName
}

function replaceAll(str, find, replace) {
    return str.replace(new RegExp(find, 'g'), replace)
}

function getRequireModule(fileContent, index) {
    let afterString = fileContent.substring(index + ('require'.length + 1), fileContent.length - 1)
    let requirePath = afterString.split(')')[0]
    requirePath = replaceAll(requirePath, '\'', '')
    requirePath = replaceAll(requirePath, '"', '')
    return getFileNameFromPath(requirePath)
}

function mapRequires(modulePath) {
    let fileContent = fs.readFileSync(modulePath, 'utf8')
    let matchIndexes = getRequireIndex(fileContent)
    let result = []
    for (let index of matchIndexes) {
        result.push({
            variable: getRequireVariable(fileContent, index),
            module: getRequireModule(fileContent, index)
        })
    }
    debug('Module: %s mapped requires %O', modulePath, result)
    return result
}

module.exports = mapRequires