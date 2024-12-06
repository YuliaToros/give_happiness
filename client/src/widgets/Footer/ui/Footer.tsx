import React from "react";
import { Container, Row, Col } from 'react-bootstrap';
// import { Link } from "react-router-dom";

export const Footer = React.memo(() => {

    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-dark text-white py-4">
      <Container>
        <Row>
          <Col md={4}>
            <p>&copy; {currentYear}, Бедолаги продактион</p>
          </Col>
          <Col md={4}>
            <h5>Контакты</h5>
            <ul className="list-unstyled">
              <li>Email: info@bedolagiprodaktion.com</li>
              <li>Телефон: +7 (123) 456-78-90</li>
            </ul>
          </Col>
          <Col md={4}>
            <a href='#'>О компании</a>
          </Col>
        </Row>
        <Row>
          <Col>
            <a href='#'>Оплата и доставка</a>
          </Col>
        </Row>
      </Container>
    </footer>
    );
})