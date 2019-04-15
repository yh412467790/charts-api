var express = require('express');
var router = express.Router();

const chartController = require('../controllers/chart.controller');

router.get('/single', chartController.makeSingleChart);
router.get('/', chartController.makeChart);

module.exports = router;