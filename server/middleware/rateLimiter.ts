const rateMap = new Map<string, { count: number; lastReset: number }>();

export default defineEventHandler((event) => {
  if (!event.path.startsWith("/api/")) return;

  const ip = getRequestIP(event, { xForwardedFor: true }) || "unknown";
  const now = Date.now();
  const windowMs = 60 * 1000; // Ventana de 1 minuto
  const maxRequests = 10; // Máximo 10 peticiones por minuto
  // console.log("IP:", ip);

  const userStats = rateMap.get(ip) || { count: 0, lastReset: now };

  if (now - userStats.lastReset > windowMs) {
    userStats.count = 0;
    userStats.lastReset = now;
  }
  userStats.count++;
  rateMap.set(ip, userStats);
  if (userStats.count > maxRequests) {
    throw createError({
      statusCode: 429,
      statusMessage: "Too Many Requests - Intenta de nuevo en un minuto",
    });
  }
});
