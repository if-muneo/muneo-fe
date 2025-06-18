import React from 'react';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import StartPage from './pages/StartPage';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import AdminPage from './pages/AdminPage';
import AdminAddOnListPage from './pages/AdminAddOnListPage.tsx'
import AddOnListPage from './pages/AddOnListPage.tsx'
import AdminAddOnCreatePage from './pages/AdminAddOnCreatePage.tsx';
import AdminAddOnGroupPage from './pages/AdminAddOnGroupPage.tsx';
import AdminAddOnGroupCreatePage from './pages/AdminAddOnGroupCreatePage.tsx';
import PageTransition from './components/PageTransition.tsx';
import MplanListPage from "./pages/MplanListPage.tsx";
import UserMplanDetailPage from "./pages/UserMplanDetailPage.tsx";
import MyPage from "./pages/MyPage.tsx";
import PlanListPage from "./pages/PlanListPage.tsx";

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
        <Route path="/home" element={<HomePage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
          <Route path="/plans" element={<MplanListPage />} />
          <Route path="/addons" element={<AddOnListPage />} />
          <Route path="/mplan/:id" element={<UserMplanDetailPage />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/admin/services" element={<AdminAddOnListPage />} />
          <Route path="/admin/services/create" element={<AdminAddOnCreatePage />} />
          <Route path="/admin/groups" element={<AdminAddOnGroupPage />} />
          <Route path="/admin/groups/create" element={<AdminAddOnGroupCreatePage />} />
          <Route path="/admin/plans" element={<PlanListPage />} />
      </Route>
    </Routes>
  );
};

export default Router;
