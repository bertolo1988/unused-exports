require('should')
const path = require('path')

const EvaluateModule = require('../src/EvaluateModule')

describe('EvaluateModule', function() {
    describe('getModuleUsedExportsByModule', () => {
        it('should successfully get ModuleExample2 exports that ModuleExample3 uses', () => {
            let userM = path.join(__dirname, '../sample-project/folder1/folder2/ModuleExample3.js')
            let usedM = path.join(__dirname, '../sample-project/folder1/ModuleExample2.js')
            let usedExports = EvaluateModule.getModuleUsedExportsByModule(userM, usedM)
            usedExports.should.be.eql(['aa', 'bb', 'cc'])
        })

        it('should successfully get ModuleExample2 exports that ModuleExample4 uses', () => {
            let userM = path.join(__dirname, '../sample-project/folder1/folder2/ModuleExample4.js')
            let usedM = path.join(__dirname, '../sample-project/folder1/ModuleExample2.js')
            let usedExports = EvaluateModule.getModuleUsedExportsByModule(userM, usedM)
            usedExports.should.be.eql(['aa', 'dd'])
        })

        it('should successfully get ModuleExample2 exports that NamedFunction uses', () => {
            let userM = path.join(__dirname, '../sample-project/folder1/NamedFunction.js')
            let usedM = path.join(__dirname, '../sample-project/folder1/ModuleExample2.js')
            let usedExports = EvaluateModule.getModuleUsedExportsByModule(userM, usedM)
            usedExports.should.be.eql([])
        })
    })

    describe('isModuleBeingUsedByModule', () => {
        it('should successfully acknowledge that ModuleExample2 is being used by ModuleExample4', () => {
            let userM = path.join(__dirname, '../sample-project/folder1/folder2/ModuleExample4.js')
            let usedM = path.join(__dirname, '../sample-project/folder1/ModuleExample2.js')
            let isModuleUsed = EvaluateModule.isModuleBeingUsedByModule(usedM, userM)
            isModuleUsed.should.be.true()
        })

        it('should successfully acknowledge that UnusedModule2 is not being used by ModuleExample1', () => {
            let userM = path.join(__dirname, '../sample-project/ModuleExample1.js')
            let usedM = path.join(__dirname, '../sample-project/UnusedModule1.js')
            let isModuleUsed = EvaluateModule.isModuleBeingUsedByModule(usedM, userM)
            isModuleUsed.should.be.false()
        })
    })
})
