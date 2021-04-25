/* eslint-disable new-cap */
import express from "express";
import expressJwt from "express-jwt";

import config from "../../config/config";
import authorize from "../auth/authorize";
import Permissions from "../auth/permissions";
import AdminAdminController from "./controllers/admin";

const router = express.Router();

router
  .route("/admin")
  .get(
    expressJwt({ secret: config.jwtSecret }),
    authorize(Permissions.ADMIN_READ),
    AdminAdminController.list
  )
  .post(
    expressJwt({ secret: config.jwtSecret }),
    authorize(Permissions.ADMIN_CREATE),
    AdminAdminController.create
  );

router
  .route("/admin/permissions")
  .get(
    expressJwt({ secret: config.jwtSecret }),
    authorize(Permissions.ADMIN_READ),
    AdminAdminController.permissionList
  );
router
  .route("/admin/:id/sendPassword")
  .put(
    expressJwt({ secret: config.jwtSecret }),
    authorize(Permissions.ADMIN_CREATE),
    AdminAdminController.sendPassword
  );

router
  .route("/admin/:id")
  .put(
    expressJwt({ secret: config.jwtSecret }),
    authorize(Permissions.ADMIN_CREATE),
    AdminAdminController.update
  );

export default router;
