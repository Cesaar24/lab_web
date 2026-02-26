import { getUserToken } from "../utils/session";
export default defineEventHandler(async (event) => {
  let user = await getUserToken(event);
  if (!user || !user.success) {
    event.context.user = null;
  } else {
    event.context.user = user.user;
  }
});
