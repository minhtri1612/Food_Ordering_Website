const express = require('express');
const router = express.Router();

const exclusiveDealsController = require('../app/controller/ExclusiveDealsController');

router.get('/create', exclusiveDealsController.create);
router.post('/store', exclusiveDealsController.store);





module.exports = router;