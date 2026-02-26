import jwt from "jsonwebtoken";
/* const createToken = async (user: User) => {
  const config = useRuntimeConfig();
  return await jwt.sign(
    {
      id: user.id,
      email: user.email,
    },
    config.tokenSecret,

    {
      expiresIn: config.tokenExpiration,
    },
  );
}; */
const verifyToken = async (token: string) => {
  try {
    const config = useRuntimeConfig();
    jwt.decode;
    return await jwt.verify(token, config.tokenSecret);
  } catch (err) {
    /* 'Token Expired' */
    /* console.error("Error al verificar el token:", err); */
    throw createError({
      statusCode: 401,
      statusMessage: "Invalid or expired token",
    });
  }
};

const getUserToken = async (event: any) => {
  const cookie = getCookie(event, "access_token");
  if (!cookie) {
    return {
      success: false,
      message: "No token provided in cookies",
    };
  }
  try {
    const token = await verifyToken(cookie);
    return {
      success: true,
      user: token,
    };
  } catch (error) {
    return {
      success: false,
      message: "Invalid or expired token",
    };
  }
  /* const token = await verifyToken(cookie);
  if (!token) {
    return null;
  }
  return token; */
};
export { getUserToken, verifyToken };
