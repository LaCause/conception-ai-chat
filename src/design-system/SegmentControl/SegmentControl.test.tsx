import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SegmentControl } from "./SegmentControl";

type Mode = "mobile" | "desktop" | "both";

const OPTIONS: { value: Mode; label: React.ReactNode }[] = [
  { value: "mobile", label: "📱 Mobile" },
  { value: "desktop", label: "💻 Desktop" },
  { value: "both", label: "⬛ Les deux" },
];

describe("SegmentControl", () => {
  it("rend les options et marque la valeur active via aria-pressed", () => {
    const onChange = vi.fn();
    render(
      <SegmentControl<Mode>
        value="mobile"
        onChange={onChange}
        options={OPTIONS}
      />
    );

    const mobile = screen.getByRole("button", { name: /mobile/i });
    const desktop = screen.getByRole("button", { name: /desktop/i });
    const both = screen.getByRole("button", { name: /les deux/i });

    expect(mobile).toBeInTheDocument();
    expect(desktop).toBeInTheDocument();
    expect(both).toBeInTheDocument();

    expect(mobile).toHaveAttribute("aria-pressed", "true");
    expect(desktop).toHaveAttribute("aria-pressed", "false");
    expect(both).toHaveAttribute("aria-pressed", "false");
  });

  it("appelle onChange avec la valeur cliquée", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(
      <SegmentControl<Mode>
        value="mobile"
        onChange={onChange}
        options={OPTIONS}
      />
    );

    await user.click(screen.getByRole("button", { name: /desktop/i }));
    expect(onChange).toHaveBeenCalledWith("desktop");

    await user.click(screen.getByRole("button", { name: /les deux/i }));
    expect(onChange).toHaveBeenCalledWith("both");
  });

  it("applique les classes actives sur le segment sélectionné", () => {
    const onChange = vi.fn();
    const { rerender } = render(
      <SegmentControl<Mode>
        value="mobile"
        onChange={onChange}
        options={OPTIONS}
      />
    );

    const mobile = screen.getByRole("button", { name: /mobile/i });
    const desktop = screen.getByRole("button", { name: /desktop/i });

    expect(mobile.className).toMatch(/font-medium/);
    expect(mobile.className).toMatch(/bg-black\/5/);

    expect(desktop.className).not.toMatch(/font-medium/);

    rerender(
      <SegmentControl<Mode>
        value="desktop"
        onChange={onChange}
        options={OPTIONS}
      />
    );
    expect(screen.getByRole("button", { name: /desktop/i }).className).toMatch(
      /font-medium/
    );
  });

  it("ajoute une bordure à gauche sauf pour le premier segment", () => {
    const onChange = vi.fn();
    render(
      <SegmentControl<Mode>
        value="mobile"
        onChange={onChange}
        options={OPTIONS}
      />
    );
    const buttons = screen.getAllByRole("button");
    expect(buttons[0].className).not.toMatch(/border-l/);
    expect(buttons[1].className).toMatch(/border-l/);
    expect(buttons[2].className).toMatch(/border-l/);
  });

  it("merge correctement className sur le conteneur", () => {
    const onChange = vi.fn();
    const { container } = render(
      <SegmentControl<Mode>
        value="mobile"
        onChange={onChange}
        options={OPTIONS}
        className="extra-class"
      />
    );
    const root = container.firstElementChild as HTMLElement;
    expect(root).toHaveClass("extra-class");

    expect(root.className).toMatch(/rounded-xl/);
    expect(root.className).toMatch(/border/);
  });
});
