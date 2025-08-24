import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import BlockForm from "./BlockForm";

describe("BlockForm", () => {
  it("devrait se rendre avec le titre par défaut", () => {
    render(<BlockForm />);

    expect(screen.getByText("Formulaire")).toBeInTheDocument();
  });

  it("devrait se rendre avec le titre personnalisé", () => {
    render(<BlockForm title="Mon formulaire" />);

    expect(screen.getByText("Mon formulaire")).toBeInTheDocument();
  });

  it("devrait se rendre avec les champs par défaut", () => {
    render(<BlockForm />);

    expect(screen.getByText("Nom")).toBeInTheDocument();
    expect(screen.getByText("Email")).toBeInTheDocument();
    expect(screen.getByText("Mot de passe")).toBeInTheDocument();
  });

  it("devrait se rendre avec les champs personnalisés", () => {
    const customFields = ["Prénom", "Téléphone", "Adresse"];
    render(<BlockForm fields={customFields} />);

    expect(screen.getByText("Prénom")).toBeInTheDocument();
    expect(screen.getByText("Téléphone")).toBeInTheDocument();
    expect(screen.getByText("Adresse")).toBeInTheDocument();
  });

  it("devrait avoir les boutons d'action", () => {
    render(<BlockForm />);

    expect(screen.getByText("Annuler")).toBeInTheDocument();
    expect(screen.getByText("Valider")).toBeInTheDocument();
  });

  it("devrait avoir les classes CSS appropriées", () => {
    const { container } = render(<BlockForm />);

    const formContainer = container.querySelector(
      ".rounded-xl.border.bg-\\[var\\(--elev\\)\\]"
    );
    expect(formContainer).toBeInTheDocument();
  });

  it("devrait avoir les styles inline appropriés", () => {
    const { container } = render(<BlockForm />);

    const formContainer = container.querySelector("[style]");
    expect(formContainer).toBeInTheDocument();

    expect(formContainer).toHaveClass("border");
  });

  it("devrait générer les inputs avec les bonnes propriétés", () => {
    render(<BlockForm />);

    const inputs = screen.getAllByRole("textbox");
    expect(inputs).toHaveLength(3);

    inputs.forEach((input) => {
      expect(input).toHaveClass(
        "h-10",
        "rounded-lg",
        "border",
        "bg-transparent"
      );
    });
  });

  it("devrait avoir la structure de grille appropriée", () => {
    const { container } = render(<BlockForm />);

    const gridContainer = container.querySelector(".mt-3.grid.gap-3");
    expect(gridContainer).toBeInTheDocument();
  });

  it("devrait gérer les champs vides", () => {
    render(<BlockForm fields={[]} />);

    const inputs = screen.queryAllByRole("textbox");
    expect(inputs).toHaveLength(0);
  });

  it("devrait utiliser BlockTitle avec la prop small", () => {
    const { container } = render(<BlockForm />);

    const titleElement = container.querySelector("h3");
    expect(titleElement).toHaveClass("text-base");
  });
});
