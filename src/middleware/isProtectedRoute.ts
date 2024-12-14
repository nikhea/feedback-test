export function isProtectedRoute(
  pathname: string,
  protectedRoutes: string[]
): boolean {
  return protectedRoutes.some((route) => pathname.startsWith(route));
}
