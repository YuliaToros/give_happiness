const router = require("express").Router();
const CityRouter = require("./api.city.routes");
const AuthRegRouter = require('./api.auth.routes');
const RoleRouter = require('./api.role.routes')

router.use("/api/city",CityRouter).use('/api/auth',AuthRegRouter).use('/api/role',RoleRouter)

module.exports = router