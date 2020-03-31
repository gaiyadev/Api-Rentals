let Customer = require('../models/customer');
const Joi = require('joi');
var express = require('express');
var router = express.Router();

function vaidateCustomers(customers) {
    const Schema = {
        Name: Joi.string().required(),
        Phone: Joi.string().required(),
        isGold: Joi.boolean(),
    };
    return Joi.validate(customers, Schema);
}

// get all customers
router.get('/', async (req, res, next) => {
    await Customer.find({}, (err, customer) => {
        if (err) return res.status(404).send("The Customer doesn't exist");
        res.send(customer);
    }).sort('Name');
});


// creating new customers
router.post('/', (req, res, next) => {
    const { error } = vaidateCustomers(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }
    const newCustomer = new Customer({
        Name: req.body.Name,
        Phone: req.body.Phone,
        isGold: req.body.isGold,
    });
    Customer.createCustomer(newCustomer, (err, customer) => {
        if (err) throw err;
        res.send(customer);
    });
});


// updating a customer

router.put('/:id', async (req, res, next) => {
    const { error } = vaidateCustomers(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    };
    await Customer.findByIdAndUpdate(req.params.id, {
        Name: req.body.Name,
        Phone: req.body.Phone,
        isGold: req.body.isGold,
    }, {
        new: true
    }, (err, customer) => {
        if (err) return res.status(404).send('No Customer assocaited to this Id');
        res.send(customer);
    });
});


//deleting a customer
router.delete('/:id', async (req, res, next) => {
    await Customer.deleteOne({ _id: req.params.id }, (err, customer) => {
        if (err) return res.status(404).send("The customer with the given id");
        res.send(customer);
    });
});

//getting a single customer
router.get('/:id', async (req, res, next) => {
    await Customer.find({ _id: req.params.id }, (err, customer) => {
        if (err) return res.status(404).send("The Customer with the given id doesn't");
        res.send(customer);
    });
});
module.exports = router;
