const passport = require('passport');
const {getUsers, makeUser, getUser, updateUser, deleteUser} = require('../queries/queries');

const userController = {
    displayUsers: async (req, res, next) => {
        try{
        const users = await getUsers();
        res.render("users", { users });
        next();
        } catch (err){
            next(err);
        }
    },
    makeUserGet: (req, res) => {
        res.render("sign-up")
    },
    makeUserPost: async (req, res, next) => {
        try{
            const {username, password, name} = req.body;
            await makeUser({username, password, name});
            passport.authenticate('local')(req, res, () => {
                res.redirect('/');
            })
            next();
        } catch(err) {
            next(err);
        }
    },
    loginGet: (req, res) => {
        res.render("login");
    },
    loginPost: (req, res, next) => {
        passport.authenticate('local', {
            successRedirect: '/',
            failureRedirect: '/login',
            failureFlash: true
        })(req, res, next);
    },
    logout: (req, res, next) => {
        req.logout((err) => {
            if (err) return next(err);
            res.redirect('/');
        })
    },
    getUser: async (req, res, next) => {
        try{
            const user = await getUser(req.body.username);
            return user;
        } catch(err){
            next(err);
        }
    },
    updateUserGet: async (req, res, next) => {
        try{
            const user = await getUser(res.locals.currentUser.id);
            res.render("update-user", {
            user: user, });
            next()
        } catch(err){
            next(err);
        }
    },
    updateUserPost: async (req, res, next) => {
        try{
            const {name, username, password} = req.body;
            const user = {
                name, username, password
            }   
            updateUser(res.locals.currentUser.id, user)
            res.redirect('/');
        } catch(err){
            next(err);
        }
    },
    deleteUser: async (req, res, next) => {
        try{
            const {id} = res.locals.currentUser;
            await deleteUser(id);
            res.redirect('/');
            next();
        } catch(err){
            next(err);
        }
    }
};

module.exports = userController;