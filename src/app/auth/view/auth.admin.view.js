import jwt from "jsonwebtoken";
import config from "../../../config/config";
import RoleView from "../../common/role.view";

class AuthAdminView {
  static token = (admin) =>
    jwt.sign(
      {
        userId: admin._id,
        username: admin.username,
        role: RoleView.ADMIN,
        permissions: admin.permissions,
        regions: admin.regions,
      },
      config.jwtSecret
    );

  static login = ["fullName", "token", "permissions", "regions"];

  static MAX_ALLOWED_ATTEMPTS = 5;
}

export default AuthAdminView;
