import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import BlockHero from "./BlockHero";
import { ButtonProps } from "@/design-system/Button/Button";

vi.mock("@/design-system/Button/Button", () => ({
  default: ({ children, variant, size, iconLeft }: ButtonProps) => (
    <button
      data-testid={`button-${children}`}
      data-variant={variant}
      data-size={size}
    >
      {iconLeft && <span data-testid="icon-left">{iconLeft}</span>}
      {children}
    </button>
  ),
}));

describe("BlockHero", () => {
  it("devrait se rendre avec le titre par défaut", () => {
    render(<BlockHero />);

    expect(screen.getByText("Bienvenue 👋")).toBeInTheDocument();
  });

  it("devrait se rendre avec le titre personnalisé", () => {
    render(<BlockHero title="Mon titre personnalisé" />);

    expect(screen.getByText("Mon titre personnalisé")).toBeInTheDocument();
  });

  it("devrait se rendre avec la description par défaut", () => {
    render(<BlockHero />);

    expect(
      screen.getByText("Présentez votre proposition de valeur en une phrase.")
    ).toBeInTheDocument();
  });

  it("devrait se rendre avec la description personnalisée", () => {
    render(<BlockHero description="Ma description personnalisée" />);

    expect(
      screen.getByText("Ma description personnalisée")
    ).toBeInTheDocument();
  });

  it("devrait se rendre avec le CTA par défaut", () => {
    render(<BlockHero />);

    expect(screen.getByText("Commencer")).toBeInTheDocument();
  });

  it("devrait se rendre avec le CTA personnalisé", () => {
    render(<BlockHero cta="Mon CTA" />);

    expect(screen.getByText("Mon CTA")).toBeInTheDocument();
  });

  it("devrait avoir les deux boutons", () => {
    render(<BlockHero />);

    expect(screen.getByTestId("button-Commencer")).toBeInTheDocument();
    expect(screen.getByTestId("button-En savoir plus")).toBeInTheDocument();
  });

  it("devrait avoir les boutons avec les bonnes variantes", () => {
    render(<BlockHero />);

    const ctaButton = screen.getByTestId("button-Commencer");
    const secondaryButton = screen.getByTestId("button-En savoir plus");

    expect(ctaButton).toHaveAttribute("data-variant", "primary");
    expect(secondaryButton).toHaveAttribute("data-variant", "secondary");
  });

  it("devrait avoir les boutons avec la bonne taille", () => {
    render(<BlockHero />);

    const ctaButton = screen.getByTestId("button-Commencer");
    const secondaryButton = screen.getByTestId("button-En savoir plus");

    expect(ctaButton).toHaveAttribute("data-size", "md");
    expect(secondaryButton).toHaveAttribute("data-size", "md");
  });

  it("devrait avoir l'icône Plus dans le bouton CTA", () => {
    render(<BlockHero />);

    const ctaButton = screen.getByTestId("button-Commencer");
    const iconLeft = ctaButton.querySelector('[data-testid="icon-left"]');

    expect(iconLeft).toBeInTheDocument();
  });

  it("devrait avoir la structure DOM appropriée", () => {
    const { container } = render(<BlockHero />);

    const mainContainer = container.querySelector(
      ".relative.overflow-hidden.rounded-2xl.border.p-6.shadow-sm"
    );
    expect(mainContainer).toBeInTheDocument();

    const backgroundElement = container.querySelector(
      ".pointer-events-none.absolute.-inset-2.opacity-30.blur-2xl"
    );
    expect(backgroundElement).toBeInTheDocument();

    const contentContainer = container.querySelector(".relative");
    expect(contentContainer).toBeInTheDocument();
  });

  it("devrait avoir les classes CSS appropriées", () => {
    const { container } = render(<BlockHero />);

    const title = container.querySelector(
      "h2.text-2xl.font-bold.gradient-text"
    );
    expect(title).toBeInTheDocument();

    const description = container.querySelector(
      "p.mt-2.text-\\[var\\(--muted\\)\\]"
    );
    expect(description).toBeInTheDocument();

    const buttonContainer = container.querySelector(
      ".mt-4.flex.items-center.gap-2"
    );
    expect(buttonContainer).toBeInTheDocument();
  });

  it("devrait avoir les styles inline appropriés", () => {
    const { container } = render(<BlockHero />);

    const mainContainer = container.querySelector("[style]");
    expect(mainContainer).toBeInTheDocument();

    expect(mainContainer).toHaveClass("border");

    const backgroundElements = container.querySelectorAll("[style]");
    expect(backgroundElements.length).toBeGreaterThan(1);
  });

  it("devrait gérer les props personnalisées combinées", () => {
    render(
      <BlockHero
        title="Titre personnalisé"
        description="Description personnalisée"
        cta="CTA personnalisé"
      />
    );

    expect(screen.getByText("Titre personnalisé")).toBeInTheDocument();
    expect(screen.getByText("Description personnalisée")).toBeInTheDocument();
    expect(screen.getByText("CTA personnalisé")).toBeInTheDocument();
  });

  it("devrait avoir l'effet de flou d'arrière-plan", () => {
    const { container } = render(<BlockHero />);

    const backgroundElement = container.querySelector(".blur-2xl");
    expect(backgroundElement).toBeInTheDocument();

    expect(backgroundElement).toHaveClass("opacity-30", "pointer-events-none");
  });

  it("devrait avoir le masque radial sur l'arrière-plan", () => {
    const { container } = render(<BlockHero />);

    const backgroundElement = container.querySelector(
      '[style*="radial-gradient"]'
    );
    expect(backgroundElement).toBeInTheDocument();
  });

  it("devrait avoir la structure de boutons appropriée", () => {
    const { container } = render(<BlockHero />);

    const buttonContainer = container.querySelector(".flex.items-center.gap-2");
    expect(buttonContainer).toBeInTheDocument();

    const buttons = buttonContainer?.querySelectorAll("button");
    expect(buttons).toHaveLength(2);
  });

  it("devrait gérer les enfants React complexes dans les boutons", () => {
    render(<BlockHero cta="CTA avec formatage" />);

    expect(screen.getByText(/CTA avec/i)).toBeInTheDocument();
    expect(screen.getByText(/formatage/i)).toBeInTheDocument();
  });
});
