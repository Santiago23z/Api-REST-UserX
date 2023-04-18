const passport = require('passport')
const User = require('../models/user')
const passport_local = require('passport-local').Strategy

passport.use("locals", new passport_local({
    usernameField: "email"

}, async (email, password, done) => {
    const user = await User.findOne({email : email})
    if (!user) {
       return done(null, false, { message: "Not user found" })  
    } else {
       const match = await user.matchPassword(password);
       if (match) {
        console.log("peneee");
        return done(null, user, {message : "access"})
        
       } else {
        return done(null, false, {message : "incorrect password"})
       }
    }
}));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) =>{
    User.findById(id, (err, user) => {
        done(err, user)
    })
})