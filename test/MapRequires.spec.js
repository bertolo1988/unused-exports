require('should')
const path = require('path')

const MapRequires = require('../src/MapRequires')

describe('MapRequires', function() {
  it('should successfully map ModuleExample3.js', () => {
    let result = MapRequires(path.join(__dirname, '../sample-project/folder1/folder2/ModuleExample3.js'))
    result.should.be.eql([{ variable: 'ModuleExample2AA', module: 'ModuleExample2' },
    { variable: 'ModuleExample1BB', module: 'ModuleExample1' }])
  })

  it('should successfully map UnusedModule2.js', () => {
    let result = MapRequires(path.join(__dirname, '../sample-project/folder1/folder2/UnusedModule2.js'))
    result.should.be.eql([{ variable: undefined, module: 'should' },
    { variable: 'fs', module: 'fs' }])
  })

  it('should successfully map ModuleExample4.js', () => {
    let result = MapRequires(path.join(__dirname, '../sample-project/folder1/folder2/ModuleExample4.js'))
    result.should.be.eql([{ variable: undefined, module: 'ModuleExample2' }])
  })
})
