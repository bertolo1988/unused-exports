require('should')
const path = require('path')

const FileUtils = require('../src/FileUtils')

describe('FileUtils', function() {
    describe('getAllFiles', () => {
        it('should list all .js files on sample project', () => {
            let projectPath = path.join(__dirname, '../sample-project')
            let allFiles = FileUtils.getAllFiles(projectPath, '.js')
            allFiles.length.should.be.eql(6)
        })
        it('should list no files with .xs file extension', () => {
            let projectPath = path.join(__dirname, '../sample-project')
            let allFiles = FileUtils.getAllFiles(projectPath, '.xs')
            allFiles.length.should.be.eql(0)
        })
    })
    describe('getFileNameFromPath', () => {
        it('should get UnusedModule1.js file name without extension', () => {
            let filePath = path.join(__dirname, '../sample-project/UnusedModule1')
            let fileName = FileUtils.getFileNameFromPath(filePath)
            fileName.should.be.eql('UnusedModule1')
        })

        it('should get package-lock.json file name without extension', () => {
            let filePath = path.join(__dirname, '../package-lock.json')
            let fileName = FileUtils.getFileNameFromPath(filePath)
            fileName.should.be.eql('package-lock')
        })

        it('should get the filename of a MapRequires without extension', () => {
            let filePath = path.join(__dirname, './MapRequires.spec.js')
            let fileName = FileUtils.getFileNameFromPath(filePath)
            fileName.should.be.eql('MapRequires.spec')
        })
    })
    describe('getListOfExports', () => {
        it('should get UnusedModule1.js list of exports', () => {
            let filePath = path.join(__dirname, '../sample-project/UnusedModule1')
            let exportsList = FileUtils.getListOfExports(filePath)
            exportsList.should.be.eql(['lmao', 'aaa'])
        })

        it('should get package-lock.json list of exports lol', () => {
            let filePath = path.join(__dirname, '../package-lock.json')
            let exportsList = FileUtils.getListOfExports(filePath)
            exportsList.should.be.eql(['name',
                'version',
                'lockfileVersion',
                'requires',
                'dependencies'])
        })

        it('should get ModuleExample1.js list of exports', () => {
            let filePath = path.join(__dirname, '../sample-project/ModuleExample1')
            let exportsList = FileUtils.getListOfExports(filePath)
            exportsList.should.be.eql(['bb', 'aa', 'jjj'])
        })
    })
})