export function shouldHideNavigation(pathname: string): boolean {
  return (
    pathname.startsWith("/auth") ||
    pathname === "/mission-builder" ||
    pathname === "/mission-briefing"
  );
}
