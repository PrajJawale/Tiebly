import mongoose from 'mongoose'
const connectDB = async ()=>{
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("DB connected successfully")
  } catch (error) {
    console.log("Error in DB Connection")
  }
}

export default connectDB;