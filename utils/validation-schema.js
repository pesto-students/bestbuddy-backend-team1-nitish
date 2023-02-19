const userValidator = {
    rules: {
        userName: 'required',
        gender: 'required',
        number: 'required',
        email: 'required|email',
        password: 'required|string|min:8',
    },
    customError: {}
}

const loginValidator = {
    rules: {
        email: 'required|email',
        password: 'required',
    },
    customError: {}
}

module.exports = { userValidator, loginValidator }