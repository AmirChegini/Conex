/* eslint-disable new-cap */
import express from "express";
import expressJwt from "express-jwt";

import config from "../../config/config";
import authorize from "../auth/authorize";
import Permissions from "../auth/permissions";
import ReportAdminController from "./controllers/admin";

const router = express.Router();

router
  .route("/admin/request")
  .get(
    expressJwt({ secret: config.jwtSecret }),
    authorize(Permissions.REPORT_REQUEST),
    ReportAdminController.request
  );

router
  .route("/admin/conex")
  .get(
    expressJwt({ secret: config.jwtSecret }),
    authorize(Permissions.REPORT_REQUEST),
    ReportAdminController.conex
  );

export default router;
