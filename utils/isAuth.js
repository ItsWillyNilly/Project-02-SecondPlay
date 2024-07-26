// function that redirects the user if they are not logged in
function isAuthenticated (req, res, next) {
    if(!req.session.loggedIn) {
        res.render('login');
        return;
    }
    // if the authentication fails, redirect the user to the login page
    next();
}

module.exports = isAuthenticated;