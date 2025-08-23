import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Toolbar from "./Toolbar";

describe("Toolbar", () => {
  it("appelle onRefine avec les bons prompts quand on clique sur les actions", async () => {
    const user = userEvent.setup();
    const onRefine = vi.fn();
    const onExportJSON = vi.fn();

    render(<Toolbar onRefine={onRefine} onExportJSON={onExportJSON} />);

    await user.click(screen.getByRole("button", { name: /\+ Formulaire/i }));
    expect(onRefine).toHaveBeenCalledWith(
      "ajouter un formulaire d’inscription"
    );

    await user.click(screen.getByRole("button", { name: /Emphase cartes/i }));
    expect(onRefine).toHaveBeenCalledWith(
      "mettre l’accent sur les cartes (grid)"
    );

    await user.click(screen.getByRole("button", { name: /\+ Feed/i }));
    expect(onRefine).toHaveBeenCalledWith("ajouter un feed d’articles");
  });

  it("appelle onExportJSON quand on clique sur Exporter JSON", async () => {
    const user = userEvent.setup();
    const onRefine = vi.fn();
    const onExportJSON = vi.fn();

    render(<Toolbar onRefine={onRefine} onExportJSON={onExportJSON} />);

    await user.click(screen.getByRole("button", { name: /Exporter JSON/i }));
    expect(onExportJSON).toHaveBeenCalledTimes(1);
  });

  it("désactive les actions de raffinement quand disabled=true (aucun appel)", async () => {
    const user = userEvent.setup();
    const onRefine = vi.fn();
    const onExportJSON = vi.fn();

    render(
      <Toolbar onRefine={onRefine} onExportJSON={onExportJSON} disabled />
    );

    const btnForm = screen.getByRole("button", { name: /\+ Formulaire/i });
    const btnEmphase = screen.getByRole("button", { name: /Emphase cartes/i });
    const btnFeed = screen.getByRole("button", { name: /\+ Feed/i });

    expect(btnForm).toBeDisabled();
    expect(btnEmphase).toBeDisabled();
    expect(btnFeed).toBeDisabled();

    await user.click(btnForm);
    await user.click(btnEmphase);
    await user.click(btnFeed);

    expect(onRefine).not.toHaveBeenCalled();

    const btnExport = screen.getByRole("button", { name: /Exporter JSON/i });
    expect(btnExport).not.toBeDisabled();
    await user.click(btnExport);
    expect(onExportJSON).toHaveBeenCalledTimes(1);
  });
});
