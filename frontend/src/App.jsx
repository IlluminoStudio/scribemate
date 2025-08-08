import React from "react";
import { Routes, Route } from "react-router-dom";
import "./styles/App.css";
import HomePage from "./pages/HomePage.jsx";
import DemoPage from "./pages/DemoPage";
import SignInPage from "./pages/SignInPage";
import SandboxPage from "./pages/SandboxPage";
import PlayPage from "./pages/PlayPage";
import MainLayout from "./layout/MainLayout";
import AnalyticsTracker from "./components/AnalyticsTracker";

// Wrapper component that applies MainLayout to all pages except HomePage
function LayoutWrapper({ children }) {
  return <MainLayout>{children}</MainLayout>;
}

function App() {
  return (
    <>
      <AnalyticsTracker />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/demo" element={<LayoutWrapper><DemoPage /></LayoutWrapper>} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/sandbox" element={<LayoutWrapper><SandboxPage /></LayoutWrapper>} />
        <Route path="/play" element={<LayoutWrapper><PlayPage /></LayoutWrapper>} />
      </Routes>
    </>
  );
}

export default App;
