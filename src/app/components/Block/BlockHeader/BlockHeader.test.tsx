import React from "react";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import BlockHeader from "./BlockHeader";

describe("BlockHeader", () => {
  it("rend le titre et le sous-titre par défaut", () => {
    render(<BlockHeader />);

    expect(screen.getByText("App Name")).toBeInTheDocument();
    expect(screen.getByText("Sous-titre ou statut")).toBeInTheDocument();
  });

  it("rend un titre et un sous-titre personnalisés", () => {
    render(<BlockHeader title="Dashboard" subtitle="Bienvenue 👋" />);

    expect(screen.getByText("Dashboard")).toBeInTheDocument();
    expect(screen.getByText("Bienvenue 👋")).toBeInTheDocument();
  });

  it("affiche deux boutons d'action (Bell, Settings) et un avatar User", () => {
    render(<BlockHeader />);

    const buttons = screen.getAllByRole("button");
    expect(buttons.length).toBe(2);

    const avatar = document.querySelector(
      ".h-9.w-9.rounded-full"
    ) as HTMLElement | null;
    expect(avatar).not.toBeNull();
  });

  it("applique le style de bordure teintée (color-mix) sur le conteneur", () => {
    const { container } = render(<BlockHeader />);
    const wrapper = container.firstElementChild as HTMLElement;
    expect(wrapper).toBeInTheDocument();
    expect(wrapper.getAttribute("style") || "").toMatch(/color-mix\(/);
  });
});
