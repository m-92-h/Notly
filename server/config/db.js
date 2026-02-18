import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DATABASE_URL);
        console.log("✅ Connected to MongoDB Successfully");
    } catch (err) {
        console.error("❌ Connection error:", err.message);
        process.exit(1);
    }
};

export default connectDB;
