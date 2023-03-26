"use strict";
const fs = require("fs");
const User = require("./models/user");
const Responses = require("./Api_Responses");

// From JSON File
exports.getAllUsers = async (event) => {
  try {
    console.log("event", event);
    const { limit, offset } = event.queryStringParameters || {};
    const parsedLimit = limit ? parseInt(limit, 10) : null;
    const parsedOffset = offset ? parseInt(offset, 10) : null;
    const usersJson = fs.readFileSync("users.json");
    const users = JSON.parse(usersJson);

    // validate unknown parameter
    if (
      event.queryStringParameters !== null ||
      event.queryStringParameters !== limit ||
      event.queryStringParameters !== offset
    ) {
      Responses._400({ message: "invalid Parameter" }); // confusion in this Block code (how to check unknown parameter)
    }
    // Validate the limit and offset values
    if (parsedLimit !== null && (isNaN(parsedLimit) || parsedLimit <= 0)) {
      throw new Error("Invalid limit parameter");
    }
    if (parsedOffset !== null && (isNaN(parsedOffset) || parsedOffset < 0)) {
      throw new Error("Invalid offset parameter");
    }

    if (
      !event.queryStringParameters ||
      !event.queryStringParameters.limit ||
      !event.queryStringParameters.offset
    ) {
      // without pagination
      if (!users) {
        // no users found error
        return Responses._404({ message: "No users Found" });
      }
      return Responses._200(users);
    } else {
      const allUsers = users.slice(parsedOffset, parsedOffset + parsedLimit);
      if (!allUsers) {
        // no users found error
        return Responses._404({ message: "No users Found" });
      } // return users
      return Responses._200(allUsers);
    }
  } catch (error) {
    return Responses._500({ message: error.message });
  }
};

// From DB
exports.getAllUsers = async (event) => {
  try {
    const { limit, offset } = event.queryStringParameters || {};
    const parsedLimit = limit ? parseInt(limit, 10) : null;
    const parsedOffset = offset ? parseInt(offset, 10) : null;
    // validate unknown parameter
    if (
      event.queryStringParameters !== null ||
      event.queryStringParameters !== limit ||
      event.queryStringParameters !== offset
    ) {
      Responses._400({ message: "invalid Parameter" }); // confusion in this Block code (how to check unknown parameter)
    }
    // Validate the limit and offset values
    if (parsedLimit !== null && (isNaN(parsedLimit) || parsedLimit <= 0)) {
      throw new Error("Invalid limit parameter");
    }
    if (parsedOffset !== null && (isNaN(parsedOffset) || parsedOffset < 0)) {
      throw new Error("Invalid offset parameter");
    }
    if (
      !event.queryStringParameters ||
      !event.queryStringParameters.limit ||
      !event.queryStringParameters.offset
    ) {
      // without pagination
      const users = await User.find().toArray();
      if (!users && users.length == 0) {
        // no users found error
        return Responses._404({ message: "No users Found" });
      }
      return Responses._200(users);
    } else {
      const allUsers = await User.find()
        .skip(Number(parsedOffset))
        .limit(Number(parsedLimit))
        .toArray();
      if (!allUsers && allUsers.length == 0) {
        // no users found error
        return Responses._404({ message: "No users Found" });
      } // return users
      return Responses._200(allUsers);
    }
  } catch (error) {
    return Responses._500({ message: error.message });
  }
};
