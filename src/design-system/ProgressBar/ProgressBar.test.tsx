import React from "react";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import ProgressBar from "./ProgressBar";

describe("ProgressBar", () => {
  it("rend un <progress> accessible (même masqué) avec les bons attributs par défaut", () => {
    render(<ProgressBar value={50} />);

    const progress = screen.getByRole("progressbar", {
      hidden: true,
    }) as HTMLProgressElement;
    expect(progress).toBeInTheDocument();
    expect(progress.getAttribute("aria-label")).toBe("Progression");
    expect(progress.getAttribute("max")).toBe("100");

    expect(progress.getAttribute("value")).toBe("50");
  });

  it("accepte un label personnalisé", () => {
    render(<ProgressBar value={10} label="Upload status" />);
    const progress = screen.getByRole("progressbar", { hidden: true });
    expect(progress).toHaveAttribute("aria-label", "Upload status");
  });

  it("calcule correctement la largeur de la barre interne (25%)", () => {
    const { container } = render(<ProgressBar value={25} max={100} />);
    const bar = container.querySelector(
      'div[aria-hidden="true"]'
    ) as HTMLDivElement;
    expect(bar).toBeInTheDocument();
    expect(bar.style.width).toBe("25%");
  });

  it("clamp: value < 0 -> 0% ; value > max -> 100%", () => {
    let { container } = render(<ProgressBar value={-10} max={100} />);
    const { unmount } = render(<ProgressBar value={-10} max={100} />);

    let bar = container.querySelector(
      'div[aria-hidden="true"]'
    ) as HTMLDivElement;
    expect(bar.style.width).toBe("0%");

    unmount();
    ({ container } = render(<ProgressBar value={150} max={100} />));
    bar = container.querySelector('div[aria-hidden="true"]') as HTMLDivElement;
    expect(bar.style.width).toBe("100%");
  });

  it("affiche le pourcentage arrondi quand showPercent=true", () => {
    render(<ProgressBar value={33} max={100} showPercent />);
    expect(screen.getByText("33%")).toBeInTheDocument();
  });

  it("n'affiche pas le pourcentage quand showPercent=false", () => {
    render(<ProgressBar value={33} max={100} showPercent={false} />);
    expect(screen.queryByText(/%$/)).not.toBeInTheDocument();
  });

  it("merge correctement className custom sur le conteneur", () => {
    const { container } = render(
      <ProgressBar value={10} className="custom-class" />
    );
    const root = container.firstElementChild as HTMLElement;
    expect(root).toHaveClass("custom-class");
  });
});
