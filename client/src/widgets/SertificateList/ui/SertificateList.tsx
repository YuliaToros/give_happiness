// import { CLIENT_ROUTES } from "@/app/router";
import { SertificateItem } from "@/entities/sertificate";
import { getAllSertificates } from "@/entities/sertificate/model/sertificatesThunk";
import { useAppDispatch, useAppSelector } from "@/shared/hooks/rtkHooks";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
// import { Link } from "react-router-dom";

export const SertificateList = React.memo(() => {
  const dispatch = useAppDispatch();
  const { sertificates } = useAppSelector((state) => state.sertificates);
  const { user } = useAppSelector((state) => state.user);

  useEffect(() => {
    dispatch(getAllSertificates());
  }, [dispatch]);
console.log(123123, sertificates)
  return (
    <>
      {sertificates.length > 0 ? (
        sertificates.map((sertificate) => {
          if (user?.id === sertificate.user_id) {
            return (
              <Link key={sertificate.id} to={"/item" + `/${sertificate.id}`}>
                <SertificateItem
                  key={sertificate.id}
                  sertificate={sertificate}
                />
              </Link>
            );
          } else {
            return (
              <SertificateItem key={sertificate.id} sertificate={sertificate} />
            );
          }
        })
      ) : (
        <h2>No data</h2>
      )}
    </>
  );
});
