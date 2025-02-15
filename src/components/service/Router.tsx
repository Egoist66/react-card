import { FC } from "react";

import routes from "../../routes/routes";
import { Route, Routes } from "react-router";

/**
 * The main router component.
 *
 * This component takes the routes defined in `src/routes/routes.tsx` and uses them to render the correct component.
 *
 * @remarks
 * This component is the entry point for the entire application. It uses the `react-router-dom` library to handle client side routing.
 *
 * @returns The main router component
 */
export const Router: FC = () => {
    return (
        <Routes>
            {routes.map((route, index) => (
                <Route index={route.path === '/' ? true : false} key={index} path={route.path} element={route.component} />
            ))}
        </Routes>
    )
}