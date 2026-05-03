import ListCategories from "../categories/pages/ListCategories";
import Edit from "../categories/pages/EditCategory";
import LayoutHome from "../../components/layouts/layoutHome/layoutHome";
import ProtectedRoutes from "../../routes/ProtectedRoutes";

const categoriesRoute = [
  {
    element: <ProtectedRoutes />,
    children: [
      {
        path: "/category",
        element: <LayoutHome />,
        children: [
          { index: true, element: <ListCategories /> }
        ],
      },
      {
        path: "/categories/edit/:id",
        element: <LayoutHome />,
        children: [
          { index: true, element: <Edit /> }
        ],
      },
    ]
  }
]
export default categoriesRoute;