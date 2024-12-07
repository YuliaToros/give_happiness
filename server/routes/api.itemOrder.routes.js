const router = require("express").Router();
const ItemOrderController = require("../controllers/ItemOrderController");
const varifyAccessToken = require("../middleware/varifyAccessToken");

router.get("/", ItemOrderController.getAllItemOrdersController);
router.post("/", varifyAccessToken,ItemOrderController.createItemOrderController);
// router.put("/", varifyAccessToken,ItemOrderController);
router.delete("/:id", varifyAccessToken,ItemOrderController.deleteItemOrderController);
router.get("/",ItemOrderController.getOneItemOrderController)
module.exports = router;
