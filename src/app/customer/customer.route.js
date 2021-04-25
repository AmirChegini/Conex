/* eslint-disable new-cap */
import express from "express";
import expressJwt from "express-jwt";

import config from "../../config/config";
import CustomerAdminController from "./controllers/admin";

const router = express.Router();

router
  .route("/admin")
  .get(expressJwt({ secret: config.jwtSecret }), CustomerAdminController.list);

export default router;
