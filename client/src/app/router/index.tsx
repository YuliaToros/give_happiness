import { createBrowserRouter } from "react-router-dom";
import { Layout } from "./Layout/Layout";
import { UserAuthPage, UserRegPage,  UpdateSertificatePage, SertificatesPage, HomePage, NotFound, AccountPage } from "@/pages";

export enum CLIENT_ROUTES {
    HOME = '/',
    AUTH = '/auth',
    REG = '/registration',
    SERTIFICATES = '/sertificates',
    CURRENT_SERTIFICATE_PAGE = '/sertificate/:id',
    ACCOUNT_PAGE='/account',
    // ACCOUNT_ID_PAGE='/account/:id',
    NOT_FOUND = '*',
}

export const router = createBrowserRouter([
    {
        path: CLIENT_ROUTES.HOME,
        element: <Layout />,
        children: [
            {
                path: CLIENT_ROUTES.AUTH,
                element: <UserAuthPage />
            },
            {
                path: CLIENT_ROUTES.REG,
                element: <UserRegPage />,
            },
            {
                path: CLIENT_ROUTES.HOME,
                element: <HomePage />,
            },
            {
                path: CLIENT_ROUTES.SERTIFICATES,
                element: <SertificatesPage />,
            },
            {
                path: CLIENT_ROUTES.CURRENT_SERTIFICATE_PAGE,
                element: <UpdateSertificatePage />,
            },
            {
                path: CLIENT_ROUTES.NOT_FOUND,
                element: <NotFound />,
            },
            {
                path: CLIENT_ROUTES.ACCOUNT_PAGE,
                element: <AccountPage />,
            },
            
        ]
    }
]);
