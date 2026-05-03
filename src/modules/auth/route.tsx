import Login from "./pages/Login";
import Register from "./pages/Register";
import Layout from "../../components/layouts/layoutLogin/LayoutLogin";


const authRoutes = [
  {
    path: "/login",
    element: <Layout />,
    children: [
      {
        index: true, element: <Login />
      },
    ],
  },
  {
    path: "/register",
    element: <Layout />,
    children: [
      {
        index: true, element: <Register />
      },
    ],
  },
];
export default authRoutes;