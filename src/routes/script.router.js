import { Router }  from 'express';
import { obtenerScripts, crearScript } from '../controllers/script.controller.js';

const router = Router();

router.get('/', obtenerScripts);
router.post('/', crearScript);

export default router;