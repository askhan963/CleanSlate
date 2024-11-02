import mongoose from 'mongoose'

const connectDB = async () => {
    try {
        console.log(process.env.MONGO_URI)
        const conn = await mongoose.connect(process.env.MONGO_URI, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        });
        console.log(`MongoDB connected: ${conn.connection.host}`);
      } catch (error) {
        console.log(error);
        process.exit(1);
      }
}

export default connectDB