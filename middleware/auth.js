const auth = (req, res, next)=> {
    if(!req.session.login){
        res.redirect('/login');
        return;
    }
next();
}
module.exports = auth;