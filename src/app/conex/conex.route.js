/* eslint-disable new-cap */
import express from "express";
import expressJwt from "express-jwt";

import config from "../../config/config";
import authorize from "../auth/authorize";
import Permissions from "../auth/permissions";
import ConexAdminController from "./controllers/admin";

const router = express.Router();

router
  .route("/admin")
  .get(
    expressJwt({ secret: config.jwtSecret }),
    authorize(Permissions.CONEX_READ),
    ConexAdminController.list
  )
  .post(
    expressJwt({ secret: config.jwtSecret }),
    authorize(Permissions.CONEX_CREATE),
    ConexAdminController.create
  );

router
  .route("/admin/assign/:id")
  .put(
    expressJwt({ secret: config.jwtSecret }),
    authorize(Permissions.CONEX_ASSIGN),
    ConexAdminController.assign
  );

export default router;
