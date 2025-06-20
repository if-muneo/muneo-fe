import React from 'react';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import StartPage from './pages/StartPage';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import AdminPage from './pages/AdminPage';
import AdminAddOnListPage from './pages/AdminAddOnListPage.tsx';
import AddonListPage from './pages/AddonListPage.tsx';
import AdminAddOnCreatePage from './pages/AdminAddOnCreatePage.tsx';
import AdminAddOnGroupPage from './pages/AdminAddOnGroupPage.tsx';
import AdminAddOnGroupCreatePage from './pages/AdminAddOnGroupCreatePage.tsx';
import AdminMplanCreatePage from './pages/AdminMplanCreatePage.tsx';
import PageTransition from './components/PageTransition.tsx';
import MplanListPage from "./pages/MplanListPage.tsx";
import UserMplanDetailPage from "./pages/UserMplanDetailPage.tsx";
import MyPage from "./pages/MyPage.tsx";
import AdminPlanListPage from "./pages/AdminPlanListPage.tsx";

const PageLayout: React.FC = () => {
  return (
    <PageTransition>
      <Outlet />
   </PageTransition>
  );
};

const Router = () => {
  return (
    <Routes>
      <Route element={<PageLayout />}>
        <Route path="/" element={<StartPage />} />
        <Route path="/login" element={<LoginPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
          <Route path="/plans" element={<MplanListPage />} />
          <Route path="/addons" element={<AddonListPage />} />
          <Route path="/mplan/:id" element={<UserMplanDetailPage />} />
          <Route path="/mypage" element={<MyPage />} />
      </Route>
        <Route path="/home" element={<HomePage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/admin/services" element={<AdminAddOnListPage />} />
        <Route path="/admin/services/create" element={<AdminAddOnCreatePage />} />
        <Route path="/admin/groups" element={<AdminAddOnGroupPage />} />
        <Route path="/admin/groups/create" element={<AdminAddOnGroupCreatePage />} />
        <Route path="/admin/plans/create" element={<AdminMplanCreatePage />} />
        <Route path="/admin/plans" element={<AdminPlanListPage />} />
    </Routes>
  );
};

export default Router;
