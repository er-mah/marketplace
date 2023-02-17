const schedule = require('node-schedule');
const moment = require('moment');

/*
* Miniaturas de imágenes
*
* hay un código que usa una biblioteca llamada thumb para generar miniaturas de imágenes.
* Esta biblioteca procesa todas las imágenes en una carpeta de origen (source) y guarda las
* miniaturas resultantes en una carpeta de destino (destination).
*
* Los parámetros concurrency y width controlan el número de procesos concurrentes y
* el ancho de las miniaturas generadas, respectivamente.
*
* */
// const { thumb } = require('node-thumbnail');
// thumb({
//   source: 'imagesEjemplo', // could be a filename: dest/path/image.jpg
//   destination: 'thumbs',
//   concurrency: 4,
//   width: 290,
//   ignore: true
// }, (files, err, stdout, stderr) => {
//   console.log('All done!');
// });





// TODO FIX SCHEDULER
/*
Este código programa una tarea recurrente que se ejecuta todos los días a las 3:01 am.
Cuando se ejecuta, recupera todas las entradas de la tabla HistoryState donde la columna active es
verdadera e incluye la columna PublicationState. Luego, se itera sobre cada fila recuperada y se calcula
la diferencia en días entre la fecha actual y la fecha en que se creó la publicación asociada. Si la diferencia es mayor
a 60 días, entonces la publicación se marca como vencida cambiando su estado a "Vencida". Finalmente,
se imprime en consola la cantidad de publicaciones que se han marcado como vencidas.

 */


const {
  Publication,
  PublicationState,
  HistoryState,
  User,
} = require('./models').mah;



const rule = new schedule.RecurrenceRule();
rule.hour = 3;
rule.minute = 1;
const j = schedule.scheduleJob(rule, () => {
  console.log('COMENZANDO CON LA REVISIÓN DE PUBLICACIONES....');
  HistoryState.findAll({
    where: { active: true },
    include: [PublicationState],
  }).then((res) => {
    let publicacionesVencidas = 0;

    res.map((row) => {
      const publicationDate = moment(row.dataValues.createdAt);
      const actualDate = moment();
      const diff = actualDate.diff(publicationDate, 'days');
      const { publication_id } = row.dataValues;
      if (diff > 60) {
        publicacionesVencidas += 1;
        return Publication.findById(publication_id)
          .then(pub => pub.getPublicationStates({ through: { where: { active: true } } })
            .then((oldPs) => {
              oldPs[0].HistoryState = {
                active: false,
              };
              return PublicationState.findOne({ where: { stateName: 'Vencida' } })
                .then(newPs => pub.setPublicationStates([oldPs[0], newPs], { through: { active: true } }))
                .then(() => pub);
            }));
      }
    });
    console.log('SE VENCIERON:', publicacionesVencidas, 'PUBLICACIONES.');
  });
});



// SCHEDULER OLD
/* HistoryState.findAll({
  where: { active: true },
  include: [PublicationState],
}).then((res) => {
  let publicacionesVencidas = 0;

  res.map((row) => {
    const publicationDate = moment(row.dataValues.createdAt);
    const actualDate = moment();
    const diff = actualDate.diff(publicationDate, 'days');
    const { publication_id } = row.dataValues;
    const mailArray = [];
    Publication.findOne({where: {id: row.dataValues.publication_id}})
    .then(res=>{
      const getUserEmail = (res)=>{
        const data = res.dataValues;
        let userMail = false;
        if ((_.isUndefined(data.email) || _.isNull(data.email)) && data.user_id){
          return User.findById(data.user_id, {attributes: ['email']})
            .then((us)=>{
              mailArray.push(getUserEmail(us.dataValues.mail))
            })
        }else{
          userMail = data.email
          return mailArray.push(userMail);
        }
      }
      getUserEmail(res)
      //generateMailAgenciaoParticular(res.dataValues, 'vencimientoProximo')
    }
  )})
})
const rule2 = new schedule.RecurrenceRule();
rule2.hour = 11;
rule2.minute = 42;
const j2 = schedule.scheduleJob(rule2, () => {
  HistoryState.findAll({
    where: { active: true },
    include: [PublicationState],
  }).then((res) => {
    let publicacionesVencidas = 0;

    res.map((row) => {
      const publicationDate = moment(row.dataValues.createdAt);
      const actualDate = moment();
      const diff = actualDate.diff(publicationDate, 'days');
      const { publication_id } = row.dataValues;
      Publication.findOne({where: {id: row.dataValues.publication_id}})
      .then(res=>{
        const getUserEmail = (res)=>{
          const data = res.dataValues;
          if (_.isUndefined(data.email) || _.isNull(data.email)){
            User.findById(data.user_id)
              .then((us)=>{
                return us.dataValues.email
              })
          }else{
            return data.email
          }
        }
        res.dataValues.email = getUserEmail(res);
        console.log(res.dataValues.email);
        //generateMailAgenciaoParticular(res.dataValues, 'vencimientoProximo')
      }
    )})
})
}) */




/*
* Este código define un objeto de almacenamiento de multer (un middleware para manejar archivos en Express)
* con dos propiedades: destination y filename.

La propiedad destination define la carpeta de destino donde se almacenarán los archivos que se suban.
* En este caso, la carpeta es './images'.

La propiedad filename se utiliza para especificar cómo se nombrarán los archivos cuando se almacenen
* en el servidor. En este caso, la función toma tres argumentos: la solicitud HTTP (req), el objeto
* de archivo y un callback (cb). En el callback, el primer argumento es un objeto de error (si lo hay), y
* el segundo argumento es el nombre del archivo. La función crea un nombre de archivo utilizando la primera parte
* del nombre de archivo original (file.originalname.slice(0, 9)), agrega la fecha actual (Date.now()) y la extensión
* del archivo (ext). La extensión del archivo se determina según el tipo de archivo (file.mimetype) utilizando una
* sentencia switch. Finalmente, el callback pasa el nombre de archivo generado al método cb para que multer
* pueda almacenar el archivo.
*
* 
*/
const multer = require('multer');
const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, './images');
    },
    filename: (req, file, cb) => {
        let ext;
        // Mimetype stores the file type, set extensions according to filetype
        switch (file.mimetype) {
            case 'image/jpeg':
                ext = '.jpg';
                break;
            case 'image/png':
                ext = '.png';
                break;
            case 'image/gif':
                ext = '.gif';
                break;
            default:
                ext = '';
        }
        cb(null, file.originalname.slice(0, 9) + Date.now() + ext);
    },
});
const upload = multer({
    storage,
});
