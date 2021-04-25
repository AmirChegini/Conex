/* eslint-disable new-cap */
import express from "express";
import expressJwt from "express-jwt";

import config from "../../config/config";
import AuthAdminController from "./controllers/admin";
import AuthBrokerController from "./controllers/broker";

const router = express.Router();

router.route("/admin/login").post(AuthAdminController.login);

router
  .route("/admin/logout")
  .put(expressJwt({ secret: config.jwtSecret }), AuthAdminController.logout);

router.route("/broker/login").post(AuthBrokerController.login);

router
  .route("/broker/logout")
  .put(expressJwt({ secret: config.jwtSecret }), AuthBrokerController.logout);

export default router;
