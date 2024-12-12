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
              padding: "20px 60px",
            }}
          >
            {/* <h1
              style={{
                fontSize: "3rem",
                textAlign: "left",
                color: "#220E5B",
                fontWeight: "bold",
                lineHeight: 1.2,
              }}
            >
              Подари счастье
            </h1>
            <p
              style={{
                fontSize: "1.2rem",
                color: "#220E5B",
                marginTop: "10px",
              }}
            >
              маркет-плейс по продаже электронных подарочных сертификатов
            </p> */}
            <p
              style={{
                fontSize: "1rem",
                color: "#220E5B",
                marginTop: "10px",
              }}
            >
              Ищешь идеальный подарок, который удивит и порадует? Мы предлагаем
              огромный выбор сертификатов на любимые бренды, развлечения, рестораны,
              SPA и многое другое. Просто, удобно и быстро — выбери, оплати и подари
              радость близким.
            </p>
          </div>
    
          {/* Правая колонка */}
          <div
            style={{
              flex: 1,
              backgroundColor: "#FFF",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
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
};