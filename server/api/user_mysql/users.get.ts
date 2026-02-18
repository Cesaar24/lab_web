export default defineEventHandler(async (event) => {
  try {
    // 'pool' está disponible globalmente en el servidor gracias a server/utils
    const [rows] = await pool.query("SELECT * FROM users");

    return {
      success: true,
      data: rows,
    };
  } catch (error) {
    console.error("Error de BD:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "Error al obtener usuarios",
    });
  }
});
