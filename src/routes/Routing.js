import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { StaticRouterLinks } from "../utils/StaticRouterLinks";
import Music from "../pages/Music";
import Home from "../pages/Home";
import History from "../pages/History";
import Layout from "../components/Layout";

function Routing() {
  return (
    <BrowserRouter>
      <Routes>
      <Route element={<Layout />}>
        <Route
          path={StaticRouterLinks.intialRoute}
          element={<Navigate to={StaticRouterLinks.home} replace />}
        />
        <Route exact path={StaticRouterLinks.home} element={<Home />} />
        <Route exact path={StaticRouterLinks.music} element={<Music />} />
        <Route path={StaticRouterLinks.history} element={<History />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Routing;
