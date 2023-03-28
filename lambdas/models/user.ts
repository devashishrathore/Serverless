import mongoose from "mongoose";
import { Connection, Model, Schema } from "mongoose";

interface IUser extends Document {
  name: string;
  age: string;
  city: string;
}

const UserSchema = new Schema<IUser>({
  name: {
    type: String,
    required: true
  },
  age: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  }
});
const uri: string | undefined = process.env.MONGODB_URI;
let connection: Connection;

const connectDb = async (): Promise<Connection> => {
  if (!connection) {
    connection = await mongoose.createConnection(uri!, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
  }
  return connection;
};

const UserModel: Model<IUser> = connectDb().then((db: Connection) => {
  return db.model<IUser>("User", UserSchema);
});

export default UserModel;
