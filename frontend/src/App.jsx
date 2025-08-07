import React from "react";
import { Routes, Route } from "react-router-dom";
import "./styles/App.css";
import HomePage from "./pages/HomePage.jsx";
import DemoPage from "./pages/DemoPage";
import SignInPage from "./pages/SignInPage";
import SandboxPage from "./pages/SandboxPage";
import PlayPage from "./pages/PlayPage";
import CarerHomePage from "./pages/CarerHomePage";
import CoordinatorHomePage from "./pages/CoordinatorHomePage";
import NewMessagePage from "./pages/NewMessagePage";
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
        <Route path="/carer" element={<LayoutWrapper><CarerHomePage /></LayoutWrapper>} />
        <Route path="/coordinator" element={<LayoutWrapper><CoordinatorHomePage /></LayoutWrapper>} />
        <Route path="/new-message" element={<LayoutWrapper><NewMessagePage /></LayoutWrapper>} />
      </Routes>
    </>
  );
}

export default App;
