import login from "./auth.broker.login.controller";
import logout from "./auth.broker.logout.controller";

class AuthBrokerController {
  static login = login;
  static logout = logout;
}

export default AuthBrokerController;
