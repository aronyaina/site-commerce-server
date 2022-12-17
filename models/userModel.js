const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;
const validator = require("validator");

const userSchema = new Schema(
  {
    name: {
      type: "string",
      required: true,
    },
    surname: {
      type: "string",
    },
    password: {
      type: "string",
      required: true,
    },
    email: {
      type: "string",
      required: true,
      unique: true,
    },
    roles: {
      type: "string",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// static login function and crypting password
userSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw Error("Tout les champs devrait etre completer");
  }

  const emailExist = await this.findOne({
    email,
  });

  if (emailExist) {
    const matchEmail = await bcrypt.compare(password, emailExist.password);
    if (matchEmail) {
      return emailExist.roles;
    } else {
      throw Error("Erreur de mot de passe .");
    }
  }
  if (!emailExist) {
    throw Error("Compte inexistant");
  }
};

// SIgnup function and crypting password
userSchema.statics.signup = async function (name, surname, password, email) {
  const exist = await this.findOne({
    email,
  });
  if (!email || !password) {
    throw Error("Tout les champ devrait etre complete");
  }
  if (!validator.isEmail(email)) {
    throw Error("l'Email n'est pas valide");
  }
  if (!validator.isStrongPassword(password)) {
    throw Error("Mot de passe trop faible");
  }

  if (exist) {
    throw Error("Email deja utilise");
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  const user = await this.create({
    name,
    surname,
    password: hash,
    email,
    roles: "user",
  });

  return user;
};

module.exports = mongoose.model("User", userSchema);
