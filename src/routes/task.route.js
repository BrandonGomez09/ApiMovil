const express = require('express');
const router = express.Router();
const taskController = require('../controllers/task.controller');

router.post('/', taskController.create);
router.get('/', taskController.getTastAll);
router.get('/:id_user', taskController.getTaskById);

module.exports = router;