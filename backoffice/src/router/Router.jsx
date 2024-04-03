import React, { createContext, useEffect } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import App from "../apps/App";
import Auth from "../apps/Auth";
import { HTML5Backend } from "react-dnd-html5-backend";

import { DndProvider } from "react-dnd";
import Dashboard from "../pages/Dashboard";
import Product from "../pages/product/Product";
import NotFound from "../pages/NotFound";
import { Provider, useDispatch, useSelector } from "react-redux";
import { store } from "../store/store";
import AddProduct from "../pages/product/views/AddProduct";
import ProductList from "../pages/product/views/ProductList";
import ProductDetails from "../pages/product/views/ProductDetails";
import Profile from "../pages/profile/Profile";
import ProfileDetails from "../pages/profile/views/ProfileDetails";
import EditProfile from "../pages/profile/views/EditProfile";
import { getMe } from "../store/auth";
import AddVente from "../pages/ventes/views/AddVente";
import VenteList from "../pages/ventes/views/ListeVente";

import Addservice from "../pages/service/views/addService";
import ServiceListe from "../pages/service/views/serviceListe.jsx";
import Login from "../pages/auth/Login";
import AddLocation from "../pages/location/views/AddLocation.js";
import LocationList from "../pages/location/views/ListeLocation.js";
import AddClient from "../pages/client/views/AddClient.jsx";
import ClientList from "../pages/client/views/ListeClient.jsx";
import AddOpportunite from "../pages/opportunite/views/AddOpportunite.jsx";
import AddStageIcon from "../pages/opportunite/components/AddIcone.jsx";
import AddStage from "../pages/stage/AddStage.jsx";
import TestFetchOpportunites from "../pages/opportunite/test.js";
import AddStageClient from "../pages/stage-client/AddStage-client.js";
import ListOpportunities from "../pages/opportunite/views/ListOpportunities.jsx";
import ViewOpportunity from "../pages/opportunite/views/VewOpportunity.jsx";
import Opportunity from "../pages/opportunite/opportunity.jsx";
import AccesDenied from "../pages/AccesDenied.jsx";
export const UserContext = createContext();

function PrivateRoute({ Component, roles }) {
  const user = useSelector((store) => store.auth.me);
  const navigate = useNavigate();
  useEffect(() => {
    if (user?.Employee?.role) {
      console.log("helloooooo");
      if (!roles.includes(user.Employee.role)) {
        navigate("/acess-denied");
      }
    }
  }, [user]);
  if (roles.includes(user?.Employee?.role)) {
    return <Component />;
  }
}

export default function Router() {
  const user = useSelector((store) => store.auth.me);
  const dispatch = useDispatch();
  useEffect(() => {
    let token = localStorage.getItem("token");
    if (token) dispatch(getMe());
  }, [dispatch]);

  return (
    <Provider store={store}>
      <DndProvider backend={HTML5Backend}>
        <BrowserRouter>
          <Routes>
            {user ? (
              <Route path="/" element={<App />}>
                <Route index element={<Dashboard />} />
                <Route path="products" element={<Product />}>
                  <Route index element={<ProductList />} />
                  <Route path=":id" element={<ProductDetails />} />
                  <Route path="add" element={<AddProduct />} />
                </Route>
                <Route path="profile" element={<Profile />}>
                  <Route index element={<ProfileDetails />} />
                  <Route path="edit" element={<EditProfile />} />
                </Route>
                <Route path="listeService" element={<ServiceListe />} />
                <Route path="addservice" element={<Addservice />} />
                <Route path="AddVente" element={<AddVente />} />
                <Route path="ListeVente" element={<VenteList />} />
                <Route path="AddLocation" element={<AddLocation />} />
                <Route path="ListeLocation" element={<LocationList />} />
                <Route path="AddClient" element={<AddClient />} />
                <Route path="ListeClient" element={<ClientList />} />
                <Route
                  path="opportunities"
                  element={
                    <PrivateRoute
                      Component={Opportunity}
                      roles={["chef", "admin"]}
                    />
                  }
                >
                  <Route index element={<ListOpportunities />} />
                  <Route path="add" element={<AddOpportunite />} />
                  <Route path=":opportunityId" element={<ViewOpportunity />} />
                </Route>
                <Route path="AddStage" element={<AddStage />} />
                <Route path="AddIcone" element={<AddStageIcon />} />
                <Route path="test" element={<TestFetchOpportunites />} />
                <Route path="Addstage_client" element={<AddStageClient />} />
                <Route path="acess-denied" element={<AccesDenied />} />
              </Route>
            ) : (
              <Route path="/" element={<Auth />}>
                <Route index element={<Login />} />
              </Route>
            )}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </DndProvider>
    </Provider>
  );
}