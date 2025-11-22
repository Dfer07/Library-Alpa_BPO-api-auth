const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const boom = require("@hapi/boom");
const bcrypt = require("bcrypt");
const config = require("../Config/config");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

class AuthService {
  constructor() {
    //vacio
  }

  async getUser(email, contraseña) {
    const user = await prisma.usuarios.findUnique({ where: { email } });
    if (!user) {
      throw boom.unauthorized("No autorizado");
    }
    const isMatch = await bcrypt.compare(contraseña, user.contraseña);
    if (!isMatch) {
      throw boom.unauthorized("No autorizado");
    }
    delete user.contraseña;
    return user;
  }

  async createToken(user) {
    const payload = { sub: user.id, rolId: user.rolId, access: "login" };
    const token = jwt.sign(payload, config.jwtSecret);
    return { user, token };
  }

  async createNewUser(data) {
    const password = data.contraseña;
    const hash = await bcrypt.hash(password, 10);
    const newUser = await prisma.usuarios.create({
      data: { ...data, contraseña: hash, rolId: data.rolId || 2 },
    });
    delete newUser.contraseña;
    return newUser;
  }

  async recoveryPassword(email) {
    const user = await prisma.usuarios.findUnique({ where: { email } });
    if (!user) {
      throw boom.notFound();
    }
    const payload = { sub: user.id, access: "recovery" };
    const tokenRecovery = jwt.sign(payload, config.jwtSecretRecovery, {
      expiresIn: "15m",
    });
    const link = `https://mifronted.com/recovery-password?token=${tokenRecovery}`;
    await prisma.usuarios.update({
      where: { id: user.id },
      data: { recovery_token: tokenRecovery },
    });
    const rta = await this.sendEmail(user, link);
    return rta;
  }

  async sendEmail(user, link) {
    // Create a test account or replace with real credentials.
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: config.emailRecovery,
        pass: config.passwordEmailRecovery,
      },
    });

    await transporter.sendMail({
      from: `"Library Alpha BPO" <${config.emailRecovery}>`,
      to: user.email,
      subject: "Recuperación de contraseña - Library Alpha BPO",
      html: `Para cambiar tu contraseña por favor accede a este link:  ${link}`, // HTML body
    });

    return {
      message:
        "Correo enviado con exito. Por favor revise su bandeja de entrada.",
    };
  }

  async changePassword(token, password) {
    const hash = await bcrypt.hash(password, 10);
    const payload = jwt.verify(token, config.jwtSecretRecovery);
    const user = await prisma.usuarios.findUnique({
      where: { id: payload.sub },
    });
    if (token !== user.recovery_token) {
      throw boom.unauthorized();
    }
    await prisma.usuarios.update({
      where: { id: user.id },
      data: {
        contraseña: hash,
        recovery_token: null,
      },
    });
    return { message: "Cambio de contraseña exitoso" };
  }
}

module.exports = AuthService;
