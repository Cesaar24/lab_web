import { getUserToken } from "../../utils/session";
export default defineEventHandler(async (event) => {
  const user = (await getUserToken(event)) as User;
  if (!user) {
    return;
  }
  const [result, fields] = await pool.query(
    `SELECT * FROM users WHERE id = "${user.id}"`,
  );
  /* No hay usuario en la bd oo tiene el rol inanctiv*/
  if (Array.isArray(result) && result.length <= 0) {
    deleteCookie(event, "access_token");
    throw createError({
      statusCode: 401,
      statusMessage: "Usuario no encontrado o inactivo",
    });
  }
  return {
    success: true,
  };
});
