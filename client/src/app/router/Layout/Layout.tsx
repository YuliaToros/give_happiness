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

  const ParticleBackground = () => {
    useEffect(() => {
      const canvas = document.createElement("canvas");
      canvas.style.position = "fixed"; // Фиксированное позиционирование
      canvas.style.top = "0";
      canvas.style.left = "0";
      canvas.style.width = "100%";
      canvas.style.height = "100%";
      canvas.style.zIndex = "-1"; // Фон должен быть ниже всех элементов
      document.body.appendChild(canvas);
      const ctx = canvas.getContext("2d");

      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      const particles = [];
      const particleCount = 100;

      const createParticle = () => {
        return {
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 3 + 1,
          speedX: Math.random() * 2 - 1,
          speedY: Math.random() * 2 - 1,
          color: `rgba(172, 200, 229, ${Math.random()})`,
        };
      };

      for (let i = 0; i < particleCount; i++) {
        particles.push(createParticle());
      }

      const animate = () => {
        ctx!.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach((particle) => {
          particle.x += particle.speedX;
          particle.y += particle.speedY;

          if (particle.x > canvas.width || particle.x < 0) {
            particle.speedX = -particle.speedX;
          }
          if (particle.y > canvas.height || particle.y < 0) {
            particle.speedY = -particle.speedY;
          }

          ctx!.beginPath();
          ctx!.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
          ctx!.fillStyle = particle.color;
          ctx!.fill();
        });
        requestAnimationFrame(animate);
      };

      animate();

      const handleResize = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      };

      window.addEventListener("resize", handleResize);
      return () => {
        window.removeEventListener("resize", handleResize);
        document.body.removeChild(canvas);
      };
    }, []);

    return null;
  };



  return (
    <>
      <ParticleBackground />
      <div style={{ position: "sticky", top: 0, zIndex: 1000 }}>
        <MemoNav />
      </div>
      <div className="container d-flex flex-column flex-grow-1" style={{ minHeight: "100vh" }}>
        <Outlet />
      </div>
      <MemoFooter  />
    </>
  );
}