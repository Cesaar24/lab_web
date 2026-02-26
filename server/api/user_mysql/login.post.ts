import { UserMysql } from "~~/server/services/mysql";
import jwt from "jsonwebtoken";
import { z } from "zod";

const loginSchema = z.object({
  email: z
    .email({
      //@ts-ignore
      required_error: "El correo es obligatorio",
      invalid_type_error: "El correo debe ser un texto",
    })
    .max(255, "El correo es muy largo"),

  password: z
    .string({
      //@ts-ignore
      required_error: "La contraseña es obligatoria",
      invalid_type_error: "La contraseña debe ser un texto",
    })
    .min(8, "La contraseña debe tener al menos 8 caracteres")
    .max(100, "Contraseña demasiado larga")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/,
      "La contraseña debe tener al menos 8 caracteres. (min: 1 letra minúscula, min: 1 letra mayúscula , min:1 digito )",
    ),
});
export default defineEventHandler(async (event) => {
  /* const _body = await readBody(event); */
  const config = useRuntimeConfig();
  /* Validaciones del lado de servidor con ZOD */
  const body = await readValidatedBody(event, (body) =>
    loginSchema.safeParse(body),
  );
  if (!body.success) {
    throw createError({
      statusCode: 400,
      statusMessage: "Invalid request body",
    });
  }
  /* End validaciones */

  const response = (await UserMysql.login(body.data)) as {
    success: boolean;
    data: userProfileForm | null;
    message?: string;
    statusCode?: number;
  };
  if (response.success) {
    const token = jwt.sign({ id: response.data?.id }, config.tokenSecret, {
      expiresIn: config.tokenExpiration,
    } as jwt.SignOptions);
    setCookie(event, "access_token", token, {
      httpOnly: true, // Solo accesible a través de HTTP
      secure: process.env.NODE_ENV === "production", // Solo se envía en conexiones seguras (HTTPS) en producción
      sameSite: "strict", // Evita el envío de cookies en solicitudes de terceros
    });
    return {
      success: true,
      data: response.data,
    };
  } else {
    throw createError({
      statusCode: response.statusCode || 500,
      statusMessage: String(response.message),
    });
  }
});
