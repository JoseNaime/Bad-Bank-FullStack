'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const WithdrawalSchema = new Schema({
    amount: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const Withdrawal = mongoose.models.Withdrawal || mongoose.model('Withdrawal', WithdrawalSchema);
module.exports = Withdrawal;