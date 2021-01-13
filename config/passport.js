const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;

const User = require("../app/models/User");
const keys = require("./keys");

const options = {};
options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
options.secretOrKey = keys.secretOrKey;
// passport works need to implement on routes
module.exports = (passport) => {
  passport.use(
    new JwtStrategy(options, (jwt_payload, done) => {
      User.find(jwt_payload.id)
         .then(user => {
            if(user) {
               return done(null, user);
            }
            return done(null, false)
         })
         .catch( err => console.log(err));
    })
  );
};
