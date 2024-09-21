import Template from "./template/Template";
import ProductDetail from "./products/detail/ProductDetail";
import { Switch, Route } from "react-router-dom";
import Landing from "./landing/Landing";
import ProductList from "./products/ProductList";
import AdminDashboard from "./admin/AdminDashboard";
import LoginPage from "./admin/LoginPage";

function App() {
  return (
    <Template>
      <Switch>
        <Route path="/products" exact>
          <ProductList />
        </Route>
        <Route path="/admin/dashboard" exact>
          <AdminDashboard />
        </Route>
        <Route path="/admin/login" exact>
          <LoginPage />
        </Route>
        <Route path="/products/:slug">
          <ProductDetail />
        </Route>
        <Route path="/" exact>
          <Landing />
        </Route>
      </Switch>
    </Template>
  );
}

export default App;
