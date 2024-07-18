const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

function initializePassport(passport, getUserByEmail) {
    const autheticateUser = async (signupEmail, signupPassword, done) => {
        const user = getUserByEmail(signupEmail);
        if (user == null) {
            return done(null, false, { message: 'No user with that email' })
        }
        try {
            if (await bcrypt.compare(signupPassword, user.password)) {
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

module.exports = {passport:initializePassport};


// const auth = (req, res, next)=> {
//     if(!req.session.login){
//         res.redirect('/login');
//         return;
//     }
// next();
// }
// module.exports = auth;