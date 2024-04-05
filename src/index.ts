import app from "./app";
import { connectDB } from "./db/connectDB";
import { MONGODB_URL, PORT } from "./utils/config";

const start = async () => {
  try {
    await connectDB(MONGODB_URL);

    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}/`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
