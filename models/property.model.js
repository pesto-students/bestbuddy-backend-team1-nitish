module.exports = (mongoose) => {
    const properties = mongoose.model(
        'properties',
        mongoose.Schema(
            {
                user_id: { type: mongoose.Schema.Types.ObjectId, required: true },
                user_name: { type: String, required: true },
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
                perfrences: { type: [String], required: true },
                image: { type: [String], required: true }
            },
            { timestamps: true }
        )
    )

    return properties;
}