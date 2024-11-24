import { lazy } from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

const routes = [
  {
    path: "/",
    Element: lazy(() => import("./pages/home")),
  },
] as const;

const router = createBrowserRouter(
  createRoutesFromElements(
    routes.map(({ path, Element }) => (
      <Route key={path} path={path} element={<Element />} />
    ))
  )
);

export default router;
