const RoleService = require("../services/role.service");

exports.getAllRoleController = async (req, res) => {
  try {
    const role = await RoleService.getAllCategory();
    res.status(200).json({ message: "success", role });
  } catch (error) {
    res.status(500).json({ message: error.message, role: [] });
  }
};