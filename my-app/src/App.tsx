import React from "react";
import "./tailwind.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import MainPage from "./pages/MainPage";
import ConvertPage from "./pages/ConvertPage";
import UploadComplete from "./pages/UploadComplete";
import ConvertComplete from "./pages/ConvertComplete";
import DownloadPage from "./pages/DownloadPage";
import { LanguageProvider } from "./LanguageContext";
import { HighContrastModeProvider } from "./components/HighContrastMode";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import { AuthProvider } from "./components/AuthContext";
import { CookiesProvider } from "react-cookie";

function App() {
  return (
    <CookiesProvider>
      <AuthProvider>
        <HighContrastModeProvider>
          <LanguageProvider>
            <BrowserRouter>
              <Routes>
                {/* main page */}
                <Route path="*" element={<MainPage />} />

                {/* convert page */}
                <Route path="/convert/*" element={<ConvertPage />} />

                {/* upload completed page */}
                <Route path="/upload_completed" element={<UploadComplete />} />

                {/* convert completed page */}
                <Route
                  path="/convert_completed"
                  element={<ConvertComplete />}
                />

                {/* download page */}
                <Route path="/download/*" element={<DownloadPage />} />

                <Route path="/login/*" element={<LoginPage />} />

                <Route path="/signup/*" element={<SignUpPage />} />
              </Routes>
            </BrowserRouter>
          </LanguageProvider>
        </HighContrastModeProvider>
      </AuthProvider>
    </CookiesProvider>
  );
}

export default App;
