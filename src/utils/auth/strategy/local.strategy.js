const { Strategy } = require("passport-local");
const AuthService = require("../../../services/auth.service");
const service = new AuthService();

const options = { usernameField: "email", passwordField: "contraseña" };

const LocalStrategy = new Strategy(options, async (email, contraseña, done) => {
  try {
    const usuario = await service.getUser(email, contraseña);
    return done(null, usuario);
  } catch (error) {
    return done(error, false);
  }
});

module.exports = LocalStrategy;
