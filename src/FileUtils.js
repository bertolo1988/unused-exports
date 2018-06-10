const fs = require('fs')
const path = require('path')
const isPathInside = require('is-path-inside')
const debug = require('debug')('unused-exports:file-utils')

function isPathInsideIgnore(myFile, ignore) {
    if (Array.isArray(ignore)) {
        for (let entry of ignore) {
            if (isPathInside(myFile, entry) || myFile === entry) {
                return true
            }
        }
        return false
    } else {
        return isPathInside(myFile, ignore) || myFile === ignore
    }
}

function isIgnored(myFile, ignore) {
    return ignore && isPathInsideIgnore(myFile, ignore)
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

function getListOfNamedExports(myModulePath) {
    try {
        let myModule = require(myModulePath)
        if (typeof myModule === 'object' && !Array.isArray(myModule)) {
            return Object.keys(myModule)
        } else {
            return []
        }
    } catch (err) {
        debug('Failed to list exports!', err)
        return []
    }
}

module.exports = {
    getAllFiles,
    getFileNameFromPath,
    getListOfNamedExports
}