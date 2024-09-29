import { Route, Routes } from "react-router-dom";

import Layout from "layout/Layout";

export default function DefaultRouter() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index path="/" element={<p>Hello world</p>} />
      </Route>

      <Route path="*" element={<p>Not found skeleton</p>} />
    </Routes>
  );
}
