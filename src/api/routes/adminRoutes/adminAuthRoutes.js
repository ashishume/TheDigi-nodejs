/** @format */

const express = require('express');
const router = express.Router();
const passport = require('passport');

const admin = require('../../controller/adminControllers/adminAuthController');
const adminOrg = require('../../controller/adminControllers/org/adminOrgController');
const adminSub = require('../../controller/adminControllers/subject/adminSubController');

router.post('/adminRegister', admin.adminRegister);
router.post('/adminLogin', admin.adminLogin);

router.get(
  '/org',
  passport.authenticate('jwt', { session: false }),
  adminOrg.adminOrgAccess
);

router.post(
  '/org',
  passport.authenticate('jwt', { session: false }),
  adminOrg.adminOrgCreate
);

router.get(
  '/subject',
  passport.authenticate('jwt', { session: false }),
  adminSub.adminSubAccess
);

router.post(
  '/subject',
  passport.authenticate('jwt', { session: false }),
  adminSub.adminSubCreate
);

module.exports = router;
