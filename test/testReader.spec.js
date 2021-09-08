const { readMdFile } = require('../src/reader');
const { getMdFilesFromPath } = require('../src/reader');
const {readFilesInFolder} = require('../src/reader');

jest.mock('fs', () => {
    const mockFileInfo = { 
        '/doc/test.md': 'esto es un archivo de test www.test.com',
        '/doc/test.txt': 'esto es un archivo de test www.test.com',
        '/doc/test.js': 'esto es un archivo de test www.test.com'

    };
    return {
      readFile: (fpath, opts, fn) => {
        if (fpath in mockFileInfo) {
          fn(undefined, mockFileInfo[fpath])
        }
        fn('error')
      },
      existsSync: (fpath) => {
          return true
      },
      readdirSync: (fpath) =>{
          return ['/test.md', '/test1.md', '/test.js']
      },
      statSync: (fpath) =>{
        return {
          isDirectory: () => {
            return false
          },
          isFile: () => {
            return true
          },
        }
    },
  }
});

describe('Read File', () => {
    it("it's a function", () => {
      expect(typeof readMdFile).toBe('function');
    });

    it("should read a file", () => {
        let fileParam = '/doc/test.md'
        return expect(readMdFile(fileParam)).resolves.toBe('esto es un archivo de test www.test.com');
    });

    it("shouldn't read a file", () => {
        let fileParam = '/docs/test.md'
        return expect(readMdFile(fileParam)).rejects.toMatch('error');
    });
});


describe('should be to read a file In a Folder', () => {
  it("it's a function", () => {
      expect(typeof readFilesInFolder).toBe('function');
    });

})




describe('should be to cacht a file', () => {
    it("it's a function", () => {
        expect(typeof getMdFilesFromPath).toBe('function');
      });

    it("File found", () => {
        let fileParam = '/doc/test.md'
        return expect(getMdFilesFromPath(fileParam)).toEqual(['/doc/test.md']);
    });

    it("file .md found in directory", () => {
        let fileParam = '/doc'
        return expect(getMdFilesFromPath(fileParam)).toEqual([]);
    });
})