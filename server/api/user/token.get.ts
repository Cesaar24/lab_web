export default defineEventHandler((event) => {
  const user:User = event.context.user
  if (!user) {
    return {
      user: null
    }
  }
  return {
    user: user
  }
})
