const express = require("express");
const router = express.Router();
const passport = require("passport");

const admin = require("../../controller/adminControllers/adminAuthController");

router.post("/adminRegister", admin.adminRegister);
router.post("/adminLogin", admin.adminLogin);
router.get(
  "/adminRestrict",
  passport.authenticate("jwt", { session: false }),
  admin.adminRestrict
);

router.get(
  "/org",
  passport.authenticate("jwt", { session: false }),
  admin.adminOrgAccess
);

router.post(
  "/org",
  passport.authenticate("jwt", { session: false }),
  admin.adminOrgCreate
);

router.post(
  "/subject",
  passport.authenticate("jwt", { session: false }),
  admin.adminSubCreate
);

router.get(
  "/subject",
  passport.authenticate("jwt", { session: false }),
  admin.adminSubAccess
);

module.exports = router;
