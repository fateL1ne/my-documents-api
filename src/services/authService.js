const jwt = require('jsonwebtoken');

verifyToken = (req, res, next) => {
    const token = req.headers["authorization"].split(' ')[1];

    if (token) {
        try {
            let decoded = jwt.verify(token, process.env.TOKEN_SECRET);
            req.uuid = decoded;
            next();
        } catch (err) {
            res.status(403).send("Wrong token")
        }

    } else {
        res.status(401).send("Missing token")
    }
}

generateToken = (user) => {
    return jwt.sign(user, process.env.TOKEN_SECRET);
}

exports.verifyJWT = verifyToken
exports.generateJWT = generateToken