import React, { useState } from "react";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import { Layout } from "./components/Layout";
import { HomeLanding } from "./components/HomeLanding";
import { AppState } from "./types";

const AppContent = () => {
  const { user, loading } = useAuth();
  const [appState, setAppState] = useState(AppState.HOME);
  const [view, setView] = useState("landing");

  if (loading) {
    return (
      <div className="min-h-screen bg-cosbia-dark flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  const isPublicPage = !user;

  return (
    <Layout title={user ? "Dashboard" : "Welcome"} isPublic={isPublicPage}>
      {user ? (
        <div className="flex items-center justify-center p-4 md:p-8 w-full">
          <Dashboard />
        </div>
      ) : (
        // For public pages: render landing full-bleed, other forms inside centered container
        <>
          {view === "landing" ? (
            <HomeLanding onGetStarted={() => setView("register")} />
          ) : (
            <div className="flex items-center justify-center p-4 md:p-8 w-full">
              {view === "register" ? (
                <Register onSwitchToLogin={() => setView("login")} />
              ) : (
                <Login onSwitchToRegister={() => setView("register")} />
              )}
            </div>
          )}
        </>
      )}
    </Layout>
  );
};

const LandingWithNav = () => {
  const navigate = useNavigate();
  return (
    <Layout isPublic={true}>
      <HomeLanding onGetStarted={() => navigate("/register")} />
    </Layout>
  );
};

const LoginWithNav = () => {
  const navigate = useNavigate();
  return (
    <Layout isPublic={true}>
      <Login onSwitchToRegister={() => navigate("/register")} />
    </Layout>
  );
};

const RegisterWithNav = () => {
  const navigate = useNavigate();
  return (
    <Layout isPublic={true}>
      <Register onSwitchToLogin={() => navigate("/login")} />
    </Layout>
  );
};

const DashboardWithLayout = () => (
  <Layout isPublic={false}>
    <Dashboard />
  </Layout>
);

const App = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#101037]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<LandingWithNav />} />
        <Route path="/login" element={<LoginWithNav />} />
        <Route path="/register" element={<RegisterWithNav />} />
        <Route
          path="/dashboard"
          element={user ? <DashboardWithLayout /> : <Navigate to="/" replace />}
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AuthProvider>
  );
};

export default App;
