'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const DepositSchema = new Schema({
    amount: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const Deposit = mongoose.models.Deposit || mongoose.model('Deposit', DepositSchema);
module.exports = Deposit;