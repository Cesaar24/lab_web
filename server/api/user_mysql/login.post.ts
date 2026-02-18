import { UserMysql } from "~~/server/services/mysql";
import jwt from "jsonwebtoken";
export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const config = useRuntimeConfig();
  try {
    const user = (await UserMysql.login(body)) as User;
    const token = jwt.sign(user, config.tokenSecret, {
      expiresIn: config.tokenExpiration,
    });
    setCookie(event, "access_token", token);
    return {
      success: true,
      data: user,
    };
  } catch (error) {
    console.error("Error de BD:", error);
    throw createError({
      statusCode: 500,
      statusMessage: String(error),
    });
  }
});
