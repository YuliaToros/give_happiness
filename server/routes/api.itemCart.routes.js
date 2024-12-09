const router = require("express").Router();
const ItemCartController = require("../controllers/ItemCartController");
const varifyAccessToken = require("../middleware/varifyAccessToken");

router.get("/", ItemCartController.getAllItemCartsController);
router.post("/:id", varifyAccessToken,ItemCartController.createItemCartController);
// router.put("/", varifyAccessToken,ItemOrderController);
router.delete("/:id", varifyAccessToken,ItemCartController.deleteItemCartController);
router.get("/",ItemCartController.getOneItemCartController)
module.exports = router;

