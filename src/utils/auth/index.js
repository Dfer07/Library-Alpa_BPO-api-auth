const passport = require('passport')
const JwtStrategy = require('./strategy/jwt.strategy')
const LocalStrategy = require('./strategy/local.strategy')

passport.use(LocalStrategy)
passport.use(JwtStrategy)

module.exports = passport 