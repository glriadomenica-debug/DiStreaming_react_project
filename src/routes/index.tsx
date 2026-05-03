import { useRoutes } from "react-router-dom";
import authRoutes from "../modules/auth/route";
import homeRoutes from "../modules/homes/route";
import moviesRoute from "../modules/movies/route";
import categoriesRoute from "../modules/categories/route";
import userRoutes from "../modules/users/route";

export default function AppRoutes() {
  return useRoutes([...authRoutes, ...homeRoutes, ...moviesRoute, ...categoriesRoute, ...userRoutes]);
}