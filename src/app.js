import express from 'express';
import { create } from 'express-handlebars';
import __dirname from './utils.js';
import dotenv from "dotenv";

//Routers
import siniestroRouter from './routes/siniestro.router.js';
import userRouter from './routes/user.router.js';
import scriptRouter from './routes/script.router.js';

//Import para inicializar
import { inicializarSiniestros } from './controllers/siniestro.controller.js';

const app = express();

dotenv.config();  //process.env.PORT;
const port = process.env.PORT || 3000;

//configurar para trabajar con json 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Handlebars setup
const hbs = create({
  extname: '.hbs',
  defaultLayout: 'main',
  helpers: {
    json: function (context) {
      return JSON.stringify(context);
    },
    includes: function (str, substring) {
      if (Array.isArray(str)) {
        return str.some(item => item.includes(substring));
      }
      return str.includes(substring);
    },
    count: function (array) {
      return array ? array.length : 0;
    }
  }
});
app.engine('.hbs', hbs.engine);
app.set('view engine', '.hbs');
app.set('views', __dirname + '/views');

// Static files (CSS, client-side JS)
app.use(express.static(__dirname + '/public'));
app.use('/uploads', express.static('uploads'));

app.use('/', userRouter);
app.use('/siniestro', siniestroRouter);
app.use('/script', scriptRouter);

// Cargar siniestros al iniciar la aplicación
inicializarSiniestros().then(() => {
  // Start the server
  app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
  });
});