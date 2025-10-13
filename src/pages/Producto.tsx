import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "../styles/producto_style.css";

type Producto = {
  id: number;
  nombre: string;
  descripcion: string;
  precio: string;
  imagen: string;
  hover?: string;
  oferta?: string;
};

// Aquí van todos tus productos (combina ambos arrays)
const todosLosProductos: Producto[] = [
  {
    id: 1,
    nombre: "¿Alcachofas? ¡No, gracias!",
    descripcion: "Un juego de cartas sin corazón - DEVIR",
    precio: "$9.990",
    imagen: "/img/juegos_mesa/X_alcachofas-no-gracias1222.jpg",
    hover: "/img/juegos_mesa/X_alcachofas-no-gracias-contenido8476.png",
  },
  {
    id: 2,
    nombre: "Ensalada de puntos",
    descripcion: "Adquiere vegetales en un mercado para ganar - DEVIR",
    precio: "$11.990",
    imagen: "/img/juegos_mesa/X_ensalada-de-puntos4892.jpg",
    hover: "/img/juegos_mesa/X_ensalada-de-puntos-contenido7272.jpg",
  },
  {
    id: 3,
    nombre: "Taco Gorro Torta Caja Pizza",
    descripcion: "Deshazte de tus cartas antes que todos y ¡gana!",
    precio: "$10.990",
    imagen: "/img/juegos_mesa/X_taco-gorro-torta-caja-pizza8998.jpg",
    hover: "/img/juegos_mesa/X_taco-gorro-torta-caja-pizza-contenido0432.jpg",
  },
  {
    id: 4,
    nombre: "Yokai Sketch",
    descripcion: "Completa los bocetos de estos espíritus y obtén la victoria",
    precio: "$10.990 $8.990",
    imagen: "/img/juegos_mesa/X_yokai-sketch8794.jpg",
    hover: "/img/juegos_mesa/X_yokai-sketch-contenido7916.jpg",
    oferta: "oferta",
  },
  {
    id: 5,
    nombre: "Magic The Gathering",
    descripcion: "Murders at Karlov Manor Bundle",
    precio: "$49.990",
    imagen:
      "/img/tcg/X_magic-the-gathering-murders-at-karlov-manor-bundle8015.jpg",
    hover:
      "/img/tcg/X_magic-the-gathering-murders-at-karlov-manor-bundle-contenido0662.png",
  },
  {
    id: 6,
    nombre: "One Piece Card Game",
    descripcion: "OP11 A Fist of Divine Speed Booster Display",
    precio: "$149.990 $129.990",
    imagen:
      "/img/tcg/X_op11-one-piece-a-fist-of-divine-speed-booster-box5231.png",
    oferta: "oferta",
  },
  {
    id: 7,
    nombre: "Pokemon Trading Card Game",
    descripcion: "Paldean Fates Elite Trainer Box",
    precio: "$42.990",
    imagen: "/img/tcg/X_pkm-pr-etb-iv1709.png",
    hover: "/img/tcg/X_pkm-pr-etb1683.png",
  },
];

export default function Producto() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const producto = todosLosProductos.find((p) => p.id === Number(id));

  if (!producto) {
    return (
      <main
        style={{ marginTop: "120px", padding: "20px", textAlign: "center" }}
      >
        <h1>Producto no encontrado</h1>
        <button onClick={() => navigate("/")} style={{ marginTop: "20px" }}>
          Volver a Home
        </button>
      </main>
    );
  }

  return (
    <main style={{ marginTop: "120px", padding: "20px" }}>
      <div
        style={{
          display: "flex",
          gap: "40px",
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        {/* Imagen del producto */}
        <div style={{ flex: 1 }}>
          <img
            src={producto.imagen}
            alt={producto.nombre}
            style={{ width: "100%", maxWidth: "500px", borderRadius: "8px" }}
          />
        </div>

        {/* Detalles del producto */}
        <div style={{ flex: 1 }}>
          <h1>{producto.nombre}</h1>
          <p style={{ fontSize: "18px", color: "#666", marginBottom: "20px" }}>
            {producto.descripcion}
          </p>

          <h2
            className={producto.oferta ? "oferta" : ""}
            style={{ fontSize: "28px", marginBottom: "20px" }}
          >
            {producto.precio}
          </h2>

          <button onClick={() => addToCart(producto)}>
            Agregar al carrito
          </button>
        </div>
      </div>
    </main>
  );
}
