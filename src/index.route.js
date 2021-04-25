import express from "express";

import adminRouter from "./app/admin/admin.route";
import authRouter from "./app/auth/auth.route";
import brokerRouter from "./app/broker/broker.route";
import conexRouter from "./app/conex/conex.route";
import dumpRouter from "./app/dump/dump.route";
import requestRouter from "./app/request/request.route";
import customerRouter from "./app/customer/customer.route";
import reportRouter from "./app/report/report.route";

const router = express.Router(); // eslint-disable-line new-cap

router.get("/health-check", (req, res) => res.send("OK"));

router.use("/admin", adminRouter);
router.use("/auth", authRouter);
router.use("/broker", brokerRouter);
router.use("/conex", conexRouter);
router.use("/dump", dumpRouter);
router.use("/request", requestRouter);
router.use("/customer", customerRouter);
router.use("/report", reportRouter);

export default router;
