import { fetchUserCart } from "@/entities/cart/model/cartThunk";
import { getAllSertificates } from "@/entities/sertificate/model/sertificatesThunk";
import { refreshAccessToken } from "@/entities/user/model/userThunk";
import { useAppDispatch } from "@/shared/hooks/rtkHooks";
import { MemoNav, MemoFooter } from "@/widgets";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";

export function Layout() {
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(refreshAccessToken()).unwrap()
        dispatch(getAllSertificates()).unwrap()
        dispatch(fetchUserCart());
    }, [dispatch]);


    return (
        <>
            <MemoNav />
            <div className="container d-flex flex-column vh-100">
                <Outlet />
            </div>
            <MemoFooter />
        </>
    );
}

