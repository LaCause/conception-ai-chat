import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import BlockList from "./BlockList";

describe("BlockList", () => {
  it("devrait se rendre avec le titre par défaut", () => {
    render(<BlockList />);

    expect(screen.getByText("Liste")).toBeInTheDocument();
  });

  it("devrait se rendre avec le titre personnalisé", () => {
    render(<BlockList title="Ma liste personnalisée" />);

    expect(screen.getByText("Ma liste personnalisée")).toBeInTheDocument();
  });

  it("devrait se rendre avec les éléments par défaut", () => {
    render(<BlockList />);

    expect(screen.getByText("Élément 1")).toBeInTheDocument();
    expect(screen.getByText("Élément 2")).toBeInTheDocument();
    expect(screen.getByText("Élément 3")).toBeInTheDocument();
  });

  it("devrait se rendre avec les éléments personnalisés", () => {
    const customItems = ["Item A", "Item B", "Item C", "Item D"];
    render(<BlockList items={customItems} />);

    expect(screen.getByText("Item A")).toBeInTheDocument();
    expect(screen.getByText("Item B")).toBeInTheDocument();
    expect(screen.getByText("Item C")).toBeInTheDocument();
    expect(screen.getByText("Item D")).toBeInTheDocument();
  });

  it("devrait avoir la structure DOM appropriée", () => {
    const { container } = render(<BlockList />);

    const mainContainer = container.querySelector(
      ".rounded-xl.border.bg-\\[var\\(--elev\\)\\]"
    );
    expect(mainContainer).toBeInTheDocument();

    const list = container.querySelector("ul.mt-2.divide-y");
    expect(list).toBeInTheDocument();

    const listItems = container.querySelectorAll("li");
    expect(listItems).toHaveLength(3);
  });

  it("devrait avoir les classes CSS appropriées", () => {
    const { container } = render(<BlockList />);

    const mainContainer = container.querySelector(
      ".rounded-xl.border.bg-\\[var\\(--elev\\)\\].p-3.shadow-sm"
    );
    expect(mainContainer).toBeInTheDocument();

    const list = container.querySelector(
      ".mt-2.divide-y.divide-\\[var\\(--primary\\)\\]"
    );
    expect(list).toBeInTheDocument();

    const listItems = container.querySelectorAll(
      "li.flex.items-center.justify-between.py-2"
    );
    expect(listItems).toHaveLength(3);
  });

  it("devrait avoir les styles inline appropriés", () => {
    const { container } = render(<BlockList />);

    const mainContainer = container.querySelector("[style]");
    expect(mainContainer).toBeInTheDocument();

    expect(mainContainer).toHaveClass("border");

    const styledElements = container.querySelectorAll("[style]");
    expect(styledElements.length).toBeGreaterThan(0);
  });

  it("devrait avoir les icônes dans chaque élément de liste", () => {
    const { container } = render(<BlockList />);

    const iconContainers = container.querySelectorAll(
      ".flex.h-8.w-8.items-center.justify-center.rounded-md"
    );
    expect(iconContainers).toHaveLength(3);

    const chevronIcons = container.querySelectorAll(".size-4.opacity-60");
    expect(chevronIcons).toHaveLength(3);
  });

  it("devrait avoir la structure de chaque élément de liste", () => {
    const { container } = render(<BlockList />);

    const listItems = container.querySelectorAll("li");
    listItems.forEach((item) => {
      const iconContainer = item.querySelector(".flex.h-8.w-8");
      const textSpan = item.querySelector("span");
      const chevronIcon = item.querySelector(".size-4.opacity-60");

      expect(iconContainer).toBeInTheDocument();
      expect(textSpan).toBeInTheDocument();
      expect(chevronIcon).toBeInTheDocument();
    });
  });

  it("devrait gérer une liste vide", () => {
    render(<BlockList items={[]} />);

    const listItems = screen.queryAllByRole("listitem");
    expect(listItems).toHaveLength(0);
  });

  it("devrait gérer une liste avec un seul élément", () => {
    render(<BlockList items={["Seul élément"]} />);

    expect(screen.getByText("Seul élément")).toBeInTheDocument();

    const listItems = screen.getAllByRole("listitem");
    expect(listItems).toHaveLength(1);
  });

  it("devrait gérer une liste avec de nombreux éléments", () => {
    const manyItems = Array.from({ length: 10 }, (_, i) => `Élément ${i + 1}`);
    render(<BlockList items={manyItems} />);

    manyItems.forEach((item) => {
      expect(screen.getByText(item)).toBeInTheDocument();
    });

    const listItems = screen.getAllByRole("listitem");
    expect(listItems).toHaveLength(10);
  });

  it("devrait avoir les classes de flexbox appropriées", () => {
    const { container } = render(<BlockList />);

    const listItems = container.querySelectorAll(
      "li.flex.items-center.justify-between"
    );
    expect(listItems).toHaveLength(3);

    const iconTextContainers = container.querySelectorAll(
      ".flex.items-center.gap-3"
    );
    expect(iconTextContainers).toHaveLength(3);
  });

  it("devrait avoir les classes de taille d'icône appropriées", () => {
    const { container } = render(<BlockList />);

    const iconContainers = container.querySelectorAll(".h-8.w-8");
    expect(iconContainers).toHaveLength(3);

    const icons = container.querySelectorAll(".size-4");
    expect(icons).toHaveLength(6);
  });

  it("devrait avoir les classes de couleur appropriées", () => {
    const { container } = render(<BlockList />);

    const iconContainers = container.querySelectorAll(
      ".bg-transparent.text-\\[var\\(--fg\\)\\]"
    );
    expect(iconContainers).toHaveLength(3);

    const chevronIcons = container.querySelectorAll(".opacity-60");
    expect(chevronIcons).toHaveLength(3);
  });

  it("devrait gérer les éléments avec du contenu HTML", () => {
    const htmlItems = ["<strong>Bold</strong>", "<em>Italic</em>"];
    render(<BlockList items={htmlItems} />);

    expect(screen.getByText("<strong>Bold</strong>")).toBeInTheDocument();
    expect(screen.getByText("<em>Italic</em>")).toBeInTheDocument();
  });

  it("devrait avoir la structure de séparateurs appropriée", () => {
    const { container } = render(<BlockList />);

    const list = container.querySelector(
      "ul.divide-y.divide-\\[var\\(--primary\\)\\]"
    );
    expect(list).toBeInTheDocument();
  });

  it("devrait utiliser BlockTitle avec la prop small", () => {
    const { container } = render(<BlockList />);

    const titleElement = container.querySelector("h3");
    expect(titleElement).toHaveClass("text-base");
  });
});
