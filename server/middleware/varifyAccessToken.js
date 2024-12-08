const jwt = require("jsonwebtoken");

function varifyAccessToken(req, res, next) {
  try {
    
    //console.log(333, req.headers.authorization.split(" ")[1]);
    const accessToken = req.headers.authorization.split(" ")[1];
    
    
    const { user } = jwt.verify(accessToken, process.env.ACCESS_TOKEN);

    res.locals.user = user;

    next();
  } catch (error) {
    console.log(error);

    console.log("Invalid access token");
    res.status(403).send("Invalid access token");
  }
}

module.exports = varifyAccessToken;
