import { UserMysql } from "~~/server/services/mysql";
import jwt from "jsonwebtoken";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const config = useRuntimeConfig();

  // Validate the user data
  if (!body) {
    throw createError({ statusMessage: "invalid User Data" });
  }
  // Update the user in the database
  const updatedUser = await UserMysql.update(body);
  if (!updatedUser) {
    throw createError({ statusMessage: "Failed to update user" });
  }
  /* actualizar cookie */
  const token = jwt.sign(updatedUser, config.tokenSecret);
  setCookie(event, "access_token", token);

  return {
    success: true,
    data: updatedUser,
  };
});
