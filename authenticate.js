// var passport = require('passport');
// var GoogleStrategy = require('passport-google-oauth20').Strategy;

// passport.serializeUser((user, done) => {
//     done(null, user.id);
// })

// passport.deserializeUser((user, done) => {
//     done(null, user);
// })
// passport.use(new GoogleStrategy({
//     clientID: '276457643872-9ot3uteeqp2ncbp4n1hqpjonv9rqsspo.apps.googleusercontent.com',
//     clientSecret: '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',
//     callbackURL: "http://localhost:5173/google/callback"
//   },
//   function(accessToken, refreshToken, profile, cb) {
//     // Register user here.
//     console.log(profile);
//     cb(null, profile);
//   }
// ));