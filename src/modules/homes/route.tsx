import Layout from "../../components/layouts/layoutLogin/LayoutLogin";
// import Homes from "./pages/Homes";
import PublicMovies from "../movies/pages/PublicMovies";
import PublicMovieDetail from "../movies/pages/PublicMovieDetails";


const homeRoutes = [
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true, element: <PublicMovies />
      },

    ],
  },
  {
     path: "/details/:id",
     element: <Layout/>,
     children: [
       {
         index: true, element: <PublicMovieDetail />
       }
     ],
   },
];
export default homeRoutes;