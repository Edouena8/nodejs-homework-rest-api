const express = require("express");
const { validateBody, authenticate } = require("../middlewares");
const { schemas } = require("../models/user");
const {
  register,
  login,
  getCurrent,
  logout,
  updateSubscription,
} = require("../controllers/users");

const router = express.Router();

router.post("/register", validateBody(schemas.registerSchema), register);

router.post("/login", validateBody(schemas.loginSchema), login);

router.get("/current", authenticate, getCurrent);

router.post("/logout", authenticate, logout);

router.patch(
  "/",
  authenticate,
  validateBody(schemas.subscrSchema),
  updateSubscription
);

module.exports = router;
