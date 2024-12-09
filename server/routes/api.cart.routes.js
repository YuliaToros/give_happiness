const router = require("express").Router();
const CartController = require("../controllers/CartController");
const varifyAccessToken = require("../middleware/varifyAccessToken");

router.get("/", varifyAccessToken,CartController.getUserCartController);
router.post("/:cartId", varifyAccessToken,CartController.addItemToCartController);

router.delete("/:id", varifyAccessToken,CartController.deleteCartController);

module.exports = router;

