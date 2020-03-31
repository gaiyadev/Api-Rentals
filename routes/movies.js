let Movie = require('../models/movies');
const Joi = require('joi');
var express = require('express');
var router = express.Router();

function vaidateMovies(movies) {
    const Schema = {
        Title: Joi.string().required(),
        GenreId: Joi.string().required(),
        numberInStock: Joi.number(),
        dailyRentalRate: Joi.number().min(0).max(255),
    };
    return Joi.validate(movies, Schema);
}

// get all customers
router.get('/', async (req, res, next) => {
    await Movie.find({}, (err, movie) => {
        if (err) return res.status(404).send("The Movie doesn't exist");
        res.send(movie);
    });
});


// creating new customers
router.post('/', (req, res, next) => {
    const { error } = vaidateMovies(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }
    const newMovie = new Customer({
        Title: req.body.Name,
        Genre: {
            _id: Genre._id,
            Name: Genre.Name
        },
        numberInStock: req.body.numberInStock,
        dailyRentalRate: req.body.dailyRentalRate
    });
    Movie.createMovie(newMovie, (err, movie) => {
        if (err) throw err;
        res.send(movie);
    });
});


// updating a customer

router.put('/:id', async (req, res, next) => {
    const { error } = vaidateMovies(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    };
    await Movie.findByIdAndUpdate(req.params.id, {
        Title: req.body.Name,
        Genre: {
            _id: Genre._id,
            Name: Genre.Name
        },
        numberInStock: req.body.numberInStock,
        dailyRentalRate: req.body.dailyRentalRate
    }, {
        new: true
    }, (err, customer) => {
        if (err) return res.status(404).send('No Customer assocaited to this Id');
        res.send(customer);
    });
});


//deleting a customer
router.delete('/:id', async (req, res, next) => {
    await Movie.deleteOne({ _id: req.params.id }, (err, movie) => {
        if (err) return res.status(404).send("The customer with the given id");
        res.send(movie);
    });
});

//getting a single customer
router.get('/:id', async (req, res, next) => {
    await Movie.find({ _id: req.params.id }, (err, movie) => {
        if (err) return res.status(404).send("The Customer with the given id doesn't");
        res.send(movie);
    });
});
module.exports = router;
