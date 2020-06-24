// // especify files statics
// app.use(express.static(path.join(__dirname, 'public')));

//dotenv solo sirve en modo desarrollo
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config(); // para que e servidor acepte las variables de entorno que definimos
}

const app = require('./app');
require('./db');


//start server
app.listen(app.get('port'), () => console.log('server ok'), console.log('Environment: ' + process.env.NODE_ENV));