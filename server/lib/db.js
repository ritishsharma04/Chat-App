import mongoose from "mongoose";

//FUNCTION TO CONNECT TO THE MONGODB DATABASE
export const connectDb = async () => {
  try {
    // 1. EVENT LISTENER FOR WHEN THE MONGOOSE CONNECTION IS SUCCESSFUL
    mongoose.connection.on("connected", () => {
      console.log("Database Connected");
    })

    // 2. CONNECTS MONGOOSE TO THE MONGODB SERVER
    await mongoose.connect(`${process.env.MONGODB_URI}/chat-app`)

} catch (error) {
    // 3. IF SOMETHING GOES WRONG, PRINT THE ERROR
    console.log(`Database Not Connected : ${error}`);
  }
};



