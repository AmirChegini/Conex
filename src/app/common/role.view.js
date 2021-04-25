class RoleView {
  static ADMIN = "ADMIN";
  static BROKER = "BROKER";

  static ROLES = [
    RoleView.ADMIN,
    RoleView.BROKER,
  ];

  static isAdmin = (role) => {
    return role === RoleView.ADMIN;
  };

  
  static isBroker = (role) => {
    return role === RoleView.BROKER;
  };

  static isAnyUser = (role) => {
    return RoleView.ROLES.includes(role);
  };
}

export default RoleView;
