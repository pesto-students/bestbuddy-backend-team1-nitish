const jwt = require('jsonwebtoken');

module.exports = () => {
    return (req, res, next) => {
        const token = req.headers['access-token'];
        if (!token) {
            return res.status(401).send({
                message: "access denied."
            })
        }
        else {
            jwt.verify(token, process.env.PRIVATEKEY, (err, decoded) => {
                if (err) {
                    return res.status(401).send({
                        message: "access denied."
                    })
                }

                next();
            })
        }
    }
}