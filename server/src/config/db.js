import mongoose from "mongoose";

export const connectDb = async (uri) => {
  if (!uri) {
    throw new Error("MONGO_URI is missing");
  }
  await mongoose.connect(uri);
  console.log("Connected to MongoDB");
};
