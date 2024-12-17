import { Router }  from 'express';
import { getSiniestros, getSiniestroById, uploadSiniestros, ejecutarScriptsNuevamente } from '../controllers/siniestro.controller.js';
import { uploader } from '../utilsMulter.js';

const router = Router();

router.post('/upload', uploader.single('siniestrosFile'), uploadSiniestros); 
router.get('/', getSiniestros);
router.get('/:id', getSiniestroById);
router.post('/ejecutar-scripts', ejecutarScriptsNuevamente); // Nueva ruta para ejecutar scripts nuevamente

export default router;