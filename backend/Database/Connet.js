import mongoose from 'mongoose';
import colors from 'colors'


const connect = async () => {
  try {
    const conn = await mongoose.connect(process.env.DB_URL);


    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1); // Exit the process with failure
  }
};

export default connect;
