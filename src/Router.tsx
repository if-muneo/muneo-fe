import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import StartPage from './pages/StartPage';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import AdminPage from './pages/AdminPage';
import PageTransition from './components/PageTransition';
import MplanListPage from "./pages/MplanListPage.tsx";
import AddonListPage from "./pages/AddonListPage.tsx";
import UserMplanDetailPage from "./pages/UserMplanDetailPage.tsx";
import MyPage from "./pages/MyPage.tsx";

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
      <Route path="/home" element={
        <PageTransition>
          <HomePage />
        </PageTransition>
      } />
      <Route path="/admin" element={
        <PageTransition>
          <AdminPage />
        </PageTransition>
      } />
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
        <Route path="/mplan/:id" element={
            <PageTransition>
                <UserMplanDetailPage />
            </PageTransition>
        } />

      <Route path="/mypage" element={
          <PageTransition>
              <MyPage />
          </PageTransition>
      } />
    </Routes>

  );
};

export default Router;
