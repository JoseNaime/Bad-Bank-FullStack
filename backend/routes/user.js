const express = require('express');
const UserController = require('../controllers/UserController');

const router = express.Router();

router
    .get('/', UserController.getAll)
    .post('/', UserController.create)
    .get('/:key/:value', UserController.find, UserController.show)
    .put('/deposit/:key/:value', UserController.find, UserController.doDeposit)
    .put('/withdraw/:key/:value', UserController.find, UserController.doWithdraw)
;

module.exports = router;