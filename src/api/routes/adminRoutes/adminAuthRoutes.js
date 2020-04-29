const express = require('express');
const router = express.Router();
const passport = require('passport');

const admin = require('../../controller/adminControllers/adminAuthController');

router.post('/adminRegister', admin.adminRegister);
router.post('/adminLogin', admin.adminLogin);
router.get(
  '/adminRestrict',
  passport.authenticate('jwt', { session: false }),
  admin.adminRestrict
);

module.exports = router;
