const User = require('../models/user');
const {model} = require("mongoose");

function getAll(req, res) {
    User.find({})
        .then(users => {
            if (!users) return res.status(204).send({message: 'NO CONTENT'});
            return res.status(200).send({users});
        }).catch(err => res.status(500).send({err}))
}

function create(req, res) {
    const user = new User(req.body);
    // check if user dont exist in db
    User.findOne({email: user.email})
        .then((userExist) => {
            if (userExist) return res.status(409).send({message: 'USER ALREADY EXIST'});
            // save user
            user.save()
                .then(user => res.status(201).send({user}))
                .catch(err => res.status(500).send({err}))
        })
        .catch(err => res.status(500).send({err}))
}

function show(req, res) {
    if (req.body.error) return res.status(500).send({error});
    if (!req.body.users) return res.status(404).send({message: 'User Not Found'});
    let users = req.body.users;
    return res.status(200).send({users});
}

function doWithdraw(req, res) {
    if (req.body.error) return res.status(500).send({error});
    if (!req.body.users) return res.status(404).send({message: 'User Not Found'});

    const withdrawal = {amount: req.body.amount, date: new Date()};

    let user = req.body.users[0];
    // Check if user has enough money
    if (user.balance >= withdrawal.amount) {
        // Remove Balance
        user.balance -= withdrawal.amount;
        // Push withdrawal to user history
        user.history.withdrawals.push(withdrawal);

        return User.findOneAndUpdate({_id: user._id}, user, (err, user) => {
            if (err) return res.status(500).send({err});
            return res.status(201).send({user});
        });
    } else {
        return res.status(400).send({message: 'User does not have enough money'});
    }
}

function doDeposit(req, res) {
    if (req.body.error) return res.status(500).send({error});
    if (!req.body.users) return res.status(404).send({message: 'User Not Found'});

    const deposit = {amount: req.body.amount, date: new Date()};

    let user = req.body.users[0];

    // Add Balance
    user.balance += req.body.amount;
    // Push deposit to user history
    user.history.deposits.push(deposit);

    return User.findOneAndUpdate({_id: user._id}, user, (err, user) => {
        if (err) return res.status(500).send({err});
        return res.status(201).send({user});
    });
}

function find(req, res, next) {
    let query = {};
    if (req.params.key === 'email' || req.params.key === 'id') {
        query[req.params.key] = req.params.value
        User.find(query).then(users => {
            if (!users.length) return next();
            req.body.users = users;
            return next();
        }).catch(err => {
            req.body.error = err;
            next();
        })
    } else {
        req.body.error = "Invalid key, please use 'email' or 'id'";
        next();
    }
}

module.exports = {
    find,
    getAll,
    create,
    doDeposit,
    doWithdraw,
    show
}