import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import React from "react";
import { Card, CardTitle, CardDescription } from "./Card";

describe("Card components", () => {
  it("rend le contenu dans un div par défaut", () => {
    render(
      <Card>
        <span data-testid="child">Hello</span>
      </Card>
    );
    const card = screen.getByTestId("child").closest("div");
    expect(card).toBeInTheDocument();
    expect(card).toHaveClass("rounded-2xl");
  });

  it("supporte la prop `as` pour changer la balise", () => {
    render(
      <Card as="section">
        <span>Content</span>
      </Card>
    );
    const section = screen.getByText("Content").closest("section");
    expect(section).toBeInTheDocument();
  });

  it("merge correctement les className custom", () => {
    render(
      <Card className="custom">
        <span data-testid="inner">Content</span>
      </Card>
    );
    const inner = screen.getByTestId("inner");

    const cardEl = inner.closest(".rounded-2xl") as HTMLElement | null;

    expect(cardEl).not.toBeNull();
    expect(cardEl!).toHaveClass("custom");
  });

  it("CardTitle rend un h1 par défaut avec les classes attendues", () => {
    render(<CardTitle>Hello Title</CardTitle>);
    const title = screen.getByRole("heading", { name: /hello title/i });
    expect(title.tagName.toLowerCase()).toBe("h1");
    expect(title).toHaveClass("text-2xl");
  });

  it("CardTitle supporte la prop `as`", () => {
    render(<CardTitle as="h2">Sub Title</CardTitle>);
    const title = screen.getByRole("heading", { name: /sub title/i });
    expect(title.tagName.toLowerCase()).toBe("h2");
  });

  it("CardDescription rend un paragraphe avec le texte", () => {
    render(<CardDescription>Description text</CardDescription>);
    const desc = screen.getByText(/description text/i);
    expect(desc.tagName.toLowerCase()).toBe("p");
    expect(desc).toHaveClass("text-sm");
  });
});
