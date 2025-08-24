import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import BlockCardGrid from "./BlockCardGrid";

vi.mock("@/design-system/Button/Button", () => ({
  default: ({
    children,
    variant,
    size,
    className,
    iconLeft,
  }: {
    children: React.ReactNode;
    variant?: string;
    size?: string;
    className?: string;
    iconLeft?: React.ReactNode;
  }) => (
    <button
      data-testid={`button-${children}`}
      data-variant={variant}
      data-size={size}
      className={className}
    >
      {iconLeft && <span data-testid="icon-left">{iconLeft}</span>}
      {children}
    </button>
  ),
}));

vi.mock("../BlockTitle/BlockTitle", () => ({
  default: ({
    children,
    small,
  }: {
    children: React.ReactNode;
    small?: boolean;
  }) => (
    <h3 data-testid="block-title" data-small={small}>
      {children}
    </h3>
  ),
}));

vi.mock("lucide-react", () => ({
  Image: ({ className }: { className?: string }) => (
    <div data-testid="image-icon" className={className} />
  ),
  Star: ({ className }: { className?: string }) => (
    <div data-testid="star-icon" className={className} />
  ),
  Plus: ({ className }: { className?: string }) => (
    <div data-testid="plus-icon" className={className} />
  ),
}));

describe("BlockCardGrid", () => {
  it("devrait se rendre avec le titre par défaut", () => {
    render(<BlockCardGrid />);

    expect(screen.getByText("Cartes")).toBeInTheDocument();
  });

  it("devrait se rendre avec le titre personnalisé", () => {
    render(<BlockCardGrid title="Mes cartes" />);

    expect(screen.getByText("Mes cartes")).toBeInTheDocument();
  });

  it("devrait avoir 2 colonnes par défaut", () => {
    const { container } = render(<BlockCardGrid />);

    const gridContainer = container.querySelector(".grid-cols-2");
    expect(gridContainer).toBeInTheDocument();
  });

  it("devrait avoir le bon nombre de colonnes selon la prop cols", () => {
    const { container, rerender } = render(<BlockCardGrid cols={3} />);

    let gridContainer = container.querySelector(".grid-cols-3");
    expect(gridContainer).toBeInTheDocument();

    rerender(<BlockCardGrid cols={4} />);
    gridContainer = container.querySelector(".grid-cols-4");
    expect(gridContainer).toBeInTheDocument();

    rerender(<BlockCardGrid cols={1} />);
    gridContainer = container.querySelector(".grid-cols-1");
    expect(gridContainer).toBeInTheDocument();
  });

  it("devrait limiter cols entre 1 et 4", () => {
    const { container, rerender } = render(<BlockCardGrid cols={0} />);

    let gridContainer = container.querySelector(".grid-cols-1");
    expect(gridContainer).toBeInTheDocument();

    rerender(<BlockCardGrid cols={5} />);
    gridContainer = container.querySelector(".grid-cols-4");
    expect(gridContainer).toBeInTheDocument();
  });

  it("devrait générer le bon nombre de cartes", () => {
    render(<BlockCardGrid cols={2} />);

    expect(screen.getAllByText(/Carte \d+/)).toHaveLength(4);
  });

  it("devrait avoir la structure de carte appropriée", () => {
    render(<BlockCardGrid />);

    expect(screen.getByText("Carte 1")).toBeInTheDocument();
    expect(screen.getAllByText("Sous-texte")).toHaveLength(4);
    expect(screen.getAllByText("Détails")).toHaveLength(4);
    expect(screen.getAllByText("Ajouter")).toHaveLength(4);
  });

  it("devrait avoir les classes CSS appropriées", () => {
    const { container } = render(<BlockCardGrid />);

    const mainContainer = container.querySelector(
      ".rounded-xl.border.bg-\\[var\\(--elev\\)\\]"
    );
    expect(mainContainer).toBeInTheDocument();

    const gridContainer = container.querySelector(".mt-3.grid.gap-3");
    expect(gridContainer).toBeInTheDocument();
  });

  it("devrait avoir les styles inline appropriés", () => {
    const { container } = render(<BlockCardGrid />);

    const mainContainer = container.querySelector("[style]");
    expect(mainContainer).toBeInTheDocument();

    const cards = container.querySelectorAll("[style]");
    expect(cards.length).toBeGreaterThan(0);

    expect(mainContainer).toHaveClass("border");
  });

  it("devrait avoir les boutons avec les bonnes variantes", () => {
    render(<BlockCardGrid />);

    const detailsButtons = screen.getAllByTestId("button-Détails");
    const addButtons = screen.getAllByTestId("button-Ajouter");

    detailsButtons.forEach((button) => {
      expect(button).toHaveAttribute("data-variant", "secondary");
    });

    addButtons.forEach((button) => {
      expect(button).toHaveAttribute("data-variant", "primary");
    });
  });

  it("devrait avoir les boutons avec la bonne taille", () => {
    render(<BlockCardGrid />);

    const detailsButtons = screen.getAllByTestId("button-Détails");
    const addButtons = screen.getAllByTestId("button-Ajouter");

    detailsButtons.forEach((button) => {
      expect(button).toHaveAttribute("data-size", "sm");
    });

    addButtons.forEach((button) => {
      expect(button).toHaveAttribute("data-size", "sm");
    });
  });

  it("devrait avoir les classes de bouton appropriées", () => {
    render(<BlockCardGrid />);

    const detailsButtons = screen.getAllByTestId("button-Détails");
    const addButtons = screen.getAllByTestId("button-Ajouter");

    detailsButtons.forEach((button) => {
      expect(button).toHaveClass("h-8", "px-2", "text-xs");
    });

    addButtons.forEach((button) => {
      expect(button).toHaveClass("h-8", "px-2", "text-xs");
    });
  });

  it("devrait avoir l'icône dans le bouton Ajouter", () => {
    render(<BlockCardGrid />);

    const addButtons = screen.getAllByTestId("button-Ajouter");
    const iconLefts = screen.getAllByTestId("icon-left");

    expect(iconLefts).toHaveLength(addButtons.length);

    addButtons.forEach((button, index) => {
      expect(button).toContainElement(iconLefts[index]);
    });
  });

  it("devrait gérer les différentes valeurs de cols correctement", () => {
    const testCases = [
      { cols: 1, expectedCards: 2, expectedClass: "grid-cols-1" },
      { cols: 2, expectedCards: 4, expectedClass: "grid-cols-2" },
      { cols: 3, expectedCards: 6, expectedClass: "grid-cols-3" },
      { cols: 4, expectedCards: 8, expectedClass: "grid-cols-4" },
    ];

    testCases.forEach(({ cols, expectedCards, expectedClass }) => {
      const { container, unmount } = render(<BlockCardGrid cols={cols} />);

      const gridContainer = container.querySelector(`.${expectedClass}`);
      expect(gridContainer).toBeInTheDocument();

      const cards = screen.getAllByText(/Carte \d+/);
      expect(cards).toHaveLength(expectedCards);

      unmount();
    });
  });

  it("devrait avoir le bon nombre d'icônes", () => {
    render(<BlockCardGrid cols={2} />);

    expect(screen.getAllByTestId("image-icon")).toHaveLength(4);
    expect(screen.getAllByTestId("star-icon")).toHaveLength(4);
    expect(screen.getAllByTestId("plus-icon")).toHaveLength(4);
  });
});
