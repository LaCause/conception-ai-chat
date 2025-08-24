import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import BlockSearch from "./BlockSearch";

vi.mock("../BlockPill/BlockPill", () => ({
  default: ({ children }: { children: React.ReactNode }) => (
    <span data-testid="block-pill">{children}</span>
  ),
}));

describe("BlockSearch", () => {
  it("devrait se rendre avec le placeholder par défaut", () => {
    render(<BlockSearch />);

    const input = screen.getByPlaceholderText("Rechercher…");
    expect(input).toBeInTheDocument();
  });

  it("devrait se rendre avec le placeholder personnalisé", () => {
    render(<BlockSearch placeholder="Mon placeholder" />);

    const input = screen.getByPlaceholderText("Mon placeholder");
    expect(input).toBeInTheDocument();
  });

  it("devrait se rendre avec le hint par défaut", () => {
    render(<BlockSearch />);

    expect(
      screen.getByText("Conseil : tapez un mot-clé ou scannez")
    ).toBeInTheDocument();
  });

  it("devrait se rendre avec le hint personnalisé", () => {
    render(<BlockSearch hint="Mon conseil personnalisé" />);

    expect(screen.getByText("Mon conseil personnalisé")).toBeInTheDocument();
  });

  it("devrait afficher l'icône de recherche", () => {
    const { container } = render(<BlockSearch />);

    const searchIcon = container.querySelector(".size-4.opacity-70");
    expect(searchIcon).toBeInTheDocument();
  });

  it("devrait afficher le raccourci clavier", () => {
    render(<BlockSearch />);

    expect(screen.getByTestId("block-pill")).toBeInTheDocument();
    expect(screen.getByText("⌘K")).toBeInTheDocument();
  });

  it("devrait avoir la structure DOM appropriée", () => {
    const { container } = render(<BlockSearch />);

    const mainContainer = container.querySelector(
      ".rounded-xl.border.bg-\\[var\\(--elev\\)\\]"
    );
    expect(mainContainer).toBeInTheDocument();

    const searchContainer = container.querySelector(
      ".flex.items-center.gap-2.rounded-lg.border"
    );
    expect(searchContainer).toBeInTheDocument();

    const input = container.querySelector("input");
    expect(input).toBeInTheDocument();
  });

  it("devrait avoir les classes CSS appropriées", () => {
    const { container } = render(<BlockSearch />);

    const mainContainer = container.querySelector(
      ".rounded-xl.border.bg-\\[var\\(--elev\\)\\].p-4.shadow-sm"
    );
    expect(mainContainer).toBeInTheDocument();

    const searchContainer = container.querySelector(
      ".flex.items-center.gap-2.rounded-lg.border.bg-white\\/70"
    );
    expect(searchContainer).toBeInTheDocument();

    const input = container.querySelector(
      "input.w-full.bg-transparent.outline-none"
    );
    expect(input).toBeInTheDocument();
  });

  it("devrait avoir les styles inline appropriés", () => {
    const { container } = render(<BlockSearch />);

    const mainContainer = container.querySelector("[style]");
    expect(mainContainer).toBeInTheDocument();

    const searchContainer = container.querySelector("[style]");
    expect(searchContainer).toBeInTheDocument();

    expect(mainContainer).toHaveClass("border");
    expect(searchContainer).toHaveClass("border");
  });

  it("devrait avoir le padding approprié en mode normal", () => {
    const { container } = render(<BlockSearch />);

    const searchContainer = container.querySelector(".py-3");
    expect(searchContainer).toBeInTheDocument();
  });

  it("devrait avoir le padding approprié en mode compact", () => {
    const { container } = render(<BlockSearch compact={true} />);

    const searchContainer = container.querySelector(".py-2");
    expect(searchContainer).toBeInTheDocument();
  });

  it("devrait cacher le hint en mode compact", () => {
    render(<BlockSearch compact={true} />);

    expect(
      screen.queryByText("Conseil : tapez un mot-clé ou scannez")
    ).not.toBeInTheDocument();
  });

  it("devrait afficher le hint en mode normal", () => {
    render(<BlockSearch compact={false} />);

    expect(
      screen.getByText("Conseil : tapez un mot-clé ou scannez")
    ).toBeInTheDocument();
  });

  it("devrait avoir les classes de couleur appropriées", () => {
    const { container } = render(<BlockSearch />);

    const searchContainer = container.querySelector(
      ".bg-white\\/70.dark\\:bg-white\\/5"
    );
    expect(searchContainer).toBeInTheDocument();

    const input = container.querySelector(
      "input.placeholder\\:text-\\[var\\(--muted\\)\\]"
    );
    expect(input).toBeInTheDocument();
  });

  it("devrait avoir la structure de l'input appropriée", () => {
    const { container } = render(<BlockSearch />);

    const input = container.querySelector("input");
    expect(input).toHaveAttribute("placeholder", "Rechercher…");
    expect(input).toHaveClass("w-full", "bg-transparent", "outline-none");
  });

  it("devrait gérer les props personnalisées combinées", () => {
    render(
      <BlockSearch
        placeholder="Recherche avancée"
        hint="Utilisez des filtres pour affiner"
        compact={true}
      />
    );

    const input = screen.getByPlaceholderText("Recherche avancée");
    expect(input).toBeInTheDocument();

    expect(
      screen.queryByText("Utilisez des filtres pour affiner")
    ).not.toBeInTheDocument();
  });

  it("devrait avoir les classes de flexbox appropriées", () => {
    const { container } = render(<BlockSearch />);

    const searchContainer = container.querySelector(".flex.items-center.gap-2");
    expect(searchContainer).toBeInTheDocument();
  });

  it("devrait avoir les classes de bordure appropriées", () => {
    const { container } = render(<BlockSearch />);

    const mainContainer = container.querySelector(".rounded-xl.border");
    expect(mainContainer).toBeInTheDocument();

    const searchContainer = container.querySelector(".rounded-lg.border");
    expect(searchContainer).toBeInTheDocument();
  });

  it("devrait avoir les classes de taille appropriées", () => {
    const { container } = render(<BlockSearch />);

    const searchIcon = container.querySelector(".size-4");
    expect(searchIcon).toBeInTheDocument();
  });

  it("devrait gérer le mode sombre", () => {
    const { container } = render(<BlockSearch />);

    const searchContainer = container.querySelector(".dark\\:bg-white\\/5");
    expect(searchContainer).toBeInTheDocument();
  });

  it("devrait avoir la structure de l'icône appropriée", () => {
    const { container } = render(<BlockSearch />);

    const searchIcon = container.querySelector(".size-4.opacity-70");
    expect(searchIcon).toBeInTheDocument();
  });

  it("devrait avoir la structure du hint appropriée", () => {
    const { container } = render(<BlockSearch />);

    const hint = container.querySelector(
      "p.mt-2.text-xs.text-\\[var\\(--muted\\)\\]"
    );
    expect(hint).toBeInTheDocument();
  });
});
