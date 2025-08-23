import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import BlockDetail from "./BlockDetail";

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
  default: ({ children }: { children: React.ReactNode }) => (
    <h3 data-testid="block-title">{children}</h3>
  ),
}));

vi.mock("../BlockPill/BlockPill", () => ({
  default: ({ children }: { children: React.ReactNode }) => (
    <span data-testid="block-pill">{children}</span>
  ),
}));

describe("BlockDetail", () => {
  it("devrait se rendre avec le titre par défaut", () => {
    render(<BlockDetail />);

    expect(screen.getByTestId("block-title")).toHaveTextContent(
      "Titre du contenu"
    );
  });

  it("devrait se rendre avec le titre personnalisé", () => {
    render(<BlockDetail title="Mon titre personnalisé" />);

    expect(screen.getByTestId("block-title")).toHaveTextContent(
      "Mon titre personnalisé"
    );
  });

  it("devrait se rendre avec le contenu par défaut", () => {
    render(<BlockDetail />);

    expect(
      screen.getByText(
        "Voici un exemple de zone de détail avec texte, méta-informations et actions contextuelles."
      )
    ).toBeInTheDocument();
  });

  it("devrait se rendre avec le contenu personnalisé", () => {
    render(<BlockDetail content="Mon contenu personnalisé" />);

    expect(screen.getByText("Mon contenu personnalisé")).toBeInTheDocument();
  });

  it("devrait afficher les trois pilles avec les bonnes icônes", () => {
    render(<BlockDetail />);

    const pills = screen.getAllByTestId("block-pill");
    expect(pills).toHaveLength(3);

    expect(pills[0]).toHaveTextContent("Aujourd hui");
    expect(pills[1]).toHaveTextContent("124");
    expect(pills[2]).toHaveTextContent("4.8");
  });

  it("devrait afficher le bouton Options", () => {
    render(<BlockDetail />);

    expect(screen.getByTestId("button-Options")).toBeInTheDocument();
  });

  it("devrait avoir le bouton avec les bonnes propriétés", () => {
    render(<BlockDetail />);

    const optionsButton = screen.getByTestId("button-Options");
    expect(optionsButton).toHaveAttribute("data-variant", "secondary");
    expect(optionsButton).toHaveAttribute("data-size", "sm");
    expect(optionsButton).toHaveClass("h-9", "px-3");
  });

  it("devrait avoir l'icône Settings dans le bouton Options", () => {
    render(<BlockDetail />);

    const optionsButton = screen.getByTestId("button-Options");
    const iconLeft = optionsButton.querySelector('[data-testid="icon-left"]');

    expect(iconLeft).toBeInTheDocument();
  });

  it("devrait avoir la structure DOM appropriée", () => {
    const { container } = render(<BlockDetail />);

    const mainContainer = container.querySelector(
      ".rounded-xl.border.bg-\\[var\\(--elev\\)\\]"
    );
    expect(mainContainer).toBeInTheDocument();

    const flexContainer = container.querySelector(
      ".flex.items-start.justify-between.gap-4"
    );
    expect(flexContainer).toBeInTheDocument();

    const pillContainer = container.querySelector(".mt-1.flex.flex-wrap.gap-2");
    expect(pillContainer).toBeInTheDocument();

    const contentParagraph = container.querySelector(
      "p.mt-3.text-sm.leading-6"
    );
    expect(contentParagraph).toBeInTheDocument();

    const imagePlaceholder = container.querySelector(".mt-4.h-32.rounded-lg");
    expect(imagePlaceholder).toBeInTheDocument();
  });

  it("devrait avoir les classes CSS appropriées", () => {
    const { container } = render(<BlockDetail />);

    const mainContainer = container.querySelector(
      ".rounded-xl.border.bg-\\[var\\(--elev\\)\\].p-4.shadow-sm"
    );
    expect(mainContainer).toBeInTheDocument();

    const flexContainer = container.querySelector(
      ".flex.items-start.justify-between.gap-4"
    );
    expect(flexContainer).toBeInTheDocument();

    const pillContainer = container.querySelector(".mt-1.flex.flex-wrap.gap-2");
    expect(pillContainer).toBeInTheDocument();
  });

  it("devrait avoir les styles inline appropriés", () => {
    const { container } = render(<BlockDetail />);

    const mainContainer = container.querySelector("[style]");
    expect(mainContainer).toBeInTheDocument();

    const imagePlaceholder = container.querySelector("[style]");
    expect(imagePlaceholder).toBeInTheDocument();

    expect(mainContainer).toHaveClass("border");
  });

  it("devrait avoir la structure des pilles appropriée", () => {
    const { container } = render(<BlockDetail />);

    const pillContainer = container.querySelector(".mt-1.flex.flex-wrap.gap-2");
    expect(pillContainer).toBeInTheDocument();

    const pills = pillContainer?.querySelectorAll('[data-testid="block-pill"]');
    expect(pills).toHaveLength(3);
  });

  it("devrait avoir la structure du bouton appropriée", () => {
    const { container } = render(<BlockDetail />);

    const optionsButton = container.querySelector(
      '[data-testid="button-Options"]'
    );
    expect(optionsButton).toBeInTheDocument();

    const iconLeft = optionsButton?.querySelector('[data-testid="icon-left"]');
    expect(iconLeft).toBeInTheDocument();
  });

  it("devrait avoir les classes de texte appropriées", () => {
    const { container } = render(<BlockDetail />);

    const contentParagraph = container.querySelector(
      ".text-sm.leading-6.text-\\[var\\(--muted\\)\\]"
    );
    expect(contentParagraph).toBeInTheDocument();
  });

  it("devrait avoir les classes de taille et d'espacement appropriées", () => {
    const { container } = render(<BlockDetail />);

    const mainContainer = container.querySelector(".p-4");
    expect(mainContainer).toBeInTheDocument();

    const pillContainer = container.querySelector(".mt-1");
    expect(pillContainer).toBeInTheDocument();

    const contentParagraph = container.querySelector(".mt-3");
    expect(contentParagraph).toBeInTheDocument();

    const imagePlaceholder = container.querySelector(".mt-4");
    expect(imagePlaceholder).toBeInTheDocument();
  });

  it("devrait gérer les props personnalisées combinées", () => {
    render(
      <BlockDetail
        title="Titre personnalisé"
        subtitle="Sous-titre personnalisé"
        content="Contenu personnalisé"
      />
    );

    expect(screen.getByTestId("block-title")).toHaveTextContent(
      "Titre personnalisé"
    );
    expect(screen.getByText("Contenu personnalisé")).toBeInTheDocument();
  });

  it("devrait avoir la structure de l'image placeholder appropriée", () => {
    const { container } = render(<BlockDetail />);

    const imagePlaceholder = container.querySelector(
      ".h-32.rounded-lg.bg-transparent"
    );
    expect(imagePlaceholder).toBeInTheDocument();
  });

  it("devrait avoir les classes de flexbox appropriées", () => {
    const { container } = render(<BlockDetail />);

    const flexContainer = container.querySelector(
      ".flex.items-start.justify-between.gap-4"
    );
    expect(flexContainer).toBeInTheDocument();

    const pillContainer = container.querySelector(".flex.flex-wrap.gap-2");
    expect(pillContainer).toBeInTheDocument();
  });

  it("devrait avoir les classes de bordure et d'ombre appropriées", () => {
    const { container } = render(<BlockDetail />);

    const mainContainer = container.querySelector(
      ".rounded-xl.border.shadow-sm"
    );
    expect(mainContainer).toBeInTheDocument();
  });

  it("devrait gérer les enfants React complexes dans les pilles", () => {
    render(<BlockDetail />);

    const pills = screen.getAllByTestId("block-pill");

    expect(pills[0]).toHaveTextContent("Aujourd hui");
    expect(pills[1]).toHaveTextContent("124");
    expect(pills[2]).toHaveTextContent("4.8");

    pills.forEach((pill) => {
      expect(pill.textContent).toBeTruthy();
      expect(pill.children.length).toBeGreaterThan(0);
    });
  });

  it("devrait avoir les classes de couleur appropriées", () => {
    const { container } = render(<BlockDetail />);

    const mainContainer = container.querySelector(".bg-\\[var\\(--elev\\)\\]");
    expect(mainContainer).toBeInTheDocument();

    const contentParagraph = container.querySelector(
      ".text-\\[var\\(--muted\\)\\]"
    );
    expect(contentParagraph).toBeInTheDocument();
  });

  it("devrait avoir la structure de l'en-tête appropriée", () => {
    const { container } = render(<BlockDetail />);

    const headerContainer = container.querySelector(
      ".flex.items-start.justify-between.gap-4"
    );
    expect(headerContainer).toBeInTheDocument();

    const leftSection = headerContainer?.querySelector("div");
    expect(leftSection).toBeInTheDocument();

    const rightSection = headerContainer?.querySelector("button");
    expect(rightSection).toBeInTheDocument();
  });
});
