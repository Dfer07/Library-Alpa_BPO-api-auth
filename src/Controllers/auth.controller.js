const passport = require("passport");
const AuthService = require("../services/auth.service");
const e = require("express");
const service = new AuthService();

async function postLoginController(req, res, next) {
  try {
    const data = req.user;
    const user = await service.createToken(data);
    return res.status(200).json(user);
  } catch (error) {
    return next(error);
  }
}

async function postRegistroController(req, res, next) {
  try {
    const data = req.body;
    const newUser = await service.createNewUser(data);
    return res.status(201).json(newUser);
  } catch (error) {
    return next(error);
  }
}

async function postRecoveryPasswordController(req, res, next) {
  try {
    const { email } = req.body;
    const rta = await service.recoveryPassword(email);
    return res.status(200).json(rta);
  } catch (error) {
    return next(error);
  }
}

async function postChangePasswordController(req, res, next) {
  try {
    const { token, contraseña } = req.body;
    const rta = await service.changePassword(token, contraseña);
    return res.status(200).json(rta)
  } catch (error) {
    return next(error)
  }
}

module.exports = {
  postLoginController,
  postRegistroController,
  postRecoveryPasswordController,
  postChangePasswordController
};
