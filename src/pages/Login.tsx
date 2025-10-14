// src/pages/Login.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/login_style.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login con:", { email, password });

    // comprobación simple de credenciales de administrador
    const isAdmin = email === "admin@tcg.cl" && password === "admin";

    const attempt = {
      id: Date.now(),
      email,
      success: isAdmin,
      timestamp: new Date().toISOString(),
    };
    try {
      const saved = localStorage.getItem("login_attempts");
      const arr = saved ? JSON.parse(saved) : [];
      arr.push(attempt);
      localStorage.setItem("login_attempts", JSON.stringify(arr));
    } catch (err) {
      console.error("Error guardando intento de login:", err);
    }

    if (isAdmin) {
      // navegar a la vista de admin
      navigate("/admin");
      return;
    }

    // para otros casos, aquí iría la llamada real al backend
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Iniciar Sesión</h2>

        <label htmlFor="email">Correo electrónico</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="ejemplo@correo.com"
          required
        />

        <label htmlFor="password">Contraseña</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="********"
          required
        />

        <button type="submit">Ingresar</button>
      </form>
    </div>
  );
}
