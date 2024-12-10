const router = require("express").Router();
const ItemCartController = require("../controllers/ItemCartController");
const varifyAccessToken = require("../middleware/varifyAccessToken");

router.get("/", ItemCartController.getAllItemCartsController);
router.post("/:id", varifyAccessToken,ItemCartController.createItemCartController);
// router.put("/", varifyAccessToken,ItemOrderController);
router.delete("/:cartId/items/:itemId", varifyAccessToken, ItemCartController.deleteItemCartController);
console.log("Router initialized");
router.get("/",ItemCartController.getOneItemCartController)
module.exports = router;

