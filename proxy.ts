import { auth } from "@/lib/auth";

export const proxy = auth((req) => {
  const isLoggedIn = !!req.auth;
  const { nextUrl } = req;

  const isProtected = nextUrl.pathname.startsWith("/dashboard") || nextUrl.pathname.startsWith("/panel");
  if (isProtected && !isLoggedIn) {
    return Response.redirect(new URL("/login", nextUrl));
  }
});

export default proxy;

export const config = {
  matcher: ["/dashboard/:path*", "/panel/:path*"],
};
