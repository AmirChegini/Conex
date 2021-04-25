import login from "./auth.admin.login.controller";
import logout from "./auth.admin.logout.controller";
class AuthAdminController {
  static login = login;
  static logout = logout;
}

export default AuthAdminController;
