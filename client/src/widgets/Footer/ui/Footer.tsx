import React from "react";
import { Layout, Row, Col, Typography } from "antd"; // , Divider
import Link from "antd/es/typography/Link";

const { Text, Title } = Typography;

export const Footer = React.memo(() => {
  const currentYear = new Date().getFullYear();

  return (
    <Layout.Footer
      style={{ backgroundColor: "#220E5B", color: "#CFF47F" }}
      className="py-4"
    >
      <Row gutter={16}>
        <Col xs={24} sm={8}>
          <Text   style={{ color: "#CFF47F" }}>&copy; {currentYear}, Подари счастье</Text>
        </Col>
        <Col xs={24} sm={8}>
          <Title style={{ color: "#CFF47F" }} level={5}>Контакты</Title>
          <ul style={{ listStyleType: "none", padding: 0 }}>
            <li>Email: <Link href="mailto:info@bedolagiprodaktion.com" style={{ color: "#CFF47F" }}>info@happiness.ru</Link></li>
            <li>Телефон: <Link href="tel:+71234567890" style={{ color: "#CFF47F" }}>+7 (123) 456-78-90</Link></li>
          </ul>
        </Col>
        <Col xs={24} sm={8}>
          {/* <ul style={{ listStyleType: "none", padding: 0 }}>
            <li><Link href="#" style={{ color: "#333" }}>О компании</Link></li>
            <li><Link href="#" style={{ color: "#333" }}>Оплата и доставка</Link></li>
          </ul> */}
        </Col>
      </Row>
    </Layout.Footer>
  );
});