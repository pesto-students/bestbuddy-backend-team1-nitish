const userValidator = {
    rules: {
        firstName: 'required',
        lastName: 'required',
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