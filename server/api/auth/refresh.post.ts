import { defineEventHandler, getCookie, setCookie, createError } from "h3";
import jwt from "jsonwebtoken";
import crypto from "crypto";

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  // 1. Leer el Refresh Token de la cookie HttpOnly
  const currentRefreshToken = getCookie(event, "access_token");

  if (!currentRefreshToken) {
    throw createError({ statusCode: 401, message: "No hay token de refresco" });
  }

  // 2. Buscar el token en MySQL
  const [tokenRecord, fields] = await pool.query(
    "SELECT * FROM refresh_tokens WHERE token = ?",
    [currentRefreshToken],
  );

  if (!tokenRecord) {
    throw createError({ statusCode: 401, message: "Token inválido" });
  }

  // 3. ¡ALERTA DE SEGURIDAD! Detección de reuso (Robo de cookie)
  if (Array.isArray(tokenRecord) && tokenRecord.length > 0) {
    const _tokenRecord = tokenRecord[0] as {
      id: number;
      user_id: string;
      token: string;
      expires_at: Date;
      is_used: boolean;
    };
    if (_tokenRecord.is_used) {
      // Si el token ya fue usado, significa que un atacante (o un error de red) está intentando usar un token viejo.
      // ACCIÓN: Revocar TODOS los tokens de este usuario para cerrar la sesión del atacante.
      await pool.query("DELETE FROM refresh_tokens WHERE user_id = ?", [
        _tokenRecord.user_id,
      ]);

      // Borramos la cookie actual
      setCookie(event, "access_token", "", { maxAge: -1 });
      throw createError({
        statusCode: 403,
        message: "Brecha de seguridad detectada. Sesión terminada.",
      });
    }

    // 4. Verificar si expiró
    if (new Date(_tokenRecord.expires_at) < new Date()) {
      throw createError({ statusCode: 401, message: "Refresh token expirado" });
    }

    // --- SI LLEGAMOS AQUÍ, EL TOKEN ES VÁLIDO Y SEGURO ---

    // 5. Marcar el token actual como USADO
    await pool.query("UPDATE refresh_tokens SET is_used = TRUE WHERE id = ?", [
      _tokenRecord.id,
    ]);

    // 6. Generar el NUEVO Access Token (JWT corto, ej. 15 min)
    const newAccessToken = jwt.sign(
      { userId: _tokenRecord.user_id },
      config.tokenSecret,
      { expiresIn: "15m" },
    );

    // 7. Generar el NUEVO Refresh Token (String aleatorio seguro o JWT largo)
    const newRefreshToken = crypto.randomBytes(40).toString("hex");
    const newExpiry = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 días

    // 8. Guardar el nuevo Refresh Token en MySQL
    await pool.query(
      "INSERT INTO refresh_tokens (user_id, token, expires_at) VALUES (?, ?, ?)",
      [_tokenRecord.user_id, newRefreshToken, newExpiry],
    );

    // 9. Enviar el nuevo Refresh Token como Cookie HttpOnly
    setCookie(event, "access_token", newRefreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      expires: newExpiry,
      path: "/", // Importante para que aplique a toda la app
    });

    // 10. Devolver el Access Token al frontend
    return {
      accessToken: newAccessToken,
    };
  }
});
