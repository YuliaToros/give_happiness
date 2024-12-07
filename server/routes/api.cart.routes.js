const router = require("express").Router();
const CartController = require("../controllers/CartController");
const varifyAccessToken = require("../middleware/varifyAccessToken");

router.get("/", CartController.getAllCartsController);
router.post("/", varifyAccessToken,CartController.createCartController);
router.put("/", varifyAccessToken,CartController.updateCartController);
router.delete("/:id", varifyAccessToken,CartController.deleteCartController);
router.get("/",CartController.getOneCartController)
module.exports = router;

