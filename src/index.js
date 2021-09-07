const reader = require('./reader.js')
const path = require('path');

function main(pathParam) {
  return new Promise((resolve, reject) => {
    if (pathParam) {
      let files = reader.getMdFilesFromPath(pathParam)       // SABER CUANDO UNA RUTA ES RELATIVA USAR MODULO PATH DE NODE
      
      if (files !== undefined) {
        let filePromises = files.map(file => {
          return reader.readMdFile(file)
        })
  
        Promise.all(filePromises).then((arrayData) => {
          var links = arrayData.flatMap((data) => {
            return data.match(/[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi)
          })
          resolve(links)
        })
      } else {
        reject()
      }
    }else {
      reject(err)
    }  
  })
}


module.exports = (path, options) => {
  return main(path, options)
};

