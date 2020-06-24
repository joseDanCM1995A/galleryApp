const express = require('express');
const morgan = require('morgan');
const multer = require('multer');
const path = require("path");
const exphbs = require('express-handlebars');
const { json } = require("express");
const Handlebars = require('handlebars'); // para  poder accer al prototype del objeto en las vistas
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access');

// initializations
const app = express();

// settings
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
// confi del motor de plantillas de handlebars
app.engine('.hbs', exphbs({
    handlebars: allowInsecurePrototypeAccess(Handlebars),
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs'
}));
// usando el motor de plantillas
app.set('view engine', '.hbs');

// midlewares
//middlewares
app.use(morgan('dev'));
app.use(json()); // indicando al server que usaremos json para que lo soporte

const storage = multer.diskStorage({
    destination: path.join(__dirname, 'public/uploads'),
    fileFilter(req, file, cb) {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
        }
    },
    filename(req, file, cb) {
        cb(null, new Date().getTime() + path.extname(file.originalname)); // se le dará el nombre basado en la fecha que se creó
    }

});
app.use(multer({ storage }).single('image')); // configurando que sólo se va a subir una imagen por registro
app.use(express.urlencoded({ extended: false })); // para que se entiendan los datos de un formulario en el back


// especify routes files for our API REST
app.use(require('./routes/index.routes.js'));
app.use(require('./routes/info.routes.js'));

module.exports = app;