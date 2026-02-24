// ============================================================
// useNavigation — shared nav helpers
// ============================================================

import { useLocation, useNavigate } from "react-router-dom";

export function useNav() {
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path: string, exact = false): boolean => {
    if (exact) return location.pathname === path;
    return location.pathname.startsWith(path);
  };

  const isActiveStrict = (path: string): boolean => location.pathname === path;

  return {
    location,
    navigate,
    isActive,
    isActiveStrict,
    pathname: location.pathname,
  };
}
