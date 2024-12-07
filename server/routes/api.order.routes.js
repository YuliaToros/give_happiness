const router = require("express").Router();
const OrderController = require("../controllers/OrderController");
const varifyAccessToken = require("../middleware/varifyAccessToken");

router.get("/", OrderController.getAllOrdersController);
router.post("/", varifyAccessToken, OrderController.createOrderController);
router.put("/", varifyAccessToken, OrderController.updateOrderController);
router.delete("/:id", varifyAccessToken, OrderController.deleteOrderController);
router.get("/", OrderController.getOneOrderController);
module.exports = router;
