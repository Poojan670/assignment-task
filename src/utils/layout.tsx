import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

interface RootState {
  auth: AuthState;
}

interface AuthState {
  accessToken: string | null;
  loading: boolean;
}

const AuthLayout: React.FC = () => {
  const { accessToken } = useSelector<RootState, AuthState>(
    (state) => state.auth
  );

  return accessToken ? <Outlet /> : <Navigate to="/login" replace />;
};
export default AuthLayout;
