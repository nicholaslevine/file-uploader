const express = require('express');
const passport = require('passport');
const session = require('express-session');
const LocalStrategy = require('passport-local').Strategy;
const path = require('node:path');
const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

passport.use(new LocalStrategy(async (username, password, done) => {

}))

passport.serializeUser((user, done) => {
    done(null, user.id)
});

passport.deserializeUser(async (id, done) => {
    try{

    }
    catch(err){
        done(err);
    }
})



app.use(passport.session());
app.use(express.urlencoded({extended: true}));


app.listen(3000, console.log('app is running on port 3000'));