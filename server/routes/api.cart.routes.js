const router = require("express").Router();
const CartController = require("../controllers/CartController");
const ItemCartController = require("../controllers/ItemCartController");
const ItemOrderController = require("../controllers/ItemOrderController");
const varifyAccessToken = require("../middleware/varifyAccessToken");

router.get("/", varifyAccessToken,CartController.getUserCartController);
router.post("/:cartId", varifyAccessToken,CartController.addItemToCartController);

// router.delete("/:id", varifyAccessToken,CartController.deleteCartController);

router.delete("/:cartId/items/:itemId", varifyAccessToken, ItemCartController.deleteItemCartController);


module.exports = router;

