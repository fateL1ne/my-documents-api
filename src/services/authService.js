const jwt = require('jsonwebtoken');

verifyToken = (req, res, next) => {
    const token = req.headers["X-access-token"] || req.headers["Authorization"];

    if (token) {
        jwt.decode(token, process.env.SECRET_KEY);
        next();
    } else {
        return res.status(401).send("No token provided");
    }
}

generateToken = (user) => {
    return jwt.sign(user, process.env.TOKEN_SECRET);
}

exports.verifyJWT = verifyToken
exports.generateJWT = generateToken