import { Route, Routes } from "react-router-dom";

import Layout from "layout/Layout";
import AppLandingPage from "./page/home/home";

export default function DefaultRouter() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index path="/" element={<AppLandingPage />} />
      </Route>

      <Route path="*" element={<p>Not found skeleton</p>} />
    </Routes>
  );
}
