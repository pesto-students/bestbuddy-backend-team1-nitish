const jwt = require('jsonwebtoken');

const db = require('../models/index');
const users = db.users;
const validator = require('../middleware/validation-middleware');
const { userValidator, loginValidator } = require('../utils/validation-schema');


exports.signUp = (req, res) => {
    try {
        validator(req.body, userValidator.rules, userValidator.customError, (err, status) => {
            if (!status) {
                res.status(412).send({
                    success: false,
                    message: Object.values(err.errors)[0][0],
                })
            } else {
                users.findOne({ email: req.body.email })
                    .then((user) => {
                        if (user) {
                            res.status(400).send({
                                success: false,
                                message: 'Email is already exist.'
                            })
                            return;
                        }

                        const newUser = new users(req.body);
                        newUser.save()
                            .then(() => {
                                res.status(201).send({
                                    success: true,
                                    message: 'Successfully Created!'
                                })
                            })
                            .catch(() => {
                                res.status(400).send({
                                    success: false,
                                    message: 'Sorry, account is not created please try again.',
                                })
                            })

                    })
                    .catch(() => {
                        res.status(400).send({
                            success: false,
                            message: 'Sorry, something went to wrong try again'
                        })
                    })
            }
        })
    }
    catch (err) {
        res.status(500).send({
            status: false,
            message: "Interal server error please agian later!"
        })
    }
}

exports.signIn = (req, res) => {
    try {
        validator(req.body, loginValidator.rules, loginValidator.customError, (err, status) => {
            if (!status) {
                res.status(412).send({
                    success: false,
                    message: Object.values(err.errors)[0][0],
                })
            } else {
                users.findOne({ email: req.body.email })
                    .then((user) => {
                        if (user) {
                            if (req.body.password !== user.password) {
                                res.status(400).send({
                                    status: false,
                                    message: "Password is incorrect.",
                                })
                                return;
                            }

                            const token = jwt.sign({ id: user._id, name: user.userName, email: req.body.email }, process.env.PRIVATEKEY);
                            users.updateOne({ email: req.body.email }, { $set: { token, isLoggedIn: true } })
                                .then(() => {
                                    res.status(200).send({
                                        status: true,
                                        message: "Loggedin successfully!",
                                        token,
                                    })
                                })

                        } else {
                            res.status(404).send({
                                status: false,
                                message: "Email doesn't exist.",
                            })
                        }
                    })
                    .catch(() => {
                        res.status(400).send({
                            status: false,
                            message: "Sorry, something went to wrong try again.",
                        })
                    })
            }
        })
    }
    catch (err) {
        res.status(500).send({
            status: false,
            message: "Internal server error, Please try again later!",
        })
    }
}

exports.signOut = (req, res) => {
    try {
        const { token } = req.body;

        if (!token) {
            res.status(404).send({
                status: false,
                message: "Unique token is required.",
            })
            return;
        }

        jwt.verify(token, process.env.PRIVATEKEY, (err, decoded) => {
            if (err) {
                res.status(400).send({
                    status: false,
                    message: "Invalid token.",
                })
            } else {
                users.updateOne({ email: decoded.email }, { $set: { token: "", isLoggedIn: false } })
                    .then(() => {
                        res.status(200).send({
                            status: true,
                            message: "LoggedOut successfully.",
                        })
                    })
            }
        })

    }
    catch (err) {
        res.status(500).send({
            status: false,
            message: "Internal server error, Please try again later!",
        })
    }
}

exports.getUserDetails = (req, res) => {
    try {
        const { email } = req.body;
        if (!email) return res.status(401).send({ message: 'access denied' });
        const match = { $match: { 'email': email } };
        const lookup = {
            $lookup: {
                from: "properties",
                localField: "_id",
                foreignField: "user_id",
                as: "propertyDetails"
            }
        };
        const stage = [match, lookup];
        users.aggregate(stage)
            .then((data) => {
                const userInfo = {
                    id: data[0]._id,
                    name: data[0].userName,
                    gender: data[0].gender,
                    number: data[0].number,
                    email: data[0].email,
                    property: data[0].propertyDetails
                }

                res.status(200).send({
                    status: true,
                    data: userInfo
                })
            })
    }
    catch (err) {
        console.log(err)
        res.status(500).send({
            status: false,
            message: "Internal server error, Please try again later!",
        })
    }
}