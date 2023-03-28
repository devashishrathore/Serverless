import { APIGatewayProxyHandler } from "aws-lambda";
import User from "./models/user";
import Responses from "./Api_Responses";

interface UserObject {
  userId: string;
  name: string;
  age: number;
  city: string;
}

interface RequestBody {
  users: UserObject[];
}

// Update or Create a User
export const updateUserInfo: APIGatewayProxyHandler = async (event: any) => {
  try {
    const { users } = JSON.parse(event.body) as RequestBody;

    for (const user of users) {
      const { userId, name, age, city } = user;
      if (userId) {
        const getUser = await User.findById({ _id: userId });
        if (!getUser) {
          continue;
        }
        await User.updateOne({ _id: userId }, { $set: { name, age, city } });
      } else {
        const newUser = {
          name: name,
          age: age,
          city: city
        };
        await User.create(newUser);
      }
    }
    return Responses._200({ message: "Users Inserted successfully" });
  } catch (error) {
    return Responses._500({ message: error.message });
  }
};

// Update age
export const updateAge: APIGatewayProxyHandler = async (event: any) => {
  try {
    const age = Number(event.pathParameters.age);
    await User.updateMany({}, { $inc: { age: age } });
    return Responses._200({ message: "age updated Successfully" });
  } catch (error) {
    return Responses._500({ message: error.message });
  }
};
