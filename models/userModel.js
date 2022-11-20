const mongoose = require('mongoose')
const bcrypt = require("bcrypt")
const Schema = mongoose.Schema
const validator = require("validator")

const userSchema = new Schema({
    name: {
        type: 'string',
        required: true
    },
    surname: {
        type: 'string'
    },
    password: {
        type: 'string',
        required: true
    },
    email: {
        type: 'string',
        required: true,
        unique: true
    },
    roles: {
        type: 'string',
        required: true
    }
})

// static login function and crypting password 
userSchema.statics.login = async function(name, email, password, roles) {
    if (!email || !password) {
        throw Error("All field must be filled")
    }

    const nameExist = await this.findOne({
        name
    })
    const emailExist = await this.findOne({
        email
    })

    if (nameExist || emailExist) {

        const matchName = await (bcrypt.compare(password, nameExist.password))
        const matchEmail = await (bcrypt.compare(password, emailExist.password))

        if (matchName || matchEmail) {
            return nameExist;
        } else {
            throw Error("Password error")
        }

    } else {
        throw Error("Incorrect email or name")
    }
}



// SIgnup function and crypting password 
userSchema.statics.signup = async function(name, surname, password, email, roles) {

    // validation
    const ValidateUser = async function() {
        if (!email || !password) {
            throw Error("All field must be filled")
        }
        if (!validator.isEmail(email)) {
            throw Error("Email is not valid")
        }
        if (!validator.isStrongPassword(password)) {
            throw Error("Password not strong enough")
        }

    }

    ValidateUser()
    const exist = await this.findOne({
        email
    })

    if (exist) {
        throw error('Email already in use');
    }

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const user = await this.create({
        name,
        surname,
        password: hash,
        email,
        roles
    })

    return user;
}


module.exports = mongoose.model('User', userSchema)