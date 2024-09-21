import { useLocation } from "react-router-dom";
import Header from "./Header";
import Content from "./Content";
import Footer from "./Footer";

function Template(props) {
  const location = useLocation();

  // List of routes where header and footer should be hidden
  const hideHeaderFooterRoutes = ["/admin/login","/admin/dashboard"];

  // Determine if the current route is one of the routes where the header and footer should be hidden
  const showHeaderFooter = !hideHeaderFooterRoutes.includes(location.pathname);

  return (
    <>
      {showHeaderFooter && <Header />}
      <Content>{props.children}</Content>
      {showHeaderFooter && <Footer />}
    </>
  );
}

export default Template;
