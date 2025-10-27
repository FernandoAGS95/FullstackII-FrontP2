import { useEffect, useState } from "react";
import "../styles/admin_style.css";

// ==== Tipos ====
type ContactMessage = {
  id: number;
  nombre: string;
  apellido: string;
  correo: string;
  celular: string;
  mensaje: string;
  timestamp: string;
};

type LoginAttempt = {
  id: number;
  email: string;
  success: boolean;
  timestamp: string;
};

type Product = {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  imagen: string;
};

type Banner = {
  id: number;
  url: string;
  titulo?: string;
};

export default function Admin() {
  const [activeTab, setActiveTab] = useState<
    "mensajes" | "intentos" | "productos" | "banners"
  >("mensajes");

  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [attempts, setAttempts] = useState<LoginAttempt[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [banners, setBanners] = useState<Banner[]>([]);

  useEffect(() => {
    try {
      const m = localStorage.getItem("contact_messages");
      setMessages(m ? JSON.parse(m) : []);
    } catch {}

    try {
      const a = localStorage.getItem("login_attempts");
      setAttempts(a ? JSON.parse(a) : []);
    } catch {}

    try {
      const p = localStorage.getItem("products");
      setProducts(p ? JSON.parse(p) : []);
    } catch {}

    try {
      const b = localStorage.getItem("banners");
      setBanners(b ? JSON.parse(b) : []);
    } catch {}
  }, []);

  // ====== GUARDADO LOCAL ======
  const saveProducts = (newProducts: Product[]) => {
    setProducts(newProducts);
    localStorage.setItem("products", JSON.stringify(newProducts));
  };

  const saveBanners = (newBanners: Banner[]) => {
    setBanners(newBanners);
    localStorage.setItem("banners", JSON.stringify(newBanners));
  };

  // ====== BORRAR DATOS ======
  const clearMessages = () => {
    localStorage.removeItem("contact_messages");
    setMessages([]);
  };

  const clearAttempts = () => {
    localStorage.removeItem("login_attempts");
    setAttempts([]);
  };

  return (
    <main className="admin-panel">
      <h1>Panel de Administrador</h1>

      {/* === NAV DE TABS === */}
      <div className="tabs">
        <button
          className={activeTab === "mensajes" ? "active" : ""}
          onClick={() => setActiveTab("mensajes")}
        >
          📩 Mensajes
        </button>
        <button
          className={activeTab === "intentos" ? "active" : ""}
          onClick={() => setActiveTab("intentos")}
        >
          🔑 Intentos Login
        </button>
        <button
          className={activeTab === "productos" ? "active" : ""}
          onClick={() => setActiveTab("productos")}
        >
          🛒 Productos
        </button>
        <button
          className={activeTab === "banners" ? "active" : ""}
          onClick={() => setActiveTab("banners")}
        >
          🖼️ Banners
        </button>
      </div>

      {/* === CONTENIDO SEGÚN PESTAÑA === */}
      <div className="tab-content">
        {activeTab === "mensajes" && (
          <section>
            <h2>Mensajes de Contacto ({messages.length})</h2>
            <button onClick={clearMessages}>Borrar mensajes</button>
            {messages.length === 0 ? (
              <p>No hay mensajes.</p>
            ) : (
              <ul>
                {messages
                  .slice()
                  .reverse()
                  .map((m) => (
                    <li key={m.id}>
                      <strong>
                        {m.nombre} {m.apellido}
                      </strong>{" "}
                      — {m.correo}
                      <div>{m.mensaje}</div>
                    </li>
                  ))}
              </ul>
            )}
          </section>
        )}

        {activeTab === "intentos" && (
          <section>
            <h2>Intentos de Login ({attempts.length})</h2>
            <button onClick={clearAttempts}>Borrar intentos</button>
            {attempts.length === 0 ? (
              <p>No hay intentos.</p>
            ) : (
              <ul>
                {attempts
                  .slice()
                  .reverse()
                  .map((a) => (
                    <li key={a.id}>
                      {a.email} — {a.success ? "✅ OK" : "❌ FALLIDO"} —{" "}
                      {new Date(a.timestamp).toLocaleString()}
                    </li>
                  ))}
              </ul>
            )}
          </section>
        )}

        {activeTab === "productos" && (
          <section className="admin-section">
            <h2>Productos ({products.length})</h2>
            <form
              className="admin-form"
              onSubmit={(e) => {
                e.preventDefault();
                const form = e.target as HTMLFormElement;
                const nombre = (
                  form.elements.namedItem("nombre") as HTMLInputElement
                ).value;
                const descripcion = (
                  form.elements.namedItem("descripcion") as HTMLInputElement
                ).value;
                const precio = parseFloat(
                  (form.elements.namedItem("precio") as HTMLInputElement).value
                );
                const imagen = (
                  form.elements.namedItem("imagen") as HTMLInputElement
                ).value;

                const nuevo: Product = {
                  id: Date.now(),
                  nombre,
                  descripcion,
                  precio,
                  imagen,
                };
                saveProducts([...products, nuevo]);
                form.reset();
              }}
            >
              <input name="nombre" placeholder="Nombre" required />
              <input name="descripcion" placeholder="Descripción" required />
              <input
                name="precio"
                type="number"
                step="0.01"
                placeholder="Precio"
                required
              />
              <input name="imagen" placeholder="URL de imagen" required />
              <button type="submit">Agregar producto</button>
            </form>

            {products.length === 0 ? (
              <p>No hay productos.</p>
            ) : (
              <div className="product-list">
                {products.map((p) => (
                  <div key={p.id} className="product-card">
                    <img src={p.imagen} alt={p.nombre} />
                    <h3>{p.nombre}</h3>
                    <p className="description">{p.descripcion}</p>
                    <div className="price">${p.precio}</div>
                    <div className="card-actions">
                      <button
                        onClick={() => {
                          const nombre = prompt("Nuevo nombre:", p.nombre);
                          if (!nombre) return;
                          const descripcion = prompt(
                            "Nueva descripción:",
                            p.descripcion
                          );
                          if (!descripcion) return;
                          const precioStr = prompt(
                            "Nuevo precio:",
                            p.precio.toString()
                          );
                          const precio = precioStr
                            ? parseFloat(precioStr)
                            : p.precio;
                          const imagen =
                            prompt("Nueva URL de imagen:", p.imagen) ||
                            p.imagen;

                          const actualizado = {
                            ...p,
                            nombre,
                            descripcion,
                            precio,
                            imagen,
                          };
                          saveProducts(
                            products.map((x) =>
                              x.id === p.id ? actualizado : x
                            )
                          );
                        }}
                      >
                        ✏️ Editar
                      </button>
                      <button
                        onClick={() =>
                          saveProducts(products.filter((x) => x.id !== p.id))
                        }
                      >
                        🗑️ Eliminar
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        )}

        {activeTab === "banners" && (
          <section>
            <h2>Banners del Carrusel ({banners.length})</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const form = e.target as HTMLFormElement;
                const url = (form.elements.namedItem("url") as HTMLInputElement)
                  .value;
                const titulo = (
                  form.elements.namedItem("titulo") as HTMLInputElement
                ).value;

                const nuevo: Banner = { id: Date.now(), url, titulo };
                saveBanners([...banners, nuevo]);
                form.reset();
              }}
              className="form-box"
            >
              <input name="url" placeholder="URL de la imagen" required />
              <input name="titulo" placeholder="Título (opcional)" />
              <button type="submit">Agregar banner</button>
            </form>

            {banners.length === 0 ? (
              <p>No hay banners.</p>
            ) : (
              <ul>
                {banners.map((b) => (
                  <li key={b.id}>
                    <img src={b.url} alt={b.titulo || "banner"} width="200" />
                    {b.titulo && <p>{b.titulo}</p>}
                  </li>
                ))}
              </ul>
            )}
          </section>
        )}
      </div>
    </main>
  );
}
