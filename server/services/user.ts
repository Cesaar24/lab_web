import dblocal from "db-local";
import bcrypt from "bcrypt";
/* const dbLocal = require("db-local"); */
const { Schema } = new dblocal({ path: "./databases" });
const User = Schema("user", {
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  lastName: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  password: { type: String },
  email: { type: String, required: true, unique: true },
  role: { type: String, required: true },
  subscription: { type: String, required: true },
});

export class UserRepository {
  static async create(data: User, isAdmin: boolean) {
    /* Validaciones */
    /* if(typeof data.username !== 'string') throw new Error('username must be string')
    if( data.password.lenght < 6) throw new Error('password  must be 6 ') */
    const user = User.findOne({ username: data.username, email: data.email });
    if (user)
      throw createError({ statusMessage: "Username or email already exist" });
    const id = crypto.randomUUID();
    if (data.password) {
      const hashPassword = await bcrypt.hash(data.password, 10);
      const newUser: User = {
        id,
        name: data.name,
        lastName: data.lastName,
        username: data.username,
        password: hashPassword,
        email: data.email,
        role: isAdmin ? "Admin" : "User",
        subscription: "Free",
      };
      User.create(newUser).save();
      const { password, ...send } = newUser;
      return send;
    } else {
      throw createError({ statusMessage: "password not exist" });
    }
  }
  //update user
  static async update(data: userProfileForm) {
    const user = User.findOne({ id: data.id });
    if (!user) throw createError({ statusMessage: "User not exist" });
    const { id, ...newData } = data;
    const newUser = User.update({ id }, newData).save();
    return newUser;
  }
  static async createWithGoogle(data: User) {
    /* Validaciones */
    /* if(typeof data.username !== 'string') throw new Error('username must be string')
    if( data.password.lenght < 6) throw new Error('password  must be 6 ') */
    /* const id = crypto.randomUUID() */
    User.create({
      id: data.id,
      name: data.name,
      lastName: data.lastName,
      email: data.email,
      username: data.username,
      role: "User",
    }).save();

    return data;
  }
  static async login(data: UserInput) {
    const user = User.findOne({ email: data.email });
    if (!user) throw createError({ statusMessage: "Email does not exist" });

    if (user.password) {
      const isValid = await bcrypt.compare(data.password, user.password);
      if (!isValid) throw createError({ statusMessage: "Password is invalid" });
      const send: User = {
        id: user.id,
        name: user.name,
        lastName: user.lastName,
        username: user.username,
        email: user.email,
        role: user.role,
        subscription: "Free",
      };
      return send;
    } else {
      throw createError({ statusMessage: "Password is invalid" });
    }
  }
  static verifyLoginWithGoogle(email: string) {
    const user = User.findOne({ email });
    if (!user) return null;

    const send: User = {
      id: user.id,
      name: user.name,
      lastName: user.lastName,
      username: user.username,
      email: user.email,
      role: user.role,
      subscription: "Free",
    };
    return { ...send, exist: true };
  }
  static getUserWithEmail(email: string) {
    const { _id, ...user } = User.findOne({ email });
    return user;
  }
}
