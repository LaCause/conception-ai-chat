import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import BlockPill from "./BlockPill";

describe("BlockPill", () => {
  it("devrait se rendre avec le texte des enfants", () => {
    render(<BlockPill>Tag de test</BlockPill>);

    expect(screen.getByText("Tag de test")).toBeInTheDocument();
  });

  it("devrait utiliser la balise span", () => {
    const { container } = render(<BlockPill>Tag de test</BlockPill>);

    const pillElement = container.querySelector("span");
    expect(pillElement).toBeInTheDocument();
  });

  it("devrait avoir les classes CSS de base", () => {
    const { container } = render(<BlockPill>Tag de test</BlockPill>);

    const pillElement = container.querySelector("span");
    expect(pillElement).toHaveClass(
      "inline-flex",
      "items-center",
      "gap-1",
      "rounded-full",
      "border",
      "px-2",
      "py-1",
      "text-xs",
      "text-[var(--fg)]"
    );
  });

  it("devrait appliquer les classes CSS personnalisées", () => {
    const { container } = render(
      <BlockPill className="custom-class">Tag de test</BlockPill>
    );

    const pillElement = container.querySelector("span");
    expect(pillElement).toHaveClass("custom-class");
  });

  it("devrait avoir les styles inline appropriés", () => {
    const { container } = render(<BlockPill>Tag de test</BlockPill>);

    const pillElement = container.querySelector("span");
    expect(pillElement).toHaveStyle({
      borderColor: "color-mix(in srgb, var(--primary) 30%, transparent)",
      backgroundColor: "color-mix(in srgb, var(--primary) 5%, transparent)",
    });
  });

  it("devrait combiner les classes personnalisées avec les classes de base", () => {
    const { container } = render(
      <BlockPill className="custom-class">Tag de test</BlockPill>
    );

    const pillElement = container.querySelector("span");
    expect(pillElement).toHaveClass(
      "inline-flex",
      "items-center",
      "gap-1",
      "rounded-full",
      "border",
      "px-2",
      "py-1",
      "text-xs",
      "text-[var(--fg)]",
      "custom-class"
    );
  });

  it("devrait gérer les enfants React complexes", () => {
    render(
      <BlockPill>
        <span>Tag avec</span> <strong>éléments</strong>
      </BlockPill>
    );

    expect(screen.getByText("Tag avec")).toBeInTheDocument();
    expect(screen.getByText("éléments")).toBeInTheDocument();
  });

  it("devrait avoir la structure flexbox appropriée", () => {
    const { container } = render(<BlockPill>Tag de test</BlockPill>);

    const pillElement = container.querySelector("span");
    expect(pillElement).toHaveClass("inline-flex", "items-center", "gap-1");
  });
});
