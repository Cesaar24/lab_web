import { UserRepository } from "../../services/user";
import jwt from "jsonwebtoken";
export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const body = await readBody(event);
  const user = await UserRepository.login(body);

  const token = jwt.sign(user, config.tokenSecret, {
    expiresIn: config.tokenExpiration,
  });
  setCookie(event, "access_token", token);

  return user;
});
