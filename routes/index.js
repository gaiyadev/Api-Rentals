Genre = require('../models/genre');
const Joi = require('joi');
var express = require('express');
var router = express.Router();


function vaidateGenre(genre) {
  const Schema = {
    Name: Joi.string().required(),
  };
  return Joi.validate(genre, Schema);
}
/* GET home page. */
router.get('/', async (req, res, next) => {
  await Genre.find({}, (err, genre) => {
    if (err) return res.status(404).send("The genre doesn't exist");
    res.send(genre);
  }).sort('name');
});

router.post('/api/genres', (req, res, next) => {
  const { error } = vaidateGenre(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  const newGenre = new Genre({
    Name: req.body.Name,
  });
  Genre.createGenre(newGenre, (err, genre) => {
    if (err) throw err;
    res.send(genre);
  });
});


router.put('/api/genres/:id', async (req, res, next) => {
  const { error } = vaidateGenre(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  };
  await Genre.findByIdAndUpdate(req.params.id, {
    Name: req.body.Name,
  }, {
    new: true
  }, (err, genre) => {
    if (err) return res.status(404).send('No genre assocaited to this Id');
    res.send(genre);
  });
});


router.delete('/api/genres/:id', async (req, res, next) => {
  await Genre.deleteOne({ _id: req.params.id }, (err, genre) => {
    if (err) return res.status(404).send("The genre with the given id doesn't");
    res.send(genre);
  });
});


router.get('/api/genres/:id', async (req, res, next) => {
  await Genre.find({ _id: req.params.id }, (err, genre) => {
    if (err) return res.status(404).send("The genre with the given id doesn't");
    res.send(genre);
  });
});

module.exports = router;
