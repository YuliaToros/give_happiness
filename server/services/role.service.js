const { Role } = require("../db/models");

class RoleService {
  static async getAllRole() {
    try {
      const roles = await Role.findAll({
        order: [["id", "ASC"]],
      });

      return roles;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}


module.exports = RoleService;
