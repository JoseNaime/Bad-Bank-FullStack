const User = require('../models/User');
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
    if (!req.body.user) return res.status(404).send({message: 'User Not Found'});

    const withdrawal = {amount: req.body.amount, date: new Date()};

    let newUser = req.body.user;
    // Check if user has enough money
    if (newUser.balance >= withdrawal.amount) {
        // Remove Balance
        newUser.balance -= withdrawal.amount;
        // Push withdrawal to user history
        newUser.history.withdrawals.push(withdrawal);

        return User.findOneAndUpdate({_id: newUser._id}, newUser, (err, user) => {
            if (err) return res.status(500).send({err});
            return res.status(201).send({newUser});
        });
    } else {
        return res.status(400).send({message: 'User does not have enough balance'});
    }
}

function doDeposit(req, res) {
    if (req.body.error) return res.status(500).send({error});
    if (!req.body.user) return res.status(404).send({message: 'User Not Found'});

    const deposit = {amount: req.body.amount, date: new Date()};

    let newUser = req.body.user;

    // Add Balance
    newUser.balance += req.body.amount;
    // Push deposit to user history
    newUser.history.deposits.push(deposit);

    return User.findOneAndUpdate({_id: newUser._id}, newUser, (err, user) => {
        if (err) return res.status(500).send({err});
        return res.status(201).send({newUser});
    });
}

function findByParam(req, res, next) {
    let query = {};
    if (req.params.key === 'email' || req.params.key === 'id') {
        query[req.params.key] = req.params.value
        User.findOne(query).then(user => {
            if (!user) return next();
            req.body.user = user;
            return next();
        }).catch(err => {
            req.body.error = err;
            next();
        })
    } else {
        req.body.error = "Invalid params, please use 'email' or 'id'";
        next();
    }
}

function findByBody(req, res, next) {
    console.log(req.body.email);
    if (req.body.email) {
        User.findOne({'email': req.body.email }).then(user => {
            if (!user) return next();
            req.body.user = user;
            console.log(req.body);
            return next();
        }).catch(err => {
            req.body.error = err;
            next();
        })
    } else {
        req.body.error = "Invalid params, please use 'email' or 'id'";
        next();
    }
}

module.exports = {
    findByParam,
    findByBody,
    getAll,
    create,
    doDeposit,
    doWithdraw,
    show
}