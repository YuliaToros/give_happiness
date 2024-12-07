const router = require("express").Router();
const CityRouter = require("./api.city.routes");
const AuthRegRouter = require("./api.auth.routes");
const RoleRouter = require("./api.role.routes");
const UserRouter = require("./api.user.routes");
const OrderRouter = require("./api.order.routes");
const CartRouter = require("./api.cart.routes");
const ItemRouter = require("./api.item.routes");
const ItemOrderRouter = require("./api.itemOrder.routes");
const ItemCartRouter = require("./api.itemCart.routes");

router
  .use("/api/city", CityRouter)
  .use("/api/auth", AuthRegRouter)
  .use("/api/role", RoleRouter)
  .use("/api/user", UserRouter)
  .use("/api/order", OrderRouter)
  .use("/api/cart", CartRouter)
  .use("/api/item", ItemRouter)
  .use("/api/iorder", ItemOrderRouter)
  .use("/api/icart", ItemCartRouter);

module.exports = router;
