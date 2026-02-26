import { UserMysql } from "~~/server/services/mysql";
export default defineEventHandler(async (event) => {
  const _id = event.context.user?.id;
  if (!_id) {
    deleteCookie(event, "access_token");
    return {
      success: false,
    };
  }

  const response = (await UserMysql.verifyRole(_id)) as {
    success: boolean;
    role: string | null;
  };
  if (response.success) {
    return {
      success: true,
      role: response.role,
    };
  } else {
    return {
      success: false,
      role: response.role,
    };
  }
});
