const reader = require('./src/reader.js')


function main(pathParam, options) {

  return new Promise((resolve, reject) => {
    //1. Leer un archivo del sistema de archivos (Fs)
   let files = reader.getMdFilesFromPath(pathParam)

   let filePromises = files.map(file => {
     return reader.readMdFile(file)
    })

   Promise.all(filePromises).then((arrayData) => { 
     var links = arrayData.flatMap((data) => {
      return data.match(/[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi)
     })
     resolve(links)
   })
  })

}


module.exports = (path, options) => {
  return main(path, options)
};
