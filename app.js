const express = require('express');
const passport = require('passport');
const session = require('express-session');
const LocalStrategy = require('passport-local').Strategy;
const prisma = require('./prisma/prisma');
const {PrismaSessionStore} = require('@quixo3/prisma-session-store');
const path = require('node:path');
const userController = require('./controllers/userController');
const router = require('./routes/router');

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

passport.use(new LocalStrategy(async (username, password, done) => {
    try {
        const user = await userController.getUser(username);
        if (!user) {
            return done(null, false, {message: "Incorrect username"});
        }
    
        if (password !== user.password) {
            return done(null, false, {message: "Incorrect password"});
        }

        return done(null, user);
    } catch(err) {
        done(err);
    }
}));

passport.serializeUser((user, done) => {
    done(null, user.id)
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await userController.getUser(id);
        done(null, user);
    } catch(err) {
        done(err);
    }
});

app.use(express.urlencoded({extended: true}));

app.use(session({
    secret: 'my name is nicholas',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 24 * 60 * 60 * 1000
    },
    store: new PrismaSessionStore(
        prisma, {
            checkPeriod: 2 * 60 * 1000, 
            dbRecordIdIsSessionId: true,
        }
    )
}));

app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    next();
});

app.use("/", router);

app.use((err, req, res, next) => {
    res.status(500).render("index", {
        err: err,
    });
});

app.listen(3000, () => console.log('App is running on port 3000'));