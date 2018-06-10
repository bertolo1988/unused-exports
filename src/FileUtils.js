const fs = require('fs')
const path = require('path')
const isPathInside = require('is-path-inside')
const debug = require('debug')('unused-exports:file-utils')

function isIgnored(myFile, ignore) {
    return ignore && (isPathInside(myFile, ignore) || myFile === ignore)
}

// recursively list all files and filter them by termination
function getAllFiles(dir, fileExtension, ignore) {
    if (!fs.lstatSync(dir).isDirectory()) {
        throw new Error('Path must point to a directory')
    }
    return fs.readdirSync(dir).reduce((files, file) => {
        const name = path.join(dir, file)
        const isDirectory = fs.statSync(name).isDirectory()
        const isFileIgnored = isIgnored(path.join(dir, file), ignore)
        if (isDirectory && !isFileIgnored) {
            return [...files, ...getAllFiles(name, fileExtension, ignore)]
        } else {
            const isTargetFile = file.endsWith(fileExtension)
            return isTargetFile && !isFileIgnored ? [...files, name] : [...files]
        }
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
    try {
        let myModule = require(myModulePath)
        return Object.keys(myModule)
    } catch (err) {
        debug('Failed to list exports!', err)
        return []
    }
}

module.exports = {
    getAllFiles,
    getFileNameFromPath,
    getListOfExports
}