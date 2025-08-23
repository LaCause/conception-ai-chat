import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import BlockSub from "./BlockSub";

describe("BlockSub", () => {
  it("devrait se rendre avec le texte des enfants", () => {
    render(<BlockSub>Sous-titre de test</BlockSub>);

    expect(screen.getByText("Sous-titre de test")).toBeInTheDocument();
  });

  it("devrait utiliser la balise p", () => {
    const { container } = render(<BlockSub>Sous-titre de test</BlockSub>);

    const subtitleElement = container.querySelector("p");
    expect(subtitleElement).toBeInTheDocument();
  });

  it("devrait avoir les classes CSS de base", () => {
    const { container } = render(<BlockSub>Sous-titre de test</BlockSub>);

    const subtitleElement = container.querySelector("p");
    expect(subtitleElement).toHaveClass("text-sm", "text-[var(--muted)]");
  });

  it("devrait appliquer les classes CSS personnalisées", () => {
    const { container } = render(
      <BlockSub className="custom-class">Sous-titre de test</BlockSub>
    );

    const subtitleElement = container.querySelector("p");
    expect(subtitleElement).toHaveClass("custom-class");
  });

  it("devrait combiner les classes personnalisées avec les classes de base", () => {
    const { container } = render(
      <BlockSub className="custom-class">Sous-titre de test</BlockSub>
    );

    const subtitleElement = container.querySelector("p");
    expect(subtitleElement).toHaveClass(
      "text-sm",
      "text-[var(--muted)]",
      "custom-class"
    );
  });

  it("devrait gérer les enfants React complexes", () => {
    render(
      <BlockSub>
        <span>Sous-titre avec</span> <strong>formatage</strong>{" "}
        <em>complexe</em>
      </BlockSub>
    );

    expect(screen.getByText("Sous-titre avec")).toBeInTheDocument();
    expect(screen.getByText("formatage")).toBeInTheDocument();
    expect(screen.getByText("complexe")).toBeInTheDocument();
  });

  it("devrait gérer les enfants avec du HTML", () => {
    render(
      <BlockSub>
        <span>
          Sous-titre avec <a href="#">lien</a>
        </span>
      </BlockSub>
    );

    expect(screen.getByText("Sous-titre avec")).toBeInTheDocument();
    expect(screen.getByText("lien")).toBeInTheDocument();

    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "#");
  });

  it("devrait gérer les enfants vides", () => {
    const { container } = render(<BlockSub>{""}</BlockSub>);

    const subtitleElement = container.querySelector("p");
    expect(subtitleElement).toBeInTheDocument();
    expect(subtitleElement?.textContent).toBe("");
  });

  it("devrait gérer les enfants null", () => {
    const { container } = render(<BlockSub>{null}</BlockSub>);

    const subtitleElement = container.querySelector("p");
    expect(subtitleElement).toBeInTheDocument();
  });

  it("devrait gérer les enfants undefined", () => {
    const { container } = render(<BlockSub>{undefined}</BlockSub>);

    const subtitleElement = container.querySelector("p");
    expect(subtitleElement).toBeInTheDocument();
  });

  it("devrait gérer les enfants avec des nombres", () => {
    render(<BlockSub>{42}</BlockSub>);

    expect(screen.getByText("42")).toBeInTheDocument();
  });

  it("devrait gérer les enfants avec des booléens", () => {
    const { container } = render(<BlockSub>{true}</BlockSub>);

    const subtitleElement = container.querySelector("p");
    expect(subtitleElement).toBeInTheDocument();

    expect(subtitleElement?.textContent).toBe("");
  });

  it("devrait avoir la structure DOM appropriée", () => {
    const { container } = render(<BlockSub>Sous-titre de test</BlockSub>);

    const subtitleElement = container.querySelector(
      "p.text-sm.text-\\[var\\(--muted\\)\\]"
    );
    expect(subtitleElement).toBeInTheDocument();
  });

  it("devrait gérer plusieurs classes personnalisées", () => {
    const { container } = render(
      <BlockSub className="class1 class2 class3">Sous-titre de test</BlockSub>
    );

    const subtitleElement = container.querySelector("p");
    expect(subtitleElement).toHaveClass("class1", "class2", "class3");
  });

  it("devrait gérer les classes avec des espaces", () => {
    const { container } = render(
      <BlockSub className="  spaced-class  ">Sous-titre de test</BlockSub>
    );

    const subtitleElement = container.querySelector("p");
    expect(subtitleElement).toHaveClass("spaced-class");
  });

  it("devrait gérer les classes vides", () => {
    const { container } = render(
      <BlockSub className="">Sous-titre de test</BlockSub>
    );

    const subtitleElement = container.querySelector("p");
    expect(subtitleElement).toHaveClass("text-sm", "text-[var(--muted)]");
  });

  it("devrait gérer les classes undefined", () => {
    const { container } = render(
      <BlockSub className={undefined}>Sous-titre de test</BlockSub>
    );

    const subtitleElement = container.querySelector("p");
    expect(subtitleElement).toHaveClass("text-sm", "text-[var(--muted)]");
  });

  it("devrait gérer les classes null", () => {
    const { container } = render(
      <BlockSub className="">Sous-titre de test</BlockSub>
    );

    const subtitleElement = container.querySelector("p");
    expect(subtitleElement).toHaveClass("text-sm", "text-[var(--muted)]");
  });

  it("devrait avoir les classes de taille et de couleur appropriées", () => {
    const { container } = render(<BlockSub>Sous-titre de test</BlockSub>);

    const subtitleElement = container.querySelector("p");
    expect(subtitleElement).toHaveClass("text-sm");
    expect(subtitleElement).toHaveClass("text-[var(--muted)]");
  });

  it("devrait gérer les enfants avec des composants React", () => {
    const TestComponent = () => <span>Composant de test</span>;

    render(
      <BlockSub>
        <TestComponent />
      </BlockSub>
    );

    expect(screen.getByText("Composant de test")).toBeInTheDocument();
  });
});
