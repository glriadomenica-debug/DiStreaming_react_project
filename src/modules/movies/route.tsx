import Genre from "../movies/pages/Movies";
import Edit from "../movies/pages/EditMovies";
import MovieDetail from "../movies/pages/MovieDetail";
import LayoutHome from "../../components/layouts/layoutHome/layoutHome";
import ProtectedRoutes from "../../routes/ProtectedRoutes";

const moviesRoute = [
  {
    element: <ProtectedRoutes />,
    children: [
      {
        path: "/genre",
        element: <LayoutHome />,
        children: [
          { index: true, element: <Genre /> }
        ],
      },
      {
        path: "/movies/edit/:id",
        element: <LayoutHome />,
        children: [
          {
            index: true, element: <Edit />
          }
        ],
      },
      {
        path: "/movies/:id",
        element: <LayoutHome />,
        children: [
          {
            index: true, element: <MovieDetail />
          }
        ],
      },
    ]
  }
]

export default moviesRoute;