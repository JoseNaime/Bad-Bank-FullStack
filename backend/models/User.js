'use strict';

// create mongoose user model
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Deposit = require('./deposit');
const Withdrawal = require('./withdrawal');


const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true

    },
    balance: {
        type: Number,
        default: 0
    },
    history: {
        type: Object,
        default: {deposits: [Deposit], withdrawals: [Withdrawal]},
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const User = mongoose.model('User', UserSchema);
module.exports = User;