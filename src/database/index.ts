import mongoose from "mongoose";

export function connnectToDatabase() {
  mongoose
    .connect("mongodb://localhost:27017/your-database")
    .then(() => {
      console.log("Connected to database");
    })
    .catch(() => {
      console.log("Failed to connect to database");
    });
}
