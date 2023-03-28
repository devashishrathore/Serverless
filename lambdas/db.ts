// // "use strict";

// // import mongoose from "mongoose";

// // interface ConnectOptions {
// //   useNewUrlParser: boolean;
// //   useUnifiedTopology: boolean;
// //   useCreateIndex: boolean;
// //   useFindAndModify: boolean;
// // }

// const uri: string | undefined = process.env.MONGODB_URI;

// // mongoose
// //   .connect(uri!, ConnectOptions={}) ConnectOptions: {
// //     useNewUrlParser: true,
// //     useUnifiedTopology: true,
// //     useCreateIndex: true,
// //     useFindAndModify: false
// //   }
// //   .then(() => console.log("MongoDB connected"))
// //   .catch((err: Error) => console.log(err));

// import mongoose from "mongoose";
// import { Connection, Model } from "mongoose";

// let connection: Connection;
// const connectDb = async (): Promise<Connection> => {
//   if (!connection) {
//     connection = await mongoose.createConnection(uri!, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true
//     });
//   }
//   return connection;
// };

// const UserModel: Model<IUser> = connectDb().then((db: Connection) => {
//   return db.model<IUser>("User", userSchema);
// });

// export default connectDb;
