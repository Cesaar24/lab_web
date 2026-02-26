import jwt from "jsonwebtoken";
import { UserMysql } from "~~/server/services/mysql";
import { z } from "zod";

const registerSchema = z.object({
  email: z
    .email({
      //@ts-ignore
      required_error: "El correo es obligatorio",
      invalid_type_error: "El correo debe ser un texto",
    })
    .max(255, "El correo es muy largo"),
  name: z
    .string({
      //@ts-ignore
      required_error: "El nombre es obligatorio",
      invalid_type_error: "El nombre debe ser un texto",
    })
    .min(3, "El nombre es muy corto")
    .max(255, "El nombre es muy largo")
    .regex(/^[a-zA-Z\s]+$/, "El nombre solo puede contener letras y espacios"),
  password: z
    .string({
      //@ts-ignore
      required_error: "La contraseña es obligatoria",
      invalid_type_error: "La contraseña debe ser un texto",
    })
    .max(80, "La contraseña es muy larga")
    .min(8, "La contraseña debe tener al menos 8 caracteres")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/,
      "La contraseña debe tener al menos 8 caracteres. (min: 1 letra minúscula, min: 1 letra mayúscula , min:1 digito )",
    ),
});
export default defineEventHandler(async (event) => {
  /* const _body = await readBody(event); */
  const config = useRuntimeConfig();
  // validaciones del lado del servidor

  const body = await readValidatedBody(event, (body) =>
    registerSchema.safeParse(body),
  );

  if (!body.success) {
    throw createError({
      statusCode: 400,
      statusMessage: "Invalid request body",
    });
  }
  // end validaciones

  const response = (await UserMysql.create(body.data)) as {
    success: boolean;
    data: userProfileForm;
    message?: string;
    statusCode?: number;
  };
  if (response.success) {
    const token = jwt.sign({ id: response.data?.id }, config.tokenSecret, {
      expiresIn: config.tokenExpiration,
    } as jwt.SignOptions);
    setCookie(event, "access_token", token, {
      httpOnly: true, // Solo accesible a través de HTTP
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict", // Evita el envío de cookies en solicitudes de terceros
    });
    return {
      success: true,
      data: response.data,
    };
  } else {
    throw createError({
      statusMessage: response.message || "Error al crear el usuario",
      statusCode: response.statusCode || 500,
    });
  }
});
