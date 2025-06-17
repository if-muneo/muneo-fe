import React from 'react';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import StartPage from './pages/StartPage';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import AdminPage from './pages/AdminPage';
import AddOnListPage from './pages/AddOnListPage';
import AddOnCreatePage from './pages/AddOnCreatePage';
import AddOnGroupPage from './pages/AddOnGroupPage';
import AddOnGroupCreatePage from './pages/AddOnGroupCreatePage.tsx';
// import PlanListPage from './pages/PlanListPage';
import PageTransition from './components/PageTransition.tsx';
import MplanListPage from "./pages/MplanListPage.tsx";
import AddonListPage from "./pages/AddonListPage.tsx";
import UserMplanDetailPage from "./pages/UserMplanDetailPage.tsx";
import MyPage from "./pages/MyPage.tsx";

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
      </Route>
      <Route path="/admin" element={<AdminPage />} />
      <Route path="/admin/services" element={<AddOnListPage />} />
      <Route path="/admin/services/create" element={<AddOnCreatePage />} />
      <Route path="/admin/groups" element={<AddOnGroupPage />} />
      <Route path="/admin/groups/create" element={<AddOnGroupCreatePage />} />
      {/*<Route path="/admin/plans" element={<PlanListPage />} />*/}
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
