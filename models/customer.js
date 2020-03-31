const Joi = require('joi');
const mongoose = require('mongoose');
require('../database/db');

const customerSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: true,
        minlength: 4,
        maxlength: 50
    },
    Phone: {
        type: String,
        required: true,
        trim: true,
    },
    isGold: {
        type: Boolean,
        default: false
    }
});


const Customer = mongoose.model('Customer', customerSchema);
module.exports = Customer;

module.exports.createCustomer = (newCustomer, callback) => {
    newCustomer.save(callback);
}


