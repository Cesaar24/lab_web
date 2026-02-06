import { UserRepository } from "../../services/user";
export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  // Validate the user data
  if (!body) {
    throw createError({ statusMessage: "invalid User Data" });
  }

  // Update the user in the database
  const updatedUser = await UserRepository.update(body);
  if (!updatedUser) {
    throw createError({ statusMessage: "Failed to update user" });
  }

  return {
    user: updatedUser as User,
    message: "User updated successfully",
  };
});
