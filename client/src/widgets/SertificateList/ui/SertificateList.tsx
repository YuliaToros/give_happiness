import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/shared/hooks/rtkHooks";
import { getAllSertificates } from "@/entities/sertificate/model/sertificatesThunk";
import { SertificateItem } from "@/entities/sertificate";
import { Row, Col, Empty, Spin } from "antd";

export const SertificateList = React.memo(() => {
  const dispatch = useAppDispatch();
  const { sertificates, loading, error } = useAppSelector(
    (state) => state.sertificates
  );

  useEffect(() => {
    dispatch(getAllSertificates());
  }, [dispatch]);

  if (loading) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <Spin size="large" />
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <h2 style={{ color: "red" }}>Ошибка: {error}</h2>
      </div>
    );
  }

  return (
    <Row gutter={[16, 24]} justify="center">
      {sertificates.length > 0 ? (
        sertificates.map((sertificate) => (
          <Col xs={24} sm={12} md={8} lg={8} xl={6} key={sertificate.id}>
            <SertificateItem sertificate={sertificate} />
          </Col>
        ))

  // console.log(123123, sertificates)
  // return (
  //   <>
  //     {sertificates.length ? (
  //       sertificates.map((sertificate) => {
  //         if (user?.id === sertificate.user_id) {
  //           return (
  //             <Link key={sertificate.id} to={"/item" + `/${sertificate.id}`}>
  //               <SertificateItem
  //                 key={sertificate.id}
  //                 sertificate={sertificate}
  //               />
  //             </Link>
  //           );
  //         } else {
  //           return (
  //             <SertificateItem key={sertificate.id} sertificate={sertificate} />
  //           );
  //         }
  //       })

      ) : (
        <Col span={24}>
          <Empty
            description={
              <h2 style={{ color: "#888", fontWeight: "normal" }}>
                Нет данных
              </h2>
            }
            imageStyle={{ height: 100 }}
          />
        </Col>
      )}
    </Row>
  );
});
