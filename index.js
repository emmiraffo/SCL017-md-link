function main(resolve) {
 //1. Leer un archivo del sistema de archivos (Fs)
 fs.readFile('README.md', 'utf8', function(err, data) {
   //2. Ejecutar una expresion regular sobre el contenido del archivo 
  var links = data.match(/[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi)
   //3. Retornar el resultado de la expresion regular
  resolve(links)
 });





}


module.exports = () => {
  return new Promise(main)
};
