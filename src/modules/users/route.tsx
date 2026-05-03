import Users from "./pages/User";
import Edit from "./pages/EditUser";
import Layout from "../../components/layouts/layoutHome/layoutHome";
import ProtectedRoutes from "../../routes/ProtectedRoutes";


const userRoutes = [
  {
    element: <ProtectedRoutes />,
    children: [
      {
        path: "/user",
        element: <Layout />,
        children: [
          {
            index: true, element: <Users />
          },
        ],
      },
      {
        path: "/users/edit/:id",
        element: <Layout />,
        children: [
          {
            index: true, element: <Edit />
          },
        ],
      }
    ]
  }
];
export default userRoutes;