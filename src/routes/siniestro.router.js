import { Router }  from 'express';
import * as siniestroController from '../controllers/siniestro.controller.js';
import { uploader } from '../utilsMulter.js';

const router = Router();

router.post('/upload', uploader.single('siniestrosFile'), siniestroController.uploadSiniestros); 
  
router.get('/', siniestroController.obtenerSiniestros);

export default router;