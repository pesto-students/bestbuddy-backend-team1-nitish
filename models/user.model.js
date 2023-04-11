module.exports = (mongoose) => {
  const users = mongoose.model(
    "users",
    mongoose.Schema(
      {
        userName: { type: String, required: true },
        gender: { type: String, required: true },
        number: { type: Number, required: true },
        email: { type: String, required: true },
        city: { type: String, required: true },
        preferences: { type: [String] },
        password: { type: String, required: true },
        isLoggedIn: { type: Boolean, required: true, default: false },
        token: { type: String, default: "" },
      },
      { timestamps: true }
    )
  );

  return users;
};
