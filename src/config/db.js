const mongoose = require("mongoose");

async function connectDB() {
    const mongoUri = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/Challenge_48h";

    if (!process.env.MONGO_URI) {
        console.log("MONGO_URI not set, using default local database Challenge_48h.");
    }

    mongoose.set("strictQuery", true);
    await mongoose.connect(mongoUri);

    console.log("MongoDB connected");
}

module.exports = connectDB;
