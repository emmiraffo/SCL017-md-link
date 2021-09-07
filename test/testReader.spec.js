const { readMdFile } = require('../src/reader');
const { getMdFilesFromPath } = require('../src/reader');


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
      }
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
        return expect(getMdFilesFromPath(fileParam)).toEqual(['/doc/test.md','/doc/test1.md']);
    });

    

})
/*
function drinkAll(callback, flavour) {
    if (flavour !== 'octopus') {
      callback(flavour);
    }
  }
  
  describe('drinkAll', () => {
    test('drinks something lemon-flavoured', () => {
      const drink = jest.fn();
      drinkAll(drink, 'lemon');
      expect(drink).toHaveBeenCalled();
    });
  
    test('does not drink something octopus-flavoured', () => {
      const drink = jest.fn();
      drinkAll(drink, 'octopus');
      expect(drink).not.toHaveBeenCalled();
    });
  });*/