import { GiftOutlined, MailOutlined, SmileOutlined, CheckCircleOutlined } from "@ant-design/icons";

export function CardBlock() {
  return (
    <div style={{ display: "flex", height: "80vh" }}>
      {/* Левая колонка */}
      <div
        style={{
          flex: 1,
          backgroundColor: "#FFF",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          padding: "20px 0px 60px 100px",
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
            <GiftOutlined style={{ fontSize: "2rem", color: "#220E5B" }} />
          </div>
          <div>
            <h3 style={{ fontSize: "1.2rem", color: "#220E5B", margin: 0 }}>Безграничный выбор</h3>
            <p style={{ fontSize: "1rem", color: "#220E5B", margin: "5px 0 0 0" }}>
              Более 500 категорий сертификатов на любой случай жизни.
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
            <MailOutlined style={{ fontSize: "2rem", color: "#220E5B" }} />
          </div>
          <div>
            <h3 style={{ fontSize: "1.2rem", color: "#220E5B", margin: 0 }}>Простота и удобство</h3>
            <p style={{ fontSize: "1rem", color: "#220E5B", margin: "5px 0 0 0" }}>
              Электронный сертификат моментально отправляется на email.
            </p>
          </div>
        </div>

        {/* Третий блок */}
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
            <SmileOutlined style={{ fontSize: "2rem", color: "#220E5B" }} />
          </div>
          <div>
            <h3 style={{ fontSize: "1.2rem", color: "#220E5B", margin: 0 }}>Идеальный подарок</h3>
            <p style={{ fontSize: "1rem", color: "#220E5B", margin: "5px 0 0 0" }}>
              Дари радость, которая никого не оставит равнодушным.
            </p>
          </div>
        </div>

        {/* Четвертый блок */}
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
            <CheckCircleOutlined style={{ fontSize: "2rem", color: "#220E5B" }} />
          </div>
          <div>
            <h3 style={{ fontSize: "1.2rem", color: "#220E5B", margin: 0 }}>Гарантия качества</h3>
            <p style={{ fontSize: "1rem", color: "#220E5B", margin: "5px 0 0 0" }}>
              Мы работаем только с проверенными партнерами.
            </p>
          </div>
        </div>
      </div>

      {/* Правая колонка */}
      <div
        style={{
          flex: 1,
          backgroundColor: "#FFF",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "0px 100px 0px 60px ",
        }}
      >
        <img
          src={`${import.meta.env.VITE_IMAGES}/giftcard.png`}
          alt="Фотография"
          style={{ width: "80%", height: "80%", objectFit: "cover" }}
        />
      </div>
    </div>
  );
}