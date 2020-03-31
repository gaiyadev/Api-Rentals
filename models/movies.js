const Joi = require('joi');
const mongoose = require('mongoose');
const Genre = require('../models/genre');
require('../database/db');

const movieSchema = new mongoose.Schema({
    Title: {
        type: String,
        required: true,
        minlength: 4,
        maxlength: 50
    },
    Genre: {
        type: Genre,
        required: true,
    },
    numberInStock: {
        type: Number,
        min: 0,
        default: 0,
        max: 255
    },
    dailyRentalRate: {
        min: 0,
        default: 0,
        max: 255
    }
});


const Movie = mongoose.model('Movie', movieSchema);
module.exports = Movie;

module.exports.createMovie = (newMovie, callback) => {
    newMovie.save(callback);
}


