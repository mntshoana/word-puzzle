import { Route, Routes } from "react-router-dom";

import Layout from "layout/Layout";
import AppLandingPage from "./page/home/home";
import NotFoundView from "./page/not-found/not-found";
import PrivacyPolicy from "./page/privacy-policy/privacy-policy";

export default function DefaultRouter() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index path="/" element={<AppLandingPage />} />
        <Route index path="/privacy" element={<PrivacyPolicy />} />
      </Route>

      <Route path="*" element={<NotFoundView />} />
    </Routes>
  );
}
