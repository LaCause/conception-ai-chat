import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import BlockCtaBar from "./BlockCtaBar";
import { ButtonProps } from "@/design-system/Button/Button";

vi.mock("@/design-system/Button/Button", () => ({
  default: ({ children, variant, iconRight }: ButtonProps) => (
    <button data-testid={`button-${children}`} data-variant={variant}>
      {children}
      {iconRight && <span data-testid="icon-right">{iconRight}</span>}
    </button>
  ),
}));

describe("BlockCtaBar", () => {
  it("devrait se rendre avec le titre par défaut", () => {
    render(<BlockCtaBar />);

    expect(screen.getByText("Action principale")).toBeInTheDocument();
  });

  it("devrait se rendre avec le titre personnalisé", () => {
    render(<BlockCtaBar title="Mon action" />);

    expect(screen.getByText("Mon action")).toBeInTheDocument();
  });

  it("devrait se rendre avec le texte secondaire par défaut", () => {
    render(<BlockCtaBar />);

    expect(screen.getByText("Plus tard")).toBeInTheDocument();
  });

  it("devrait se rendre avec le texte secondaire personnalisé", () => {
    render(<BlockCtaBar secondary="Annuler" />);

    expect(screen.getByText("Annuler")).toBeInTheDocument();
  });

  it("devrait afficher le texte de question", () => {
    render(<BlockCtaBar />);

    expect(screen.getByText("Prêt à continuer ?")).toBeInTheDocument();
  });

  it("devrait avoir les deux boutons", () => {
    render(<BlockCtaBar />);

    expect(screen.getByTestId("button-Action principale")).toBeInTheDocument();
    expect(screen.getByTestId("button-Plus tard")).toBeInTheDocument();
  });

  it("devrait avoir les boutons avec les bonnes variantes", () => {
    render(<BlockCtaBar />);

    const primaryButton = screen.getByTestId("button-Action principale");
    const secondaryButton = screen.getByTestId("button-Plus tard");

    expect(primaryButton).toHaveAttribute("data-variant", "primary");
    expect(secondaryButton).toHaveAttribute("data-variant", "ghost");
  });

  it("devrait avoir l'icône ChevronRight dans le bouton principal", () => {
    render(<BlockCtaBar />);

    const primaryButton = screen.getByTestId("button-Action principale");
    const iconRight = primaryButton.querySelector('[data-testid="icon-right"]');

    expect(iconRight).toBeInTheDocument();
  });

  it("devrait avoir la structure DOM appropriée", () => {
    const { container } = render(<BlockCtaBar />);

    const mainContainer = container.querySelector(
      ".sticky.bottom-2.z-0.mt-2.rounded-xl.border"
    );
    expect(mainContainer).toBeInTheDocument();

    const flexContainer = container.querySelector(
      ".flex.items-center.justify-between.gap-3"
    );
    expect(flexContainer).toBeInTheDocument();

    const buttonContainer = container.querySelector(".flex.items-center.gap-2");
    expect(buttonContainer).toBeInTheDocument();
  });

  it("devrait avoir les classes CSS appropriées", () => {
    const { container } = render(<BlockCtaBar />);

    const mainContainer = container.querySelector(
      ".sticky.bottom-2.z-0.mt-2.rounded-xl.border.bg-\\[var\\(--elev\\)\\].p-3.shadow-sm"
    );
    expect(mainContainer).toBeInTheDocument();

    const questionText = container.querySelector(
      ".text-sm.text-\\[var\\(--muted\\)\\]"
    );
    expect(questionText).toBeInTheDocument();
  });

  it("devrait avoir les styles inline appropriés", () => {
    const { container } = render(<BlockCtaBar />);

    const mainContainer = container.querySelector("[style]");
    expect(mainContainer).toBeInTheDocument();

    expect(mainContainer).toHaveClass("border");
  });

  it("devrait avoir la position sticky appropriée", () => {
    const { container } = render(<BlockCtaBar />);

    const mainContainer = container.querySelector(".sticky.bottom-2.z-0");
    expect(mainContainer).toBeInTheDocument();
  });

  it("devrait avoir les classes de flexbox appropriées", () => {
    const { container } = render(<BlockCtaBar />);

    const flexContainer = container.querySelector(
      ".flex.items-center.justify-between.gap-3"
    );
    expect(flexContainer).toBeInTheDocument();

    const buttonContainer = container.querySelector(".flex.items-center.gap-2");
    expect(buttonContainer).toBeInTheDocument();
  });

  it("devrait avoir les classes de bordure et d'ombre appropriées", () => {
    const { container } = render(<BlockCtaBar />);

    const mainContainer = container.querySelector(
      ".rounded-xl.border.shadow-sm"
    );
    expect(mainContainer).toBeInTheDocument();
  });

  it("devrait gérer les props personnalisées combinées", () => {
    render(<BlockCtaBar title="Continuer" secondary="Passer" />);

    expect(screen.getByText("Continuer")).toBeInTheDocument();
    expect(screen.getByText("Passer")).toBeInTheDocument();
  });

  it("devrait avoir la structure de boutons appropriée", () => {
    const { container } = render(<BlockCtaBar />);

    const buttonContainer = container.querySelector(".flex.items-center.gap-2");
    expect(buttonContainer).toBeInTheDocument();

    const buttons = buttonContainer?.querySelectorAll("button");
    expect(buttons).toHaveLength(2);
  });

  it("devrait avoir les classes de couleur appropriées", () => {
    const { container } = render(<BlockCtaBar />);

    const questionText = container.querySelector(
      ".text-\\[var\\(--muted\\)\\]"
    );
    expect(questionText).toBeInTheDocument();

    const mainContainer = container.querySelector(".bg-\\[var\\(--elev\\)\\]");
    expect(mainContainer).toBeInTheDocument();
  });

  it("devrait avoir les classes de positionnement appropriées", () => {
    const { container } = render(<BlockCtaBar />);

    const mainContainer = container.querySelector(".bottom-2.z-0.mt-2");
    expect(mainContainer).toBeInTheDocument();
  });

  it("devrait avoir les classes de taille appropriées", () => {
    const { container } = render(<BlockCtaBar />);

    const questionText = container.querySelector(".text-sm");
    expect(questionText).toBeInTheDocument();

    const mainContainer = container.querySelector(".p-3");
    expect(mainContainer).toBeInTheDocument();
  });

  it("devrait gérer les enfants React complexes dans les boutons", () => {
    render(
      <BlockCtaBar title="Action avec formatage" secondary="Texte italique" />
    );

    expect(screen.getByText(/action avec/i)).toBeInTheDocument();
    expect(screen.getByText(/formatage/i)).toBeInTheDocument();
    expect(screen.getByText(/texte italique/i)).toBeInTheDocument();
  });

  it("devrait avoir la structure de l'icône appropriée", () => {
    const { container } = render(<BlockCtaBar />);

    const iconRight = container.querySelector('[data-testid="icon-right"]');
    expect(iconRight).toBeInTheDocument();
  });

  it("devrait avoir les classes de z-index appropriées", () => {
    const { container } = render(<BlockCtaBar />);

    const mainContainer = container.querySelector(".z-0");
    expect(mainContainer).toBeInTheDocument();
  });
});
