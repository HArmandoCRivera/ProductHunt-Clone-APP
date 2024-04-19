import { Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import paths from "./paths";
import { Home } from "../features/home/Home";
import { Product } from "../features/product/Product";
import { Profile } from "../features/profile/Profile";
import { Protected } from "./protected";



export const AppRouter = createBrowserRouter(createRoutesFromElements(
    <Route path={paths.HOME}>
        <Route index element={<Home />} />
        <Route path={paths.PRODUCT} element={<Product />} />
        <Route element={<Protected />}>
            <Route path={paths.PROFILE} element={<Profile />}/>
        </Route>
    </Route>
));

