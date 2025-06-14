import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import StartPage from './pages/StartPage';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import PageTransition from './components/PageTransition';
import MplanListPage from "./pages/MplanListPage.tsx";
import AddonListPage from "./pages/AddonListPage.tsx";

const Router: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={
        <PageTransition>
          <StartPage />
        </PageTransition>
      } />
      <Route path="/login" element={
        <PageTransition>
          <LoginPage />
        </PageTransition>
      } />
      <Route path="/home" element={<HomePage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
      <Route path="/plans" element={
        <PageTransition>
            <MplanListPage />
        </PageTransition>
      } />
      <Route path="/addons" element={
          <PageTransition>
              <AddonListPage />
          </PageTransition>
      } />
    </Routes>

  );
};

export default Router;
