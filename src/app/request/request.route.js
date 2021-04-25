/* eslint-disable new-cap */
import express from "express";
import expressJwt from "express-jwt";

import config from "../../config/config";
import RequestBrokerController from "./controllers/broker";
import RequestAdminController from "./controllers/admin";

const router = express.Router();

router
  .route("/broker")
  .get(expressJwt({ secret: config.jwtSecret }), RequestBrokerController.list)
  .post(
    expressJwt({ secret: config.jwtSecret }),
    RequestBrokerController.create
  );
router
  .route("/admin")
  .get(expressJwt({ secret: config.jwtSecret }), RequestAdminController.list);
export default router;
