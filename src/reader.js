const fs = require('fs');
const path = require('path');


// FUNCION PARA DETECTAR ARCHIVOS MD EN FILE O FOLDER
function getMdFilesFromPath(pathParam) {
    if (fs.existsSync(pathParam)) {
        let extension = path.extname(pathParam)

        if (extension == '.md') {
            //es un archivo md
            return [pathParam]
        } else if(extension == '') {
            //es directorio
            var fileArray = []
            fs.readdirSync(pathParam).forEach((file)=> {
                let extension = path.extname(file)
                if (extension == '.md') {
                    fileArray.push(pathParam + file)
                }
            })
            return fileArray
        }
        //extension no valida
        return []
    }
}

// FUNCION PARA LEER ARCHIVOS MD

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
