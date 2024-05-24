import React from "react";
import { Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import paths from "./paths";
import { Home } from "../features/home/Home";
import { ProductPage } from "../features/productPage/ProductPage";
import { Product } from "../features/product/Product";
import { ProductNew } from "../features/new/ProductNew";
import { Profile } from "../features/profile/Profile";
import { Protected } from "./protected";
import { EditProfile } from "../features/editProfile/EditProfile";

export const AppRouter = createBrowserRouter(createRoutesFromElements(
    <Route path={paths.HOME}>
        <Route index element={<Home />} />
        <Route path={paths.PRODUCT} element={<Product />} />
        <Route path={`${paths.PRODUCTS}/search/:search`} element={<ProductPage />} />
        <Route path={paths.PRODUCTS} element={<ProductPage />} />
        <Route element={<Protected />}>
            <Route path={paths.PRODUCT_NEW} element={<ProductNew />} />
            <Route path={paths.PROFILE} element={<Profile />} />
            <Route path={paths.EDITPROFILE} element={<EditProfile />} />
        </Route>
    </Route>
));

