const router = require("express").Router();
const CityRouter = require("./api.city.routes");
const AuthRegRouter = require("./api.auth.routes");
const RoleRouter = require("./api.role.routes");
const UserRouter = require("./api.user.routes");
const OrderRouter = require("./api.user.routes");
const CartRouter = require("./api.user.routes");
const ItemRouter = require("./api.user.routes");
const ItemOrderRouter = require("./api.user.routes");
const ItemCartRouter = require("./api.user.routes");

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
