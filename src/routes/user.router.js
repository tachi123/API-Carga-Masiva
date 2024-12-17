import { Router }  from 'express';
import { getDashboardStats } from '../controllers/siniestro.controller.js';

const router = Router();

// Routes
router.get('/', getDashboardStats);

router.get('/carga-siniestros', (req, res) => {
    res.render('carga-siniestros');
});

router.get('/carga-scripts', (req, res) => {
    res.render('carga-scripts');
});

router.get('/dashboard', (req, res) => {
    res.render('dashboard', { siniestros, scripts });
});

export default router;