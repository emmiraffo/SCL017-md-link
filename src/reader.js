const fs = require('fs');
const path = require('path');


// FUNCION PARA DETECTAR ARCHIVOS MD EN FILE O FOLDER
function getMdFilesFromPath(pathParam) {
    let extension = path.extname(pathParam)
    if (extension == '.md') {
        return [pathParam]
    }
    if (extension == '') {
        var fileArray = []
        fs.readdirSync(pathParam).forEach((file)=> {
            let extension = path.extname(file)
            if (extension == '.md') {
                fileArray.push(pathParam + file)
            }
        })
        return fileArray
    }
    return []
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
    readMdFile
}
