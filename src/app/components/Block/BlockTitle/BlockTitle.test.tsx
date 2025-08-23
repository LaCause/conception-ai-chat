import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import BlockTitle from "./BlockTitle";

describe("BlockTitle", () => {
  it("devrait se rendre avec le texte des enfants", () => {
    render(<BlockTitle>Titre de test</BlockTitle>);

    expect(screen.getByText("Titre de test")).toBeInTheDocument();
  });

  it("devrait utiliser la balise h3", () => {
    const { container } = render(<BlockTitle>Titre de test</BlockTitle>);

    const titleElement = container.querySelector("h3");
    expect(titleElement).toBeInTheDocument();
  });

  it("devrait avoir les classes CSS de base", () => {
    const { container } = render(<BlockTitle>Titre de test</BlockTitle>);

    const titleElement = container.querySelector("h3");
    expect(titleElement).toHaveClass("font-semibold", "tracking-tight");
  });

  it("devrait avoir la taille normale par défaut", () => {
    const { container } = render(<BlockTitle>Titre de test</BlockTitle>);

    const titleElement = container.querySelector("h3");
    expect(titleElement).toHaveClass("text-lg", "text-[var(--primary)]");
  });

  it("devrait avoir la taille petite quand small est true", () => {
    const { container } = render(<BlockTitle small>Titre de test</BlockTitle>);

    const titleElement = container.querySelector("h3");
    expect(titleElement).toHaveClass("text-base");
    expect(titleElement).not.toHaveClass("text-lg", "text-[var(--primary)]");
  });

  it("devrait appliquer les classes CSS personnalisées", () => {
    const { container } = render(
      <BlockTitle className="custom-class">Titre de test</BlockTitle>
    );

    const titleElement = container.querySelector("h3");
    expect(titleElement).toHaveClass("custom-class");
  });

  it("devrait combiner les classes personnalisées avec les classes de base", () => {
    const { container } = render(
      <BlockTitle className="custom-class" small>
        Titre de test
      </BlockTitle>
    );

    const titleElement = container.querySelector("h3");
    expect(titleElement).toHaveClass(
      "font-semibold",
      "tracking-tight",
      "text-base",
      "custom-class"
    );
  });

  it("devrait gérer les enfants React complexes", () => {
    render(
      <BlockTitle>
        <span>Titre avec</span> <strong>éléments</strong> <em>complexes</em>
      </BlockTitle>
    );

    expect(screen.getByText("Titre avec")).toBeInTheDocument();
    expect(screen.getByText("éléments")).toBeInTheDocument();
    expect(screen.getByText("complexes")).toBeInTheDocument();
  });
});
