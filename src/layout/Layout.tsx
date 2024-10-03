import { ToasterProvider } from "component/toastr/toastr.service";
import AppFooter from "layout/footer/footer";
import AppHeading from "layout/header/header";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";

const Layout = () => {
  useEffect(() => {
    document.addEventListener(
      "touchmove",
      function (event: any) {
        if (event.scale !== 1) {
          event.preventDefault();
        }
      },
      false
    );
  }, []);
  return (
    <>
      <ToasterProvider>
        <AppHeading />
        <Outlet />
        <AppFooter />
      </ToasterProvider>
    </>
  );
};

export default Layout;
