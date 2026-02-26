import bcrypt from "bcrypt";
import type { ResultSetHeader } from "mysql2/promise";

export class UserMysql {
  static async create(data: any) {
    // consultas parametrizadas para evitar inyecciones SQL
    // El atacante puede enviar email = "admin@admin.com' OR '1'='1"
    // y el motor de MySQL lo tratará como un simple texto inofensivo.
    const [results, fields] = await pool.query(
      `SELECT id FROM users WHERE email = ?`,
      [data.email], // Esto es 100% seguro contra SQLi
    );

    if (Array.isArray(results) && results.length > 0) {
      return {
        success: false,
        message: "email already exist",
        statusCode: 409,
      };
    }
    if (!data.password) {
      return {
        success: false,
        message: "password no exist",
        statusCode: 404,
      };
    }

    /*  */
    const hashPassword = await bcrypt.hash(data.password, 10);
    const id = crypto.randomUUID();
    const newUser = {
      id,
      name: data.name,
      email: data.email,
      password: hashPassword,
      role: "User",
    };
    const values = Object.values(newUser);
    const query =
      "INSERT INTO users (id, name, email, password, role) VALUES (?, ?, ?, ?, ?)";
    await pool.execute(query, values);
    return {
      success: true,
      data: {
        id,
        name: data.name,
        email: data.email,
        role: "User",
      } as userProfileForm,
    };
  }
  //update user
  static async update(data: any) {
    /* validate email */
    const [existingUsers] = await pool.query(
      `SELECT id FROM users WHERE email = ? AND id != ?`,
      [data.email, data.id],
    );
    if (Array.isArray(existingUsers) && existingUsers.length > 0) {
      return {
        success: false,
        message: "email already exist",
        statusCode: 409,
      };
    }
    const [result, fields] = await pool.query(
      `UPDATE users SET name = ?,email = ? ,role = ? WHERE id = ? LIMIT 1 `,
      [data.name, data.email, data.role, data.id],
    );
    const updateResult = result as ResultSetHeader;
    if (updateResult.affectedRows > 0) {
      return {
        success: true,
        data: {
          id: data.id,
          name: data.name,
          email: data.email,
          role: data.role || "User",
        } as userProfileForm,
      };
    } else {
      return {
        success: false,
        message: "Failed to update user",
        statusCode: 404,
      };
    }
  }
  static async verificacionPasswoord(id: string, password: string) {
    const [result, fields] = await pool.query(
      `SELECT password FROM users WHERE id = ? LIMIT 1`,
      [id],
    );
    if (Array.isArray(result) && result.length > 0) {
      const user = result[0] as any;
      const isValid = await bcrypt.compare(password, user.password);
      return {
        success: isValid,
        message: isValid ? "Password is valid" : "Password is invalid",
        data: isValid,
      };
    } else {
      return {
        success: false,
        message: "La contraseña no es válida",
        statusCode: 404,
      };
    }
  }

  static async login(data: any) {
    const [result, fields] = await pool.query(
      `SELECT * FROM users WHERE email = ? LIMIT 1`,
      [data.email],
    );
    if (Array.isArray(result) && result.length > 0) {
      const user = result[0] as any;
      const isValid = await bcrypt.compare(data.password, user.password);
      if (!isValid) {
        return {
          success: false,
          message: "Password is invalid",
          statusCode: 404,
        };
      }
      const send: userProfileForm = {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role || "User",
      };
      return {
        success: true,
        data: send,
      };
    } else {
      return {
        success: false,
        message: "Email does not exist",
        statusCode: 404,
      };
    }
  }

  static async getUserById(id: string) {
    const [result, fields] = await pool.query(
      `SELECT id, name, email, role FROM users WHERE id = ? LIMIT 1`,
      [id],
    );
    if (Array.isArray(result) && result.length > 0) {
      const user = result[0] as any;
      const send: userProfileForm = {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role || "User",
      };
      return send;
    } else {
      return null;
    }
  }
  static async verifyRole(id: string) {
    const [result, fields] = await pool.query(
      `SELECT role FROM users WHERE id = ? LIMIT 1`,
      [id],
    );
    if (Array.isArray(result) && result.length > 0) {
      const user = result[0] as any;

      return {
        success: user.role === "Admin",
        role: user.role,
      };
    }
    console.log("User role from DB:");
    return {
      success: false,
      role: null,
    };
  }
}
