const fs = require('fs');
const path = require('path');


// FUNCION PARA DETECTAR ARCHIVOS MD EN FILE O FOLDER
function getMdFilesFromPath(pathParam) {
    absolutePath = path.resolve(pathParam)
    statsObj = fs.statSync(absolutePath)
    if(statsObj.isFile()) {
        let extension = path.extname(absolutePath)
        if (extension == '.md') {
            return [absolutePath]
        }
    }
    if (statsObj.isDirectory()) {
        var fileArray = []
        readFilesInFolder(absolutePath, fileArray)
        return fileArray
    }
    return []
}

function readFilesInFolder(folder, fileArray){
    fs.readdirSync(folder).forEach((element)=> {
        let newFolder = path.resolve(folder, element)
        let statsObj = fs.statSync(newFolder)
        if (statsObj.isDirectory()) {
            readFilesInFolder(newFolder, fileArray)
        } else {
            let extension = path.extname(newFolder)
            if (extension == '.md') {
                fileArray.push( path.resolve(folder, element))
            }
        }
    })
}

// FUNCION PARA DETECTAR ARCHIVOS MD EN FILE O FOLDER

function readMdFile (fileParam) {
    return new Promise((resolve, reject)=> {
        fs.readFile(fileParam, 'utf8', function(err, data) {
            if (err) {
                //hacer algo porque no leyo el file
                reject(err)
            } else {
                resolve(data)
            }
        })
    })
}


module.exports = {
    getMdFilesFromPath,
    readFilesInFolder,
    readMdFile
}
