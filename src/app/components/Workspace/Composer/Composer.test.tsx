import React from "react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Composer from "./Composer";

beforeEach(() => {
  vi.restoreAllMocks();
});

function setup(props?: Partial<React.ComponentProps<typeof Composer>>) {
  const onChange = vi.fn();
  const onSubmit = vi.fn();
  const value = props?.value ?? "";
  const compact = props?.compact ?? false;

  render(
    <Composer
      value={value}
      onChange={onChange}
      onSubmit={onSubmit}
      compact={compact}
      {...props}
    />
  );

  const textarea = screen.getByLabelText(
    /Décrivez votre idée d’application/i
  ) as HTMLTextAreaElement;
  const button = screen.getByRole("button", { name: /Générer le mockup/i });

  return { textarea, button, onChange, onSubmit };
}

describe("Composer", () => {
  it("rend le textarea et le bouton; le bouton est désactivé quand value est vide", () => {
    const { textarea, button } = setup({ value: "" });
    expect(textarea).toBeInTheDocument();
    expect(button).toBeDisabled();
  });

  it("active le bouton quand value est non vide", () => {
    const { button } = setup({ value: "Hello", compact: false });
    expect(button).not.toBeDisabled();
  });

  it("appelle onChange et tronque à 1000 caractères", () => {
    const onChange = vi.fn();
    const onSubmit = vi.fn();
    render(
      <Composer
        value=""
        onChange={onChange}
        onSubmit={onSubmit}
        compact={false}
      />
    );

    const textarea = screen.getByLabelText(
      /Décrivez votre idée d’application/i
    ) as HTMLTextAreaElement;

    const big = "x".repeat(1200);

    fireEvent.change(textarea, { target: { value: big } });

    expect(onChange).toHaveBeenCalled();

    const arg = onChange.mock.calls[0][0] as string;
    expect(arg.length).toBe(1000);

    onChange.mock.calls.forEach(([v]) => {
      expect((v as string).length).toBeLessThanOrEqual(1000);
    });
  });

  it("affiche le compteur de caractères value.length/1000", () => {
    setup({ value: "Hello world", compact: false });
    expect(screen.getByText(/11\/1000/)).toBeInTheDocument();
  });

  it("en mode compact, la barre d’aide est masquée en base (classe 'hidden sm:flex')", () => {
    const { container } = render(
      <Composer value="" onChange={vi.fn()} onSubmit={vi.fn()} compact />
    );

    const hint = container.querySelector("div.mt-2");
    expect(hint).toBeTruthy();

    expect(hint!.className).toMatch(/hidden\s+sm:flex/);
  });

  it("Enter sans Shift déclenche onSubmit si value.trim() non vide", () => {
    const { textarea, onSubmit } = setup({ value: "  idée  " });
    fireEvent.keyDown(textarea, { key: "Enter", code: "Enter" });
    expect(onSubmit).toHaveBeenCalledTimes(1);
  });

  it("Enter avec Shift ne soumet pas", () => {
    const { textarea, onSubmit } = setup({ value: "multiligne" });
    fireEvent.keyDown(textarea, {
      key: "Enter",
      code: "Enter",
      shiftKey: true,
    });
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it("ne soumet pas si value ne contient que des espaces", () => {
    const { textarea, onSubmit } = setup({ value: "   " });
    fireEvent.keyDown(textarea, { key: "Enter", code: "Enter" });
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it("clic sur le bouton appelle onSubmit (quand value non vide)", async () => {
    const { button, onSubmit } = setup({ value: "run" });
    await userEvent.click(button);
    expect(onSubmit).toHaveBeenCalledTimes(1);
  });

  it("auto-resize fixe la hauteur au min(scrollHeight, 220)px", async () => {
    const { textarea } = setup({ value: "" });

    Object.defineProperty(textarea, "scrollHeight", {
      value: 500,
      configurable: true,
    });

    await userEvent.type(textarea, "du texte");

    expect(textarea.style.height).toBe("220px");
  });
});
