const jwt = require("jsonwebtoken");
const dotenv = require("dotenv")
dotenv.config();

const createToken = (payload) => {
    return jwt.sign(payload.toJSON(), process.env.JWT_SECRET_TOKEN, { expiresIn: '1h' });
}

const verifyUser = async(req, res, next) => {
     try {
    const token = req.headers.authorization && req.headers.authorization.split(" ")[1];
    console.log(token);
    const decoded = jwt.verify(token, process.env.JWT_SECRET_TOKEN);
    req.user = decoded;
    next();
  } catch (error) {
    console.error(error);
    return res.status(400).json({ err: "Login expired!/nPlease login again!" });
  }
}

module.exports = {
    verifyUser,
    createToken
}
