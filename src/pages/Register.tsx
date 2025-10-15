// src/pages/Register.tsx
import { useState } from "react";
import "../styles/register_style.css";

export default function Register() {
  const [formData, setFormData] = useState({
    nombre: "",
    correo: "",
    password: "",
    confirmar: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmar) {
      alert("Las contraseñas no coinciden");
      return;
    }

    console.log("Solicitud de registro:", formData);

    // 👉 Aquí después se conectará al backend
    alert("Solicitud enviada (simulación)");
  };

  return (
    <div className="register-container">
      <form className="register-form" onSubmit={handleSubmit}>
        <h2>Crear Cuenta</h2>

        <label htmlFor="nombre">Nombre</label>
        <input
          id="nombre"
          name="nombre"
          type="text"
          value={formData.nombre}
          onChange={handleChange}
          placeholder="Tu nombre"
          required
        />

        <label htmlFor="correo">Correo electrónico</label>
        <input
          id="correo"
          name="correo"
          type="email"
          value={formData.correo}
          onChange={handleChange}
          placeholder="ejemplo@correo.com"
          required
        />

        <label htmlFor="password">Contraseña</label>
        <input
          id="password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="********"
          required
        />

        <label htmlFor="confirmar">Confirmar Contraseña</label>
        <input
          id="confirmar"
          name="confirmar"
          type="password"
          value={formData.confirmar}
          onChange={handleChange}
          placeholder="********"
          required
        />

        <button type="submit">Registrarse</button>
      </form>
    </div>
  );
}
