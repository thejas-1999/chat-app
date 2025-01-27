import mongoose from "mongoose";

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log(`Connected to database`);
  } catch (error) {
    console.log(`Connection error`, error.message);
  }
};

export default connectDb;
