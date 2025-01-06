import express from 'express';
import passport from 'passport';
const router = express.Router();

router.get('/failregister', (req, res) => {
    res.send({ error: 'Failed' });
});

//Iniciar sesión 
router.post('/login', passport.authenticate('login', {failureRedirect: 'failloging'}), async (req,res) => {
    try{
        if(!req.user) //Llego acá, es que el middleware lo supero
            return res.status(400).send({ status: 'error', error: 'Invalid credentials' });
        
        req.session.user = {
            username: req.user.username
        };
        //res.send({ status: 'success', payload: req.user });
        res.redirect('/');
    }catch(error){
        console.error('Error al iniciar sesión');
        res.status(500).send('Error al iniciar sesión');
    }

})

router.get('/failloging', (req, res) => {
    res.send({ error: 'Failed Login' });
});

//Cerrar sesión del usuario
router.post('/logout', (req, res) => {
    req.session.destroy( (error) => {
        if(error){
            console.error('Error al cerrar sesión');
            res.status(500).send('Error al cerrar sesión');
        } else{
            res.redirect('/login');
        }
    })
})

export default router;