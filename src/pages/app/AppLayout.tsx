// Path: src/pages/app/AppLayout.tsx
import { useEffect } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";

export function AppLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated } = useAuthStore();

  useEffect(() => {
    // If not authenticated and not on login page, redirect to login
    if (!isAuthenticated && location.pathname !== "/app/login") {
      navigate("/app/login", { replace: true });
    }
    // If authenticated and on login page, redirect to dashboard
    if (isAuthenticated && location.pathname === "/app/login") {
      navigate("/app/dashboard", { replace: true });
    }
  }, [isAuthenticated, location.pathname, navigate]);

  return <Outlet />;
}
