const express = require('express');
const router = express.Router();

const admin = require('../../controller/adminControllers/adminAuthController');

router.post('/adminRegister', admin.adminRegister);
router.post('/adminLogin', admin.adminLogin);

module.exports = router;
