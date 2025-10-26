import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import Producto from "../src/pages/Producto";

const mockAddToCart = vi.fn();

vi.mock("../src/context/CartContext", () => ({
  useCart: () => ({
    addToCart: mockAddToCart,
  }),
}));

const mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual<typeof import("react-router-dom")>(
    "react-router-dom"
  );
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe("Componente <Producto />", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("muestra correctamente los datos del producto cuando existe", () => {
    render(
      <MemoryRouter initialEntries={["/producto/1"]}>
        <Routes>
          <Route path="/producto/:id" element={<Producto />} />
        </Routes>
      </MemoryRouter>
    );

    expect(
      screen.getByRole("heading", { name: /¿Alcachofas\? ¡No, gracias!/i })
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Un juego de cartas sin corazón - DEVIR/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/\$9\.990/)).toBeInTheDocument();
  });

  it("muestra 'Producto no encontrado' si el id no existe", () => {
    render(
      <MemoryRouter initialEntries={["/producto/999"]}>
        <Routes>
          <Route path="/producto/:id" element={<Producto />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText("Producto no encontrado")).toBeInTheDocument();

    const volverButton = screen.getByRole("button", { name: /volver a home/i });
    fireEvent.click(volverButton);
    expect(mockNavigate).toHaveBeenCalledWith("/");
  });

  it("llama a addToCart al presionar el botón de agregar", () => {
    render(
      <MemoryRouter initialEntries={["/producto/2"]}>
        <Routes>
          <Route path="/producto/:id" element={<Producto />} />
        </Routes>
      </MemoryRouter>
    );

    const boton = screen.getByRole("button", { name: /agregar al carrito/i });
    fireEvent.click(boton);

    expect(mockAddToCart).toHaveBeenCalledTimes(1);
  });
});