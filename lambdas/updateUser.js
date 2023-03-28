"use strict";
const Responses = require("./Api_Responses");
const User = require("./models/user");

// Update or Create a User
exports.updateUserInfo = async (event) => {
  try {
    const data = JSON.parse(event.body);
    const users = data.toArray();
    for (let i = 0; i < users.length; i++) {
      const user = users[i];
      const { userId, name, age, city } = user;
      if (userId) {
        const getUser = await User.findById({ _id: userId });
        if (!getUser) {
          continue;
        }
        await User.updateOne({ _id: userId }, { $set: { name, age, city } });
      } else {
        const user = {
          name: name,
          age: age,
          city: city
        };
        await User.create(user);
      }
    }
    return Responses._200({ message: "Users Inserted successfully" });
  } catch (error) {
    return Responses._500({ message: error.message });
  }
};

// Update age
exports.updateAge = async (event) => {
  try {
    const age = event.pathParameters.age;
    await User.updateMany({}, { $inc: { age: age } });
    return Responses._200({ message: "age updated Successfully" });
  } catch (error) {
    return Responses._500({ message: error.message });
  }
};
