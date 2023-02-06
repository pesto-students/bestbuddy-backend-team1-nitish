module.exports = (mongoose) => {
    const users = mongoose.model(
        'users',
        mongoose.Schema(
            {
                firstName: { type: String, required: true },
                lastName: { type: String, required: true },
                gender: { type: String, required: true },
                number: { type: Number, required: true },
                email: { type: String, required: true },
                password: { type: String, required: true },
                isLoggedIn: { type: Boolean, required: true, default: false },
                token: { type: String, default: '' }
            },
            { timestamps: true }
        )
    )

    return users;
}
