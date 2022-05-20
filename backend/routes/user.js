const express = require('express');
const UserController = require('../controllers/UserController');

const router = express.Router();

router
    .get('/', UserController.getAll)
    .post('/create', UserController.create)
    .get('/:key/:value', UserController.findByParam, UserController.show)
    .put('/deposit', UserController.findByBody, UserController.doDeposit)
    .put('/withdraw', UserController.findByBody, UserController.doWithdraw)
    .put('/transfer', UserController.findByBody, UserController.doTransfer)
;

module.exports = router;