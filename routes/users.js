const User = require('../models/user');
var express = require('express');
const Joi = require('joi');

var router = express.Router();
function validateUser(user) {
  const Schema = {
    Name: Joi.string().min(4).max(50).required(),
    Email: Joi.string().required().email(),
    Password: Joi.string().min(8).max(50).required(),
  };
  return Joi.validate(user, Schema);
}

/* GET users listing. */
router.post('/', async (req, res, next) => {
  const { error } = validateUser(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  await User.findOne({ Email: req.body.Email }, (err, user) => {
    if (err) return err;
    if (user) {
      return res.status(400).send('User already exist');
    }
    const newUser = new User({
      Name: req.body.Name,
      Email: req.body.Email,
      Password: req.body.Password,
    });
    User.createUser(newUser, (err, user) => {
      if (err) throw err;
      res.send(user);
    });
  });

});

module.exports = router;
