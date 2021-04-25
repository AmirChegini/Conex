/* eslint-disable new-cap */
import express from "express";
import expressJwt from "express-jwt";

import config from "../../config/config";
import authorize from "../auth/authorize";
import Permissions from "../auth/permissions";
import BrokerAdminController from "./controller/admin";
import BrokerBrokerController from "./controller/broker";

const router = express.Router();

router
  .route("/admin")
  .get(
    expressJwt({ secret: config.jwtSecret }),
    authorize(Permissions.BROKER_READ),
    BrokerAdminController.list
  )
  .post(
    expressJwt({ secret: config.jwtSecret }),
    authorize(Permissions.BROKER_CREATE),
    BrokerAdminController.create
  );

router
  .route("/admin/:id/sendPassword")
  .put(
    expressJwt({ secret: config.jwtSecret }),
    authorize(Permissions.BROKER_SEND_PASSWORD),
    BrokerAdminController.sendPassword
  );

router
  .route("/broker")
  .get(expressJwt({ secret: config.jwtSecret }), BrokerBrokerController.info);

export default router;
