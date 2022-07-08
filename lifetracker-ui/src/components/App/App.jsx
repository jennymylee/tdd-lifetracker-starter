import * as React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "components/Navbar/Navbar";
import LandingPage from "components/LandingPage/LandingPage";
import LoginPage from "components/LoginPage/LoginPage";
import RegistrationPage from "components/RegistrationPage/RegistrationPage";
import ActivityPage from "components/ActivityPage/ActivityPage";
import NutritionPage from "components/NutritionPage/NutritionPage";
import NotFound from "components/NotFound/NotFound";
import ProtectedRoute from "components/ProtectedRoute/ProtectedRoute";

import { AuthContextProvider, useAuthContext } from "../../../contexts/auth";
import {
  NutritionContextProvider,
  useNutritionContext,
} from "../../../contexts/nutrition";
import { ActivityContextProvider } from "../../../contexts/activity";
export default function AppContainer() {
  return (
    <AuthContextProvider>
      <NutritionContextProvider>
        <ActivityContextProvider>
          <App />
        </ActivityContextProvider>
      </NutritionContextProvider>
    </AuthContextProvider>
  );
}
function App() {
  return (
    <div className="app">
      <React.Fragment>
        <BrowserRouter>
          <main>
            <Routes>
              <Route
                path="/"
                element={
                  <>
                    <Navbar />
                    <LandingPage />
                  </>
                }
              />
              <Route
                path="/login"
                element={
                  <>
                    <Navbar />
                    <LoginPage />
                  </>
                }
              />
              <Route
                path="/register"
                element={
                  <>
                    <Navbar />
                    <RegistrationPage />
                  </>
                }
              />
              <Route
                path="/activity"
                element={
                  <ProtectedRoute>
                    <Navbar />
                    <ActivityPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/nutrition/*"
                element={
                  <ProtectedRoute>
                    <Navbar />
                    <NutritionPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="*"
                element={
                  <>
                    <Navbar />
                    <NotFound />
                  </>
                }
              />
            </Routes>
          </main>
        </BrowserRouter>
      </React.Fragment>
    </div>
  );
}
