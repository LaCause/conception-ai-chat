import React from "react";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import DesktopFrame from "./DesktopFrame";

describe("DesktopFrame", () => {
  it("rend le titre par défaut dans la barre (chromeTitle = app.local)", () => {
    render(
      <DesktopFrame>
        <div>content</div>
      </DesktopFrame>
    );

    expect(screen.getByText("app.local")).toBeInTheDocument();
  });

  it("rend un titre personnalisé", () => {
    render(
      <DesktopFrame chromeTitle="mockup.local">
        <div>content</div>
      </DesktopFrame>
    );
    expect(screen.getByText("mockup.local")).toBeInTheDocument();
  });

  it("rend les enfants dans la zone de contenu", () => {
    render(
      <DesktopFrame>
        <p data-testid="child">Hello</p>
      </DesktopFrame>
    );
    expect(screen.getByTestId("child")).toBeInTheDocument();
  });

  it("merge correctement className sur le conteneur externe", () => {
    const { container } = render(
      <DesktopFrame className="extra-class">
        <div />
      </DesktopFrame>
    );
    const root = container.firstElementChild as HTMLElement;
    expect(root).toHaveClass("extra-class");

    expect(root.className).toMatch(/rounded-2xl/);
    expect(root.className).toMatch(/border/);
    expect(root.className).toMatch(/overflow-hidden/);
  });

  it("présente la barre de contrôle (3 pastilles) et la zone d’adresse", () => {
    const { container } = render(
      <DesktopFrame>
        <div />
      </DesktopFrame>
    );

    const red = container.querySelector(".bg-red-400");
    const yellow = container.querySelector(".bg-yellow-400");
    const green = container.querySelector(".bg-green-400");
    expect(red).toBeInTheDocument();
    expect(yellow).toBeInTheDocument();
    expect(green).toBeInTheDocument();

    const addressBar = container.querySelector(
      ".rounded-md.border"
    ) as HTMLElement | null;
    expect(addressBar).toBeInTheDocument();
  });

  it("la zone de page a une hauteur minimale et un fond clair en light", () => {
    const { container } = render(
      <DesktopFrame>
        <div />
      </DesktopFrame>
    );

    const page = container.querySelector(
      ".min-h-\\[640px\\].bg-white"
    ) as HTMLElement | null;
    expect(page).toBeInTheDocument();
  });
});
