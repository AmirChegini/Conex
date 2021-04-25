import jwt from "jsonwebtoken";
import config from "../../../config/config";
import RoleView from "../../common/role.view";

class AuthBrokerView {
  static token = (broker) =>
    jwt.sign(
      {
        userId: broker._id,
        username: broker.username,
        role: RoleView.BROKER,
        referral: broker.referral,
        conexId: broker.conexId,
        region: broker.region,
      },
      config.jwtSecret
    );

  static MAX_ALLOWED_ATTEMPTS = 5;
}

export default AuthBrokerView;
