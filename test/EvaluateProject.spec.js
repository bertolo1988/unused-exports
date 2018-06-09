
require('should')
const path = require('path')

const FileUtils = require('../src/FileUtils')
const EvaluateProject = require('../src/EvaluateProject')
const projectPath = path.join(__dirname, '../sample-project')

describe('EvaluateProject', function() {
    describe('getModuleUsedExports', () => {
        it('should successfully retrieve all exports used on ModuleExample2', () => {
            let modulePath = path.join(__dirname, '../sample-project/folder1/ModuleExample2')
            let usedExports = EvaluateProject.getModuleUsedExports(projectPath, modulePath)
            usedExports.should.be.eql(['aa', 'bb', 'cc', 'dd'])
        })

        it('should successfully get used exports on ModuleExample1', () => {
            let modulePath = path.join(__dirname, '../sample-project/ModuleExample1')
            let usedExports = EvaluateProject.getModuleUsedExports(projectPath, modulePath)
            usedExports.should.be.eql(['bb', 'aa'])
        })

        it('should successfully get no used exports on UnusedModule1', () => {
            let modulePath = path.join(__dirname, '../sample-project/UnusedModule1')
            let usedExports = EvaluateProject.getModuleUsedExports(projectPath, modulePath)
            usedExports.should.be.eql([])
        })
    })

    describe('isModuleUsed', () => {
        it('should successfully confirm that ModuleExample1 is being used', () => {
            let modulePath = path.join(__dirname, '../sample-project/ModuleExample1')
            let result = EvaluateProject.isModuleUsed(projectPath, modulePath)
            result.should.be.true()
        })

        it('should successfully check that ModuleExample3 is not being used', () => {
            let modulePath = path.join(__dirname, '../sample-project/folder1/folder2/ModuleExample3')
            let result = EvaluateProject.isModuleUsed(projectPath, modulePath)
            result.should.be.false()
        })

        it('should successfully check that UnusedModule2 is not being used', () => {
            let modulePath = path.join(__dirname, '../sample-project/folder1/folder2/ModuleExample3')
            let result = EvaluateProject.isModuleUsed(projectPath, modulePath)
            result.should.be.false()
        })
    })

    describe('getModuleUnusedExports', () => {
        it('should successfully retrieve all unused exports on ModuleExample2', () => {
            let modulePath = path.join(__dirname, '../sample-project/folder1/ModuleExample2')
            let usedExports = EvaluateProject.getModuleUnusedExports(projectPath, modulePath)
            usedExports.should.be.eql(['ee'])
        })

        it('should successfully get unused exports on ModuleExample1', () => {
            let modulePath = path.join(__dirname, '../sample-project/ModuleExample1')
            let usedExports = EvaluateProject.getModuleUnusedExports(projectPath, modulePath)
            usedExports.should.be.eql(['jjj'])
        })

        it('should successfully get unused exports on UnusedModule1', () => {
            let modulePath = path.join(__dirname, '../sample-project/UnusedModule1')
            let usedExports = EvaluateProject.getModuleUnusedExports(projectPath, modulePath)
            usedExports.should.be.eql(['lmao', 'aaa'])
        })
    })
    describe('getAllUnusedExports', () => {
        it('should retrieve all unused exports by all files in sample project', () => {
            let unusedExports = EvaluateProject.getAllUnusedExports(projectPath)
            const expectedResult = [
                { file: path.join(__dirname, '../sample-project/ModuleExample1.js'), unusedExports: ['jjj'] },
                { file: path.join(__dirname, '../sample-project/UnusedModule1.js'), unusedExports: ['lmao', 'aaa'] },
                { file: path.join(__dirname, '../sample-project/folder1/ModuleExample2.js'), unusedExports: ['ee'] },
                { file: path.join(__dirname, '../sample-project/folder1/folder2/UnusedModule2.js'), unusedExports: ['lol'] }]
            unusedExports.should.be.eql(expectedResult)
        })
    })
})
