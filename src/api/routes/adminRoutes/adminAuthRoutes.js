const express = require('express');
const router = express.Router();

const admin = require('../../controller/adminControllers/adminAuthController');

router.post('/register', admin.adminRegister);
