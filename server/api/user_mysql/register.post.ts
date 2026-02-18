import jwt from "jsonwebtoken";
import { UserMysql } from "~~/server/services/mysql";
export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const config = useRuntimeConfig();
  try {
    const user = (await UserMysql.create(body)) as User;

    /* Crear jswebtoken  */
    /* const token = jwt.sign(user, config.tokenSecret, {
      expiresIn: config.tokenExpiration,
    }); */
    const token = jwt.sign(user, config.tokenSecret);
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
