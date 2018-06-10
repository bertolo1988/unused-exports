
require('should')
const path = require('path')

const EvaluateProject = require('../src/EvaluateProject')
const projectPath = path.join(__dirname, '../sample-project')

describe('EvaluateProject', function() {
    describe('getModuleUnusedExports', () => {
        it('should successfully retrieve all unused exports on ModuleExample2', () => {
            let modulePath = path.join(__dirname, '../sample-project/folder1/ModuleExample2')
            let unusedExports = EvaluateProject.getModuleUnusedExports(projectPath, modulePath)
            unusedExports.should.be.eql(['ee'])
        })

        it('should successfully get unused exports on ModuleExample1', () => {
            let modulePath = path.join(__dirname, '../sample-project/ModuleExample1')
            let unusedExports = EvaluateProject.getModuleUnusedExports(projectPath, modulePath)
            unusedExports.should.be.eql(['jjj'])
        })

        it('should successfully get unused exports on UnusedModule1', () => {
            let modulePath = path.join(__dirname, '../sample-project/UnusedModule1')
            let unusedExports = EvaluateProject.getModuleUnusedExports(projectPath, modulePath)
            unusedExports.should.be.eql(['lmao', 'aaa'])
        })

        it('should successfully get unused exports on ModuleExample2 while ignoring folder2', () => {
            let modulePath = path.join(__dirname, '../sample-project/folder1/ModuleExample2')
            let ignore = path.join(__dirname, '../sample-project/folder1/folder2')
            let unusedExports = EvaluateProject.getModuleUnusedExports(projectPath, modulePath, ignore)
            unusedExports.should.be.eql(['aa', 'bb', 'cc', 'dd', 'ee'])
        })

        it('should successfully get unused exports on ModuleExample2 while ignoring Module3', () => {
            let modulePath = path.join(__dirname, '../sample-project/folder1/ModuleExample2')
            let ignore = path.join(__dirname, '../sample-project/folder1/folder2/ModuleExample3.js')
            let unusedExports = EvaluateProject.getModuleUnusedExports(projectPath, modulePath, ignore)
            unusedExports.should.be.eql(['bb', 'cc', 'ee'])
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

        it('should retrieve all unused exports if we ignore folder1', () => {
            let ignore = path.join(__dirname, '../sample-project/folder1')
            let unusedExports = EvaluateProject.getAllUnusedExports(projectPath, ignore)
            const expectedResult = [
                { file: path.join(__dirname, '../sample-project/ModuleExample1.js'), unusedExports: ['bb', 'aa', 'jjj'] },
                { file: path.join(__dirname, '../sample-project/UnusedModule1.js'), unusedExports: ['lmao', 'aaa'] }]
            unusedExports.should.be.eql(expectedResult)
        })

        it('should retrieve all unused exports if we ignore the whole project', () => {
            let ignore = path.join(__dirname, '../sample-project')
            let unusedExports = EvaluateProject.getAllUnusedExports(projectPath, ignore)
            unusedExports.should.be.eql([])
        })

        it('should retrieve all unused exports if we ignore ModuleExample4', () => {
            let ignore = path.join(__dirname, '../sample-project/folder1/folder2/ModuleExample4.js')
            let unusedExports = EvaluateProject.getAllUnusedExports(projectPath, ignore)
            const expectedResult = [
                { file: path.join(__dirname, '../sample-project/ModuleExample1.js'), unusedExports: ['jjj'] },
                { file: path.join(__dirname, '../sample-project/UnusedModule1.js'), unusedExports: ['lmao', 'aaa'] },
                { file: path.join(__dirname, '../sample-project/folder1/ModuleExample2.js'), unusedExports: ['dd', 'ee'] },
                { file: path.join(__dirname, '../sample-project/folder1/folder2/UnusedModule2.js'), unusedExports: ['lol'] }]
            unusedExports.should.be.eql(expectedResult)
        })

        it('should retrieve all unused exports if we ignore ModuleExample2 and folder2', () => {
            let ignore = [
                path.join(__dirname, '../sample-project/folder1/folder2'),
                path.join(__dirname, '../sample-project/folder1/ModuleExample2.js')]
            let unusedExports = EvaluateProject.getAllUnusedExports(projectPath, ignore)
            const expectedResult = [
                { file: path.join(__dirname, '../sample-project/ModuleExample1.js'), unusedExports: ['bb', 'aa', 'jjj'] },
                { file: path.join(__dirname, '../sample-project/UnusedModule1.js'), unusedExports: ['lmao', 'aaa'] }]
            unusedExports.should.be.eql(expectedResult)
        })
    })
})
