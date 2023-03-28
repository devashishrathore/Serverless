import { APIGatewayProxyHandler } from "aws-lambda";
import User from "./models/user";
import Responses from "./Api_Responses";

interface QueryStringParameters {
  limit?: string;
  offset?: string;
}

export const getAllUsers: APIGatewayProxyHandler = async (event) => {
  try {
    const { limit, offset } =
      (event.queryStringParameters as QueryStringParameters) || {};
    const parsedLimit = limit ? parseInt(limit, 10) : null;
    const parsedOffset = offset ? parseInt(offset, 10) : null;

    // Validate unknown parameter
    if (
      event.queryStringParameters &&
      Object.keys(event.queryStringParameters).some(
        (key) => key !== "limit" && key !== "offset"
      )
    ) {
      return Responses._400({ message: "Invalid parameter" });
    }
    // Validate the limit and offset values
    if (parsedLimit !== null && (isNaN(parsedLimit) || parsedLimit <= 0)) {
      throw new Error("Invalid limit parameter");
    }
    if (parsedOffset !== null && (isNaN(parsedOffset) || parsedOffset < 0)) {
      throw new Error("Invalid offset parameter");
    }
    if (!limit && !offset) {
      // Without pagination
      const users = await User.find();
      if (!users || users.length === 0) {
        return Responses._404({ message: "No users found" });
      }
      return Responses._200(users);
    } else {
      const allUsers = await User.find()
        .skip(parsedOffset || 0)
        .limit(parsedLimit || 0);

      if (!allUsers || allUsers.length === 0) {
        return Responses._404({ message: "No users found" });
      }
      return Responses._200(allUsers);
    }
  } catch (error) {
    return Responses._500({ message: error.message });
  }
};
