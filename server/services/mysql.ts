import bcrypt from "bcrypt";
import type { ResultSetHeader } from "mysql2/promise";

export class UserMysql {
  static async create(data: any) {
    /* validaciones */
    const [results, fields] = await pool.query(
      `SELECT id FROM users WHERE email = "${data.email}"`,
    );

    if (Array.isArray(results) && results.length > 0) {
      throw createError({ statusMessage: "email already exist" });
    }
    if (!data.password) {
      throw createError({ statusMessage: "password no exist" });
    }

    /*  */
    const hashPassword = await bcrypt.hash(data.password, 10);
    const id = crypto.randomUUID();
    const newUser = {
      id,
      name: data.name,
      email: data.email,
      password: hashPassword,
    };
    const values = Object.values(newUser);

    const query =
      "INSERT INTO users (id, name, email, password) VALUES (?, ?, ?, ?)";
    await pool.execute(query, values);
    /*  await pool.end(); */
    return newUser;
  }
  //update user
  static async update(data: userProfileForm) {
    const [result, fields] = await pool.query(
      `UPDATE users SET name = "${data.name}",email = "${data.email}",admin = "${data.isAdmin ? 1 : 0}" WHERE id = "${data.id}" LIMIT 1 `,
    );
    const updateResult = result as ResultSetHeader;
    if (updateResult.affectedRows > 0) {
      return {
        id: data.id,
        name: data.name,
        email: data.email,
        isAdmin: data.isAdmin,
      } as userProfileForm;
    } else {
      throw createError({ statusMessage: "User does not exist" });
    }
  }

  static async login(data: any) {
    /* validaciones */
    const [result, fields] = await pool.query(
      `SELECT * FROM users WHERE email = "${data.email}"`,
    );

    if (Array.isArray(result) && result.length > 0) {
      const user = result[0] as any;
      const isValid = await bcrypt.compare(data.password, user.password);
      if (!isValid) throw createError({ statusMessage: "Password is invalid" });
      const send: User = {
        id: user.id,
        name: user.name,
        password: user.password,
        email: user.email,
        role: user.role,
        isAdmin: user.admin ? true : false,
      };
      return send;
    } else {
      throw createError({ statusMessage: "Email does not exist" });
    }
  }

  static getUserWithEmail(email: string) {}
}
