import { useParams } from "react-router-dom";

export default function Producto() {
  const { id } = useParams();

  return (
    <main style={{ marginTop: "120px", padding: "20px" }}>
      <h1>Producto {id}</h1>
      <p>Detalles del producto {id}.</p>
    </main>
  );
}
