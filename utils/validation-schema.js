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

const addPropertyValidator = {
    rules: {
        name: 'required',
        city: 'required',
        phone: 'required',
        rent: 'required',
        gender: 'required',
        category: 'required',
        availableDate: 'required',
        typeOfShare: 'required',
        amenties: 'required',
        perfrences: 'required',
        image: 'required'
    },
    customError: {}
}

module.exports = { userValidator, loginValidator, addPropertyValidator }