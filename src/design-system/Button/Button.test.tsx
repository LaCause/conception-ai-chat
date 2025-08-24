import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React, { createRef } from "react";
import { Plus, ArrowRight } from "lucide-react";
import Button from "./Button";

describe("Design System – Button", () => {
  it("rend le label et déclenche onClick", async () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Valider</Button>);
    const btn = screen.getByRole("button", { name: /valider/i });
    await userEvent.click(btn);
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("applique la variante primary par défaut", () => {
    render(<Button>Action</Button>);
    const btn = screen.getByRole("button", { name: /action/i });
    expect(btn.className).toMatch(/bg-\[--primary\]/);
    expect(btn).toHaveClass("h-11");
  });

  it("supporte les variantes secondary, ghost et danger", () => {
    const { rerender } = render(<Button variant="secondary">Sec</Button>);
    let btn = screen.getByRole("button", { name: /sec/i });
    expect(btn.className).toMatch(/border/);
    expect(btn.className).toMatch(/bg-\[--elev\]\/80/);

    rerender(<Button variant="ghost">Ghost</Button>);
    btn = screen.getByRole("button", { name: /ghost/i });
    expect(btn.className).toMatch(/hover:bg-black\/5/);

    rerender(<Button variant="danger">Danger</Button>);
    btn = screen.getByRole("button", { name: /danger/i });
    expect(btn.className).toMatch(/bg-red-500/);
  });

  it("gère les tailles sm, md, lg", () => {
    const { rerender } = render(<Button size="sm">Small</Button>);
    let btn = screen.getByRole("button", { name: /small/i });
    expect(btn).toHaveClass("h-9");

    rerender(<Button size="md">Medium</Button>);
    btn = screen.getByRole("button", { name: /medium/i });
    expect(btn).toHaveClass("h-11");

    rerender(<Button size="lg">Large</Button>);
    btn = screen.getByRole("button", { name: /large/i });
    expect(btn).toHaveClass("h-12");
  });

  it("affiche les icônes gauche/droite si fournies", () => {
    render(
      <Button
        iconLeft={<Plus data-testid="icon-left" />}
        iconRight={<ArrowRight data-testid="icon-right" />}
      >
        Continuer
      </Button>
    );
    expect(screen.getByTestId("icon-left")).toBeInTheDocument();
    expect(screen.getByTestId("icon-right")).toBeInTheDocument();
  });

  it("le mode loading affiche le spinner, masque le contenu et désactive le bouton", async () => {
    const onClick = vi.fn();
    render(
      <Button loading onClick={onClick} iconLeft={<Plus />}>
        Envoyer
      </Button>
    );
    const btn = screen.getByRole("button");

    expect(btn.querySelector(".animate-spin")).toBeInTheDocument();

    expect(screen.queryByText(/envoyer/i)).not.toBeInTheDocument();

    expect(btn).toBeDisabled();

    await userEvent.click(btn);
    expect(onClick).not.toHaveBeenCalled();
  });

  it("disabled empêche le clic", async () => {
    const onClick = vi.fn();
    render(
      <Button disabled onClick={onClick}>
        Off
      </Button>
    );
    const btn = screen.getByRole("button", { name: /off/i });
    expect(btn).toBeDisabled();
    await userEvent.click(btn);
    expect(onClick).not.toHaveBeenCalled();
  });

  it("block rend le bouton full width", () => {
    render(<Button block>Large</Button>);
    const btn = screen.getByRole("button", { name: /large/i });
    expect(btn).toHaveClass("w-full");
  });

  it("forwardRef fonctionne (focus via ref)", () => {
    const ref = createRef<HTMLButtonElement>();
    render(<Button ref={ref}>Focus</Button>);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
    ref.current?.focus();
    expect(ref.current).toHaveFocus();
  });

  it("merge correctement les className custom", () => {
    render(<Button className="data-test-flag">X</Button>);
    const btn = screen.getByRole("button", { name: "X" });
    expect(btn).toHaveClass("data-test-flag");
  });
});
