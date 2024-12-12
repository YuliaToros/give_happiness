import { CheckCircleOutlined, CreditCardOutlined, MailOutlined } from "@ant-design/icons";

export function AboutPayBlock() {
  return (
    <div
      style={{ display: "flex", height: "80vh", backgroundColor: "#E1DBFD" }}
    >
      {/* Левая колонка */}
      <div
        style={{
          flex: 1,
          backgroundColor: "#E1DBFD",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <img
          src={`${import.meta.env.VITE_IMAGES}/aboutpaywoman.png`}
          alt="Фотография"
          style={{ width: "80%", height: "80%", objectFit: "cover" }}
        />
      </div>

      {/* Правая колонка */}
      <div
        style={{
          flex: 1,
          backgroundColor: "#E1DBFD",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          padding: "20px 60px",
        }}
      >
        {/* Первый блок */}
        <div style={{ display: "flex", alignItems: "center", marginBottom: "30px" }}>
          <div style={{
            backgroundColor: "#F1FFC7",
            borderRadius: "50%",
            width: "50px",
            height: "50px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginRight: "15px",
          }}>
            <CheckCircleOutlined style={{ fontSize: "1.5rem", color: "#220E5B" }} />
          </div>
          <div>
            <h3 style={{ fontSize: "1.2rem", color: "#220E5B", margin: 0 }}>Выбери сертификат</h3>
            <p style={{ fontSize: "1rem", color: "#220E5B", margin: "5px 0 0 0" }}>
              Найди идеальный вариант из нашего каталога.
            </p>
          </div>
        </div>

        {/* Второй блок */}
        <div style={{ display: "flex", alignItems: "center", marginBottom: "30px" }}>
          <div style={{
            backgroundColor: "#F1FFC7",
            borderRadius: "50%",
            width: "50px",
            height: "50px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginRight: "15px",
          }}>
            <CreditCardOutlined style={{ fontSize: "1.5rem", color: "#220E5B" }} />
          </div>
          <div>
            <h3 style={{ fontSize: "1.2rem", color: "#220E5B", margin: 0 }}>Оплати</h3>
            <p style={{ fontSize: "1rem", color: "#220E5B", margin: "5px 0 0 0" }}>
              Просто оплати онлайн удобным способом.
            </p>
          </div>
        </div>

        {/* Третий блок */}
        <div style={{ display: "flex", alignItems: "center" }}>
          <div style={{
            backgroundColor: "#F1FFC7",
            borderRadius: "50%",
            width: "50px",
            height: "50px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginRight: "15px",
          }}>
            <MailOutlined style={{ fontSize: "1.5rem", color: "#220E5B" }} />
          </div>
          <div>
            <h3 style={{ fontSize: "1.2rem", color: "#220E5B", margin: 0 }}>Подари радость</h3>
            <p style={{ fontSize: "1rem", color: "#220E5B", margin: "5px 0 0 0" }}>
              Электронный сертификат моментально отправляется на email.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}