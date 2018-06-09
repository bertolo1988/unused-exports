const fs = require('fs')
const path = require('path')

// recursively list all files and filter them by termination
function getAllFiles(dir, fileExtension) {
    return fs.readdirSync(dir).reduce((files, file) => {
        const name = path.join(dir, file)
        const isDirectory = fs.statSync(name).isDirectory()
        const isTargetFile = file.endsWith(fileExtension)
        return isDirectory ? [...files, ...getAllFiles(name, fileExtension)] : isTargetFile ? [...files, name] : [...files]
    }, [])
}

// extracts filename from a path
function getFileNameFromPath(myPath) {
    function stripFileExtension(fileName) {
        return fileName.replace(/\.[^/.]+$/, '')
    }
    return stripFileExtension(myPath.replace(/^.*[\\/]/, ''))
}

function getListOfExports(myModulePath) {
    let myModule = require(myModulePath)
    return Object.keys(myModule)
}

module.exports = {
    getAllFiles,
    getFileNameFromPath,
    getListOfExports
}