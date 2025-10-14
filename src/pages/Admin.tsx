import { useEffect, useState } from "react";

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

export default function Admin() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [attempts, setAttempts] = useState<LoginAttempt[]>([]);

  useEffect(() => {
    try {
      const m = localStorage.getItem("contact_messages");
      setMessages(m ? JSON.parse(m) : []);
    } catch (err) {
      console.error(err);
    }

    try {
      const a = localStorage.getItem("login_attempts");
      setAttempts(a ? JSON.parse(a) : []);
    } catch (err) {
      console.error(err);
    }
  }, []);

  const clearMessages = () => {
    localStorage.removeItem("contact_messages");
    setMessages([]);
  };

  const clearAttempts = () => {
    localStorage.removeItem("login_attempts");
    setAttempts([]);
  };

  return (
    <main style={{ padding: 20 }}>
      <h1>Panel de Administrador</h1>

      <section style={{ marginTop: 20 }}>
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
                <li key={m.id} style={{ marginBottom: 8 }}>
                  <strong>
                    {m.nombre} {m.apellido}
                  </strong>{" "}
                  — {m.correo} — {new Date(m.timestamp).toLocaleString()}
                  <div>{m.mensaje}</div>
                </li>
              ))}
          </ul>
        )}
      </section>

      <section style={{ marginTop: 20 }}>
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
                <li key={a.id} style={{ marginBottom: 6 }}>
                  {a.email} — {a.success ? "OK" : "FALLIDO"} —{" "}
                  {new Date(a.timestamp).toLocaleString()}
                </li>
              ))}
          </ul>
        )}
      </section>
    </main>
  );
}
