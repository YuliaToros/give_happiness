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
          <Col xs={24} sm={12} md={8} lg={6} xl={4} key={sertificate.id}>
            <div style={{
              width: "100%",
              padding: "15px",
              borderRadius: "10px",
              // boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
              backgroundColor: "#fff",
            }}>
              <SertificateItem sertificate={sertificate} />
            </div>
          </Col>
        ))
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