const router = require("express").Router();
const { getAllRoleController } = require("../controllers/RoleController");

router.get("/", getAllRoleController);
module.exports = router;
