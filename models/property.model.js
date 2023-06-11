module.exports = (mongoose) => {
  const properties = mongoose.model(
    "properties",
    mongoose.Schema(
      {
        user_details: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: "users",
        },
        name: { type: String, required: true },
        city: { type: String, required: true },
        phone: { type: Number, required: true },
        rent: { type: Number, required: true },
        details: { type: String },
        gender: { type: String, required: true },
        category: { type: String, required: true },
        availableDate: { type: String, required: true },
        typeOfShare: { type: String, require: true },
        amenties: { type: [String], required: true },
        preferences: { type: [String], required: true },
        image: { type: [String], required: true },
      },
      { timestamps: true }
    )
  );

  return properties;
};
