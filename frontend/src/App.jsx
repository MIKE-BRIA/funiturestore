import { RouterProvider, createBrowserRouter } from "react-router-dom";
import RootLayout from "./pages/RootLayout";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import Signup from "./components/Signup";
import Login from "./components/Login";
import AdminProducts from "./components/AdminProducts";
import AdminDashboard from "./components/AdminDashboard";
import AdminOrders from "./components/AdminOrders";
import AddProduct from "./components/AddProduct";
import Shop from "./pages/Shop";
import ProductPage from "./components/ProductPage";
import ProductCategory from "./components/ProductCategory";
import Profile from "./pages/Profile";
import { Provider } from "react-redux";
import store from "./store/store";
import Cart from "./pages/Cart";
import PaymentSuccess from "./components/PaymentSucess";
import NotAuthorized from "./components/NotAuthorized";
import ProtectedRoute from "./hooks/useProtectedRoute";
import PurchasedItem from "./components/PurchasedItem";
import Contact from "./pages/Contact";
import About from "./pages/About";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "signup", element: <Signup /> },
      { path: "login", element: <Login /> },
      { path: "shop", element: <Shop /> },
      { path: "contact", element: <Contact /> },
      { path: "about", element: <About /> },
      { path: "profile", element: <Profile /> },
      { path: "cart", element: <Cart /> },
      { path: "payment-success", element: <PaymentSuccess /> },
      { path: "not-authorized", element: <NotAuthorized /> },
      { path: "shop/:category", element: <ProductCategory /> },
      { path: "shop/:category/:id", element: <ProductPage /> },

      {
        path: "admin",
        element: <ProtectedRoute />,
        children: [
          {
            path: "",
            element: <Admin />,
            children: [
              { path: "dashboard", element: <AdminDashboard /> },
              { path: "products", element: <AdminProducts /> },
              { path: "products/add", element: <AddProduct /> },
              { path: "products/edit/:id", element: <AddProduct /> },
              { path: "orders", element: <AdminOrders /> },
              { path: "orders/:id", element: <PurchasedItem /> },
            ],
          },
        ],
      },
    ],
  },
]);

const App = () => {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
};

export default App;
