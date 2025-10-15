import { useEffect, useState } from "react";
import "../styles/navbar_style.css";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

type Producto = {
  id: number;
  nombre: string;
  descripcion: string;
  precio: string;
  imagen: string;
  hover?: string;
  oferta?: string;
};

const imagenesCarrusel = [
  "https://tcg-shop-assets.s3.us-east-1.amazonaws.com/img/carousel/BANNER-WEB-EL-REINO-ESCRITORIO-1.jpg",
  "https://tcg-shop-assets.s3.us-east-1.amazonaws.com/img/carousel/BANNER-WEB-EL-REINO-ESCRITORIO-2.jpg",
  "https://tcg-shop-assets.s3.us-east-1.amazonaws.com/img/carousel/edgeofeternities6073.png",
];

const juegosMesa: Producto[] = [
  {
    id: 1,
    nombre: "¿Alcachofas? ¡No, gracias!",
    descripcion: "Un juego de cartas sin corazón - DEVIR",
    precio: "$9.990",
    imagen: "https://tcg-shop-assets.s3.us-east-1.amazonaws.com/img/juegos_mesa/X_alcachofas-no-gracias1222.jpg",
    hover: "https://tcg-shop-assets.s3.us-east-1.amazonaws.com/img/juegos_mesa/X_alcachofas-no-gracias-contenido8476.png",
  },
  {
    id: 2,
    nombre: "Ensalada de puntos",
    descripcion: "Adquiere vegetales en un mercado para ganar - DEVIR",
    precio: "$11.990",
    imagen: "https://tcg-shop-assets.s3.us-east-1.amazonaws.com/img/juegos_mesa/X_ensalada-de-puntos4892.jpg",
    hover: "https://tcg-shop-assets.s3.us-east-1.amazonaws.com/img/juegos_mesa/X_ensalada-de-puntos-contenido7272.jpg",
  },
  {
    id: 3,
    nombre: "Taco Gorro Torta Caja Pizza",
    descripcion: "Deshazte de tus cartas antes que todos y ¡gana!",
    precio: "$10.990",
    imagen: "https://tcg-shop-assets.s3.us-east-1.amazonaws.com/img/juegos_mesa/X_taco-gorro-torta-caja-pizza8998.jpg",
    hover: "https://tcg-shop-assets.s3.us-east-1.amazonaws.com/img/juegos_mesa/X_taco-gorro-torta-caja-pizza-contenido0432.jpg",
  },
  {
    id: 4,
    nombre: "Yokai Sketch",
    descripcion: "Completa los bocetos de estos espíritus y obtén la victoria",
    precio: "̶$̶1̶0̶.̶9̶9̶0 $8.990",
    imagen: "https://tcg-shop-assets.s3.us-east-1.amazonaws.com/img/juegos_mesa/X_yokai-sketch8794.jpg",
    hover: "https://tcg-shop-assets.s3.us-east-1.amazonaws.com/img/juegos_mesa/X_yokai-sketch-contenido7916.jpg",
    oferta: "oferta",
  },
];

const tcg: Producto[] = [
  {
    id: 5,
    nombre: "Magic The Gathering",
    descripcion: "Murders at Karlov Manor Bundle",
    precio: "$49.990",
    imagen:
      "https://tcg-shop-assets.s3.us-east-1.amazonaws.com/img/tcg/X_magic-the-gathering-murders-at-karlov-manor-bundle8015.jpg",
    hover:
      "https://tcg-shop-assets.s3.us-east-1.amazonaws.com/img/tcg/X_magic-the-gathering-murders-at-karlov-manor-bundle-contenido0662.png",
  },
  {
    id: 6,
    nombre: "One Piece Card Game",
    descripcion: "OP11 A Fist of Divine Speed Booster Display",
    precio: "̶$129.990",
    imagen:
      "https://tcg-shop-assets.s3.us-east-1.amazonaws.com/img/tcg/X_op11-one-piece-a-fist-of-divine-speed-booster-box5231.png",
    oferta: "oferta",
  },
  {
    id: 7,
    nombre: "Pokemon Trading Card Game",
    descripcion: "Paldean Fates Elite Trainer Box",
    precio: "$42.990",
    imagen: "https://tcg-shop-assets.s3.us-east-1.amazonaws.com/img/tcg/X_pkm-pr-etb-iv1709.png",
    hover: "https://tcg-shop-assets.s3.us-east-1.amazonaws.com/img/tcg/X_pkm-pr-etb1683.png",
  },
];

export default function Home() {
  const navigate = useNavigate();
  const [index, setIndex] = useState(0);
  const { addToCart } = useCart();
  // rotación automática del carrusel
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % imagenesCarrusel.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const prevSlide = () =>
    setIndex((prev) => (prev === 0 ? imagenesCarrusel.length - 1 : prev - 1));
  const nextSlide = () =>
    setIndex((prev) => (prev + 1) % imagenesCarrusel.length);

  // 🔥 función para renderizar productos con hover
  const renderProducto = (p: Producto) => {
    const [src, setSrc] = useState(p.imagen);

    return (
      <div key={p.id} className="card">
        <img
          src={src}
          alt={p.nombre}
          className="card-img"
          width="300rem"
          onMouseEnter={() => p.hover && setSrc(p.hover)}
          onMouseLeave={() => setSrc(p.imagen)}
          onClick={() => navigate(`/producto/${p.id}`)}
        />
        <h4 onClick={() => navigate(`/producto/${p.id}`)}>
          <b>{p.nombre}</b>
        </h4>
        <p>{p.descripcion}</p>
        <h4 className={p.oferta ? "oferta" : ""}>{p.precio}</h4>
        <button className="boton" onClick={() => addToCart(p)}>Agregar al carrito</button>

      </div>
    );
  };

  return (
    <main>
      {/* Carrusel */}
      <div className="carousel">
        <div className="carousel-images">
          {imagenesCarrusel.map((src, i) => (
            <img
              key={i}
              src={src}
              alt={`Slide ${i + 1}`}
              className={i === index ? "active" : ""}
            />
          ))}
        </div>
        <button className="carousel-btn prev" onClick={prevSlide}>
          &#10094;
        </button>
        <button className="carousel-btn next" onClick={nextSlide}>
          &#10095;
        </button>
      </div>

      {/* Juegos de Mesa */}
      <section className="content">
        <h1 className="titulos">JUEGOS DE MESA</h1>
        <div className="spacer">{juegosMesa.map(renderProducto)}</div>

        <hr className="separador" />

        {/* TCG */}
        <h1 className="titulos">TRADING CARD GAMES</h1>
        <div className="spacer">{tcg.map(renderProducto)}</div>
      </section>
    </main>
  );
}
