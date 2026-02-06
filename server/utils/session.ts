import jwt from "jsonwebtoken"
const createToken = async (user: User) => {
  const config = useRuntimeConfig()
  return await jwt.sign(
    {
      id: user.id,
      email: user.email
    },
    config.tokenSecret,

    {
      expiresIn: config.tokenExpiration
    }
  )
}
const verifyToken = async (token: string) => {
  try {
    const config = useRuntimeConfig()
    jwt.decode
    return await jwt.verify(token, config.tokenSecret)
  } catch (err) {
    return  null /* 'Token Expired' */
  }
  
}

const getUserToken = (event:any) => {
  const cookie = getCookie(event, "access_token")
  if (!cookie) {
    return null
  }
  const token = verifyToken(cookie)
  if (!token) {
    return null 
  }
  return token
}
export { createToken, getUserToken, verifyToken }