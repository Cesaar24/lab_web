import { getUserToken } from "../utils/session";
/* import { getUserTokenGoogle } from "../utils/sessionGoogle"; */

export default defineEventHandler(async (event) => {
  let user = await getUserToken(event);
  /* console.log("Middleware auth() :", user); */

  if (!user) {
    /* Google */
    /*  try {
      user = await getUserTokenGoogle(event);
    } catch (err: any) {
      console.log(err.message);
    } */

    if (!user) {
      event.context.user = null;
    }
    if (user) {
      event.context.user = user;
    }
  } else {
    /*    console.log("middleware server:", user); */

    event.context.user = user;
  }
});
