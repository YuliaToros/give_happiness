import { fetchUserCart } from "@/entities/cart/model/cartThunk";
import { getAllSertificates } from "@/entities/sertificate/model/sertificatesThunk";
import { refreshAccessToken } from "@/entities/user/model/userThunk";
import { useAppDispatch } from "@/shared/hooks/rtkHooks";
import { MemoNav, MemoFooter } from "@/widgets";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";

export function Layout() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(refreshAccessToken()).unwrap();
    dispatch(getAllSertificates()).unwrap();
    dispatch(fetchUserCart());
  }, [dispatch]);

  return (
    <>
      <div style={{ position: "sticky", top: 0, zIndex: 1000 }}>
        <MemoNav />
      </div>
      <div className="container d-flex flex-column flex-grow-1">
        <Outlet />
      </div>
      <MemoFooter />
    </>
  );
}
