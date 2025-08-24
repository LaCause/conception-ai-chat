import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import WorkspaceLayout from "./WorkspaceLayout";

describe("WorkspaceLayout", () => {
  const mockInspector = <div data-testid="inspector">Inspector content</div>;
  const mockChildren = <div data-testid="children">Main content</div>;

  it("devrait se rendre avec le contenu principal", () => {
    render(
      <WorkspaceLayout inspector={mockInspector} showInspector={false}>
        {mockChildren}
      </WorkspaceLayout>
    );

    expect(screen.getByTestId("children")).toBeInTheDocument();
  });

  it("devrait afficher l'inspector quand showInspector est true", () => {
    render(
      <WorkspaceLayout inspector={mockInspector} showInspector={true}>
        {mockChildren}
      </WorkspaceLayout>
    );

    expect(screen.getByTestId("inspector")).toBeInTheDocument();
  });

  it("ne devrait pas afficher l'inspector quand showInspector est false", () => {
    render(
      <WorkspaceLayout inspector={mockInspector} showInspector={false}>
        {mockChildren}
      </WorkspaceLayout>
    );

    expect(screen.queryByTestId("inspector")).not.toBeInTheDocument();
  });

  it("devrait avoir la structure DOM appropriée", () => {
    const { container } = render(
      <WorkspaceLayout inspector={mockInspector} showInspector={false}>
        {mockChildren}
      </WorkspaceLayout>
    );

    const main = container.querySelector("main");
    expect(main).toBeInTheDocument();

    const gridContainer = container.querySelector(
      ".mx-auto.grid.max-w-\\[1600px\\]"
    );
    expect(gridContainer).toBeInTheDocument();
  });

  it("devrait avoir les classes CSS appropriées", () => {
    const { container } = render(
      <WorkspaceLayout inspector={mockInspector} showInspector={false}>
        {mockChildren}
      </WorkspaceLayout>
    );

    const main = container.querySelector("main.flex-1.px-4.py-4.sm\\:px-6");
    expect(main).toBeInTheDocument();

    const section = container.querySelector(
      "section.order-1.rounded-xl.bg-\\[--elev\\]\\/70"
    );
    expect(section).toBeInTheDocument();
  });

  it("devrait appliquer la grille à deux colonnes quand l'inspector est visible", () => {
    const { container } = render(
      <WorkspaceLayout inspector={mockInspector} showInspector={true}>
        {mockChildren}
      </WorkspaceLayout>
    );

    const gridContainer = container.querySelector(
      ".lg\\:grid-cols-\\[1fr_340px\\]"
    );
    expect(gridContainer).toBeInTheDocument();
  });

  it("ne devrait pas appliquer la grille à deux colonnes quand l'inspector est caché", () => {
    const { container } = render(
      <WorkspaceLayout inspector={mockInspector} showInspector={false}>
        {mockChildren}
      </WorkspaceLayout>
    );

    const gridContainer = container.querySelector(
      ".lg\\:grid-cols-\\[1fr_340px\\]"
    );
    expect(gridContainer).not.toBeInTheDocument();
  });

  it("devrait avoir l'inspector avec les bonnes classes CSS", () => {
    const { container } = render(
      <WorkspaceLayout inspector={mockInspector} showInspector={true}>
        {mockChildren}
      </WorkspaceLayout>
    );

    const aside = container.querySelector(
      "aside.order-2.rounded-xl.border.border-black\\/10.bg-\\[--elev\\]\\/90"
    );
    expect(aside).toBeInTheDocument();
  });

  it("devrait avoir la section principale avec les bonnes classes CSS", () => {
    const { container } = render(
      <WorkspaceLayout inspector={mockInspector} showInspector={false}>
        {mockChildren}
      </WorkspaceLayout>
    );

    const section = container.querySelector(
      "section.order-1.rounded-xl.bg-\\[--elev\\]\\/70.p-4.shadow-sm.sm\\:p-6.lg\\:order-none"
    );
    expect(section).toBeInTheDocument();
  });

  it("devrait gérer les enfants React complexes", () => {
    const complexChildren = (
      <div>
        <h1>Titre</h1>
        <p>Paragraphe</p>
        <button>Bouton</button>
      </div>
    );

    render(
      <WorkspaceLayout inspector={mockInspector} showInspector={false}>
        {complexChildren}
      </WorkspaceLayout>
    );

    expect(screen.getByText("Titre")).toBeInTheDocument();
    expect(screen.getByText("Paragraphe")).toBeInTheDocument();
    expect(screen.getByText("Bouton")).toBeInTheDocument();
  });

  it("devrait gérer l'inspector avec du contenu complexe", () => {
    const complexInspector = (
      <div>
        <h2>Configuration</h2>
        <form>
          <input type="text" placeholder="Nom" />
          <button type="submit">Sauvegarder</button>
        </form>
      </div>
    );

    render(
      <WorkspaceLayout inspector={complexInspector} showInspector={true}>
        {mockChildren}
      </WorkspaceLayout>
    );

    expect(screen.getByText("Configuration")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Nom")).toBeInTheDocument();
    expect(screen.getByText("Sauvegarder")).toBeInTheDocument();
  });
});
