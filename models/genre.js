const Joi = require('joi');
const mongoose = require('mongoose');
require('../database/db');

const genreSchma = new mongoose.Schema({
    Name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    }
});


const Genre = mongoose.model('Genre', genreSchma);
module.exports = Genre;

module.exports.createGenre = (newGenre, callback) => {
    newGenre.save(callback);
}


