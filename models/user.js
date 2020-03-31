const Joi = require('joi');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
require('../database/db');

const userSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: true,
        minlength: 4,
        maxlength: 50
    },
    Email: {
        type: String,
        required: true,
        unique: true,
        minlength: 6,
        maxlength: 50
    },

    Password: {
        type: String,
        required: true,
        minlength: 8,
        maxlength: 350
    }
});


const User = mongoose.model('User', userSchema);
module.exports = User;

module.exports.createUser = (newUser, callback) => {
    bcrypt.hash(newUser.Password, 10, (err, hash) => {
        if (err) throw err;
        newUser.Password = hash;  //set hash password
        newUser.save(callback);
    });
};

// function validateUser(user) {
//     const Schema = {
//         Name: Joi.string().max(4).max(50).required(),
//         Email: Joi.string().required().email(),
//         Password: Joi.string().min(8).max(50).required(),
//     };
//     return Joi.validate(user, Schema);
// }

//exports.validate = validateUser;

module.exports.comparePassword = async (password, hash, callback) => {
    await bcrypt.compare(password, hash, (err, isMatch) => {
        if (err) throw err;
        return callback(null, isMatch);
    });
}

