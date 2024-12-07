const router = require("express").Router();
const UserController = require("../controllers/UserController");
const varifyAccessToken = require("../middleware/varifyAccessToken");

router.get("/", UserController.getAllUsersController);
router.post("/", varifyAccessToken,UserController.createUserController);
router.put("/", varifyAccessToken,UserController.updateUserController);
router.delete("/:id", varifyAccessToken,UserController.deleteUserController);
router.get("/",UserController.getOneUserController)
module.exports = router;
