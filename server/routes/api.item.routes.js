const router = require("express").Router();
const ItemController = require("../controllers/ItemController");
const varifyAccessToken = require("../middleware/varifyAccessToken");

router.get("/", ItemController.getAllItemsController);
router.post("/", varifyAccessToken,ItemController.createItemController);
router.put("/", varifyAccessToken,ItemController.updateItemController);
router.delete("/:id", varifyAccessToken,ItemController.deleteItemController);
router.get("/",ItemController.getAllItemsController)
module.exports = router;
