import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen, within, fireEvent } from "@testing-library/react";
import Inspector from "./Inspector";
import type { UIBlock, BlockType } from "@/types/ui";

const TYPES: BlockType[] = [
  "HEADER",
  "HERO",
  "SEARCH",
  "LIST",
  "CARD_GRID",
  "FORM",
  "DETAIL",
  "CTA_BAR",
];

function mkBlock(partial?: Partial<UIBlock>): UIBlock {
  return {
    id: "b1",
    type: "LIST",
    title: "Titre initial",
    description: "Desc initiale",
    cols: 6,
    ...(partial || {}),
  } as UIBlock;
}

describe("Inspector", () => {
  it("affiche l’état vide quand aucun bloc n’est sélectionné", () => {
    render(<Inspector selected={null} onChange={vi.fn()} onDelete={vi.fn()} />);
    expect(
      screen.getByText(/Sélectionne un bloc pour l’éditer\./i)
    ).toBeInTheDocument();
  });

  it("affiche le sélecteur de type avec les 8 options et la valeur courante", () => {
    const onChange = vi.fn();
    const block = mkBlock({ type: "FORM" });
    render(
      <Inspector selected={block} onChange={onChange} onDelete={vi.fn()} />
    );

    const combo = screen.getByRole("combobox");
    expect(combo).toHaveValue("FORM");

    const opts = within(combo).getAllByRole("option");
    expect(opts).toHaveLength(TYPES.length);
    TYPES.forEach((t) => {
      expect(
        within(combo).getByRole("option", { name: t })
      ).toBeInTheDocument();
    });
  });

  it("modifie le type et appelle onChange({ type })", () => {
    const onChange = vi.fn();
    const block = mkBlock({ type: "LIST" });
    render(
      <Inspector selected={block} onChange={onChange} onDelete={vi.fn()} />
    );

    const combo = screen.getByRole("combobox");
    fireEvent.change(combo, { target: { value: "HEADER" } });

    expect(onChange).toHaveBeenCalledWith({ type: "HEADER" });
  });

  it("modifie le titre et appelle onChange({ title })", () => {
    const onChange = vi.fn();
    const block = mkBlock({ title: "Ancien titre" });
    render(
      <Inspector selected={block} onChange={onChange} onDelete={vi.fn()} />
    );

    const textboxes = screen.getAllByRole("textbox");
    const titleInput = textboxes[0] as HTMLInputElement;

    fireEvent.change(titleInput, { target: { value: "Nouveau titre" } });
    expect(onChange).toHaveBeenCalledWith({ title: "Nouveau titre" });
  });

  it("modifie la description et appelle onChange({ description })", () => {
    const onChange = vi.fn();
    const block = mkBlock({ description: "Ancienne desc" });
    render(
      <Inspector selected={block} onChange={onChange} onDelete={vi.fn()} />
    );

    const textboxes = screen.getAllByRole("textbox");
    const descTextarea = textboxes[1] as HTMLTextAreaElement;

    fireEvent.change(descTextarea, { target: { value: "Nouvelle desc" } });
    expect(onChange).toHaveBeenCalledWith({ description: "Nouvelle desc" });
  });

  it("sélectionne une valeur de colonnes et appelle onChange({ cols })", () => {
    const onChange = vi.fn();
    const block = mkBlock({ cols: 6 });
    render(
      <Inspector selected={block} onChange={onChange} onDelete={vi.fn()} />
    );

    const activeBtn6 = screen.getByRole("button", { name: "6" });
    expect(activeBtn6.className).toMatch(/bg-\[\-\-primary\]/);

    const btn4 = screen.getByRole("button", { name: "4" });
    fireEvent.click(btn4);
    expect(onChange).toHaveBeenCalledWith({ cols: 4 });
  });

  it("appelle onDelete quand on clique sur Supprimer le bloc", () => {
    const onDelete = vi.fn();
    const block = mkBlock();
    render(
      <Inspector selected={block} onChange={vi.fn()} onDelete={onDelete} />
    );

    fireEvent.click(screen.getByRole("button", { name: /Supprimer le bloc/i }));
    expect(onDelete).toHaveBeenCalledTimes(1);
  });
});
