const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

function initializePassport(passport, getUserByEmail) {
    const autheticateUser = (signup-email, signup-password, done) => {
        const user = getUserByEmail(signup-email);
        if (user == null) {
            return done(null, false, { message: 'No user with that email' })
        }
        try {
            if (await bcrypt.compare(signup-password, user.password)) {
                return done(null, user)
            } else {
                return done(null, false, { message: 'Password incorrect' })
            }
        } catch (e) {
            return done(e);
        }
    }

    passport.use(new LocalStrategy({ usernameField: 'signup-email' }, autheticateUser));
    

}

module.exports = router;


// const auth = (req, res, next)=> {
//     if(!req.session.login){
//         res.redirect('/login');
//         return;
//     }
// next();
// }
// module.exports = auth;