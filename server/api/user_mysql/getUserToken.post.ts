import { UserMysql } from "~~/server/services/mysql";
export default defineEventHandler(async (event) => {
  const _id = event.context.user?.id;
  const token = getCookie(event, "access_token");

  if (!_id) {
    /* deleteCookie(event, "access_token"); */
    return {
      success: false,
    };
  }
  try {
    const user = await UserMysql.getUserById(_id);
    if (!user) {
      throw createError({
        statusCode: 404,
        statusMessage: "User not found",
      });
    }
    return {
      success: true,
      user: user,
      token: token,
    };
  } catch (error) {
    console.error("Error de BD:", error);
    throw createError({
      statusCode: 500,
      statusMessage: String(error),
    });
  }
});
