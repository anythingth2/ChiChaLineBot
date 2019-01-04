const { Router } = require('express');
const { line, dialogflow } = require('./../controller');
const router = Router();

router.use('/line', line.middleware, line.handleLineEvent);
router.use('/dialogflow', dialogflow.handler);

module.exports = router;