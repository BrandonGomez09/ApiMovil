const express = require('express');
const router = express.Router();
const adminController = require('../controllers/user.controller');

router.post('/', adminController.create);

module.exports = router;