import passport from 'passport';
import local from 'passport-local';

const LocalStrategy = local.Strategy;

const initializePassport = () => {
    passport.serializeUser((user, done) => {
        done(null, user.username);
    })
    passport.deserializeUser( async(id, done) => {
        //let user = await userService.findById(id);
        const user = {username: "username", password: "password"};                
        done(null, user.username);
    })
    passport.use('login',new LocalStrategy(
        {passReqToCallback: true, usernameField: 'username' }, 
        async (req, username, password, done) => {
            try {
                const user = {username: "username", password: "password"};                
                //const user = await userService.findOne({ email: email });
                //if(!user){
                //    console.log('User doesnt exist');
                //    return done(null, false, { message: 'Usuario no encontrado' });
                //}

                //if(!isValidPassword(user,password)) return done(null, false, { message: 'Contraseña incorrecta' });
                return done(null, user); //Autenticación exitosa, retorno el usuario en el callback done
            } catch (error) {
                return done(error);
            }
        }
    ))
};

export default initializePassport;