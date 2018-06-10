const should = require('should')
const path = require('path')

const FileUtils = require('../src/FileUtils')

describe('FileUtils', function() {
    describe('getAllFiles', () => {
        it('should list all .js files on sample project', () => {
            let projectPath = path.join(__dirname, '../sample-project')
            let allFiles = FileUtils.getAllFiles(projectPath, '.js')
            const expectedResult = [
                path.join(__dirname, '../sample-project/ModuleExample1.js'),
                path.join(__dirname, '../sample-project/../sample-project/UnusedModule1.js'),
                path.join(__dirname, '../sample-project/folder1/ModuleExample2.js'),
                path.join(__dirname, '../sample-project/folder1/folder2/ModuleExample3.js'),
                path.join(__dirname, '../sample-project/folder1/folder2/ModuleExample4.js'),
                path.join(__dirname, '../sample-project/folder1/folder2/UnusedModule2.js')]
            allFiles.should.be.eql(expectedResult)
        })

        it('should give an error when trying to list files on non directory', () => {
            let projectPath = path.join(__dirname, '../sample-project/folder1/folder2/ModuleExample4.js')
            should(function() { FileUtils.getAllFiles(projectPath, '.js') })
                .throw('Path must point to a directory')
        })

        it('should list no files with .xs file extension', () => {
            let projectPath = path.join(__dirname, '../sample-project')
            let allFiles = FileUtils.getAllFiles(projectPath, '.xs')
            allFiles.length.should.be.eql(0)
        })

        it('should list files with .js extension but ignore a specific folder', () => {
            let projectPath = path.join(__dirname, '../sample-project')
            let ignore = path.join(__dirname, '../sample-project/folder1/folder2')
            let allFiles = FileUtils.getAllFiles(projectPath, '.js', ignore)
            const expectedResult = [
                path.join(__dirname, '../sample-project/ModuleExample1.js'),
                path.join(__dirname, '../sample-project/../sample-project/UnusedModule1.js'),
                path.join(__dirname, '../sample-project/folder1/ModuleExample2.js')]
            allFiles.should.be.eql(expectedResult)
        })

        it('should list files with .js extension but ignore a specific file', () => {
            let projectPath = path.join(__dirname, '../sample-project')
            let ignore = path.join(__dirname, '../sample-project/folder1/folder2/ModuleExample4.js')
            let allFiles = FileUtils.getAllFiles(projectPath, '.js', ignore)
            const expectedResult = [
                path.join(__dirname, '../sample-project/ModuleExample1.js'),
                path.join(__dirname, '../sample-project/../sample-project/UnusedModule1.js'),
                path.join(__dirname, '../sample-project/folder1/ModuleExample2.js'),
                path.join(__dirname, '../sample-project/folder1/folder2/ModuleExample3.js'),
                path.join(__dirname, '../sample-project/folder1/folder2/UnusedModule2.js')]
            allFiles.should.be.eql(expectedResult)

        })

        it('should list files with .js extension but ignore his own path', () => {
            let projectPath = path.join(__dirname, '../sample-project')
            let ignore = path.join(__dirname, '../sample-project')
            let allFiles = FileUtils.getAllFiles(projectPath, '.js', ignore)
            allFiles.length.should.be.eql(0)
        })

        it('should list files with .js extension but ignore an array of paths', () => {
            let projectPath = path.join(__dirname, '../sample-project')
            let ignore = [
                path.join(__dirname, '../sample-project/folder1/folder2'),
                path.join(__dirname, '../sample-project/ModuleExample1.js')]
            let allFiles = FileUtils.getAllFiles(projectPath, '.js', ignore)
            const expectedResult = [
                path.join(__dirname, '../sample-project/../sample-project/UnusedModule1.js'),
                path.join(__dirname, '../sample-project/folder1/ModuleExample2.js')]
            allFiles.should.be.eql(expectedResult)
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

    describe.only('getListOfNamedExports', () => {
        it('should get UnusedModule1.js list of exports', () => {
            let filePath = path.join(__dirname, '../sample-project/UnusedModule1')
            let exportsList = FileUtils.getListOfNamedExports(filePath)
            exportsList.should.be.eql(['lmao', 'aaa'])
        })

        it('should get package-lock.json list of exports lol', () => {
            let filePath = path.join(__dirname, '../package-lock.json')
            let exportsList = FileUtils.getListOfNamedExports(filePath)
            exportsList.should.be.eql(['name',
                'version',
                'lockfileVersion',
                'requires',
                'dependencies'])
        })

        it('should get ModuleExample1.js list of exports', () => {
            let filePath = path.join(__dirname, '../sample-project/ModuleExample1')
            let exportsList = FileUtils.getListOfNamedExports(filePath)
            exportsList.should.be.eql(['bb', 'aa', 'jjj'])
        })

        it('should get FunctionModule.js list of exports', () => {
            let filePath = path.join(__dirname, '../sample-project/FunctionModule')
            let exportsList = FileUtils.getListOfNamedExports(filePath)
            exportsList.should.be.eql([])
        })

        it('should get ArrayModule.js list of exports', () => {
            let filePath = path.join(__dirname, '../sample-project/ArrayModule')
            let exportsList = FileUtils.getListOfNamedExports(filePath)
            exportsList.should.be.eql([])
        })
    })
})
