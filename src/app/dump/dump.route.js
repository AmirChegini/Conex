/* eslint-disable new-cap */
import express from "express";
import expressJwt from "express-jwt";

import config from "../../config/config";
import authorize from "../auth/authorize";
import Permissions from "../auth/permissions";
import DumpAdminController from "./controllers/admin";
import DumpBrokerController from "./controllers/broker";

const router = express.Router();

router
  .route("/admin")
  .get(
    expressJwt({ secret: config.jwtSecret }),
    authorize(Permissions.DUMP_READ),
    DumpAdminController.list
  )
  .post(
    expressJwt({ secret: config.jwtSecret }),
    authorize(Permissions.DUMP_CREATE),
    DumpAdminController.create
  );

router
  .route("/admin/:id")
  .put(
    expressJwt({ secret: config.jwtSecret }),
    authorize(Permissions.DUMP_UPDATE),
    DumpAdminController.disable
  )
  .delete(
    expressJwt({ secret: config.jwtSecret }),
    authorize(Permissions.DUMP_DELETE),
    DumpAdminController.remove
  );

router
  .route("/broker")
  .get(expressJwt({ secret: config.jwtSecret }), DumpBrokerController.list);

export default router;
