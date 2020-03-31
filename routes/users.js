const _ = require('lodash');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const User = require('../models/user');
var express = require('express');

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
    const newUser = new User(_.pick(req.body, ['Name', "Email", "Password"]));
    User.createUser(newUser, (err, user) => {
      if (err) throw err;
      res.send(_.pick(user, ['_id', 'Name', 'Email']));
    });
  });

});


function validateLogin(user) {
  const Schema = {
    Email: Joi.string().required().email(),
    Password: Joi.string().min(8).max(50).required(),
  };
  return Joi.validate(user, Schema);
}

/* GET users listing. */
router.post('/login', async (req, res, next) => {
  const { error } = validateLogin(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  await User.findOne({ Email: req.body.Email }, (err, user) => {
    if (err) return err;
    if (!user) {
      return res.status(400).send('Invalid Email or Password');
    }
    User.comparePassword(req.body.Password, user.Password, (err, isMatch) => {
      if (err) throw err;
      if (!isMatch) {
        return res.status(400).send('Invalid Email or Password')
      }
    });
    const token = jwt.sign({ _id: user._id }, 'SecretKey');
    res.send(token);
  });
});



module.exports = router;
