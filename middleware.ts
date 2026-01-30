import { NextRequest, NextResponse } from "next/server";
import { checkServerSession } from "./lib/api/serverAuth";

// Публічні маршрути (доступні без авторизації)
const publicRoutes = ["/login", "/register"];

// Приватні маршрути (потребують авторизації)
const privateRoutes = ["/", "/statistics", "/currency", "/transactions"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const origin = request.nextUrl.origin;

  // Отримуємо accessToken refreshToken з cookies
  const accessToken = request.cookies.get("accessToken")?.value;
  const refreshToken = request.cookies.get("refreshToken")?.value;

  // Перевіряємо чи це публічний маршрут
  const isPublicRoute = publicRoutes.some((route) =>
    pathname.startsWith(route),
  );

  // Перевіряємо чи це приватний маршрут
  const isPrivateRoute = privateRoutes.some((route) => {
    // Для головної сторінки перевіряємо точну відповідність
    if (route === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(route);
  });

  // Користувач НЕ авторизований (немає accessToken)
  if (!accessToken) {
    if (refreshToken) {
      const cookieHeader = request.headers.get("cookie") ?? "";

      const res = await checkServerSession(origin, cookieHeader);

      if (res.ok) {
        const response = NextResponse.next();

        // переносимо Set-Cookie з refresh response
        const setCookie = res.headers.get("set-cookie");
        if (setCookie) {
          response.headers.append("set-cookie", setCookie);
        }

        // якщо це публічний маршрут → редірект на /
        if (isPublicRoute) {
          return NextResponse.redirect(new URL("/", request.url), {
            headers: response.headers,
          });
        }

        // якщо приватний → пускаємо
        if (isPrivateRoute) {
          return response;
        }
      }
    }

    // ❌ refresh не допоміг
    if (isPrivateRoute) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    return NextResponse.next();
  }

  // ✅ accessToken Є
  if (accessToken && isPublicRoute) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

// Налаштування matcher - визначаємо які маршрути обробляє middleware
export const config = {
  matcher: [
    // Публічні маршрути
    "/login",
    "/register",
    // Приватні маршрути
    "/",
    "/statistics",
    "/currency",
    "/transactions",
  ],
};
