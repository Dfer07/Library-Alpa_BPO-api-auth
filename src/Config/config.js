require("dotenv").config();

const config = {
  env: process.env.NODE_ENV || "dev",
  isProd: process.env.NODE_ENV === "production",
  port: process.env.PORT || 3000,
  jwtSecret: process.env.JWT_SECRET,
  jwtSecretRecovery: process.env.JWT_SECRET_RECOVERY,
  emailRecovery: process.env.EMAIL_RECOVERY,
  passwordEmailRecovery: process.env.PASSWORD_EMAIL_RECOVERY,
};

module.exports = config;
