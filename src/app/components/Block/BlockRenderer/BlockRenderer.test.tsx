import React from "react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import BlockRenderer from "./BlockRenderer";

import type { BlockSearchProps } from "../BlockSearch/BlockSearch";
import type { BlockListProps } from "../BlockList/BlockList";
import type { BlockHeaderProps } from "../BlockHeader/BlockHeader";
import type { BlockHeroProps } from "../BlockHero/BlockHero";
import type { BlockCardGridProps } from "../BlockCardGrid/BlockCardGrid";
import type { BlockFormProps } from "../BlockForm/BlockForm";
import type { BlockDetailProps } from "../BlockDetail/BlockDetail";
import type { BlockCtaBarProps } from "../BlockCtaBar/BlockCtaBar";
import type { UIBlock, BlockType } from "@/types/ui";

vi.mock("@/app/components/Block/BlockHeader/BlockHeader", () => ({
  default: ({ title, subtitle }: BlockHeaderProps) => (
    <div data-testid="BlockHeader">{`${title ?? ""}::${subtitle ?? ""}`}</div>
  ),
}));
vi.mock("@/app/components/Block/BlockHero/BlockHero", () => ({
  default: ({ title, description }: BlockHeroProps) => (
    <div data-testid="BlockHero">{`${title ?? ""}::${description ?? ""}`}</div>
  ),
}));
vi.mock("@/app/components/Block/BlockSearch/BlockSearch", () => ({
  default: ({ placeholder, compact }: BlockSearchProps) => (
    <div data-testid="BlockSearch">{`${placeholder ?? ""}::compact=${String(
      compact
    )}`}</div>
  ),
}));
vi.mock("@/app/components/Block/BlockList/BlockList", () => ({
  default: ({ title }: BlockListProps) => (
    <div data-testid="BlockList">{`${title ?? ""}`}</div>
  ),
}));
vi.mock("@/app/components/Block/BlockCardGrid/BlockCardGrid", () => ({
  default: ({ title, cols }: BlockCardGridProps) => (
    <div data-testid="BlockCardGrid">{`${title ?? ""}::cols=${cols}`}</div>
  ),
}));
vi.mock("@/app/components/Block/BlockForm/BlockForm", () => ({
  default: ({ title }: BlockFormProps) => (
    <div data-testid="BlockForm">{`${title ?? ""}`}</div>
  ),
}));
vi.mock("@/app/components/Block/BlockDetail/BlockDetail", () => ({
  default: ({ title, content }: BlockDetailProps) => (
    <div data-testid="BlockDetail">{`${title ?? ""}::${content ?? ""}`}</div>
  ),
}));
vi.mock("@/app/components/Block/BlockCtaBar/BlockCtaBar", () => ({
  default: ({ title }: BlockCtaBarProps) => (
    <div data-testid="BlockCtaBar">{`${title ?? ""}`}</div>
  ),
}));

function mk(type: BlockType, extra: Partial<UIBlock> = {}): UIBlock {
  return { id: cryptoRandomId(), type, ...extra } as UIBlock;
}
function cryptoRandomId() {
  return Math.random().toString(36).slice(2);
}

beforeEach(() => {
  vi.restoreAllMocks();
});

describe("BlockRenderer", () => {
  it("applique className sur le wrapper", () => {
    const { container } = render(
      <BlockRenderer block={mk("LIST", { title: "T" })} className="wrap" />
    );
    const root = container.firstElementChild as HTMLElement;
    expect(root).toHaveClass("wrap");
  });

  it("HEADER → rend BlockHeader avec title & subtitle par défaut", () => {
    render(<BlockRenderer block={mk("HEADER", { title: "MyApp" })} />);
    expect(screen.getByTestId("BlockHeader").textContent).toBe(
      "MyApp::Sous-titre"
    );
  });

  it("HERO → rend BlockHero avec title & description", () => {
    render(
      <BlockRenderer
        block={mk("HERO", { title: "Bienvenue", description: "Pitch" })}
      />
    );
    expect(screen.getByTestId("BlockHero").textContent).toBe(
      "Bienvenue::Pitch"
    );
  });

  it("SEARCH → rend BlockSearch avec placeholder=title et compact=true si prop compact", () => {
    render(
      <BlockRenderer
        block={mk("SEARCH", { title: "Rechercher un truc" })}
        compact
      />
    );
    expect(screen.getByTestId("BlockSearch").textContent).toBe(
      "Rechercher un truc::compact=true"
    );
  });

  it("SEARCH → fallback placeholder par défaut quand pas de title", () => {
    render(<BlockRenderer block={mk("SEARCH")} />);
    expect(screen.getByTestId("BlockSearch").textContent).toBe(
      "Rechercher…::compact=false"
    );
  });

  it("LIST → rend BlockList avec title", () => {
    render(<BlockRenderer block={mk("LIST", { title: "Ma liste" })} />);
    expect(screen.getByTestId("BlockList")).toHaveTextContent("Ma liste");
  });

  it("CARD_GRID → passe data.cols (sinon 2 par défaut)", () => {
    const { rerender } = render(
      <BlockRenderer
        block={mk("CARD_GRID", { title: "Grid", data: { cols: 3 } })}
      />
    );
    expect(screen.getByTestId("BlockCardGrid").textContent).toBe(
      "Grid::cols=3"
    );

    rerender(<BlockRenderer block={mk("CARD_GRID", { title: "Grid" })} />);
    expect(screen.getByTestId("BlockCardGrid").textContent).toBe(
      "Grid::cols=2"
    );
  });

  it("FORM → rend BlockForm avec title", () => {
    render(<BlockRenderer block={mk("FORM", { title: "Inscription" })} />);
    expect(screen.getByTestId("BlockForm")).toHaveTextContent("Inscription");
  });

  it("DETAIL → rend BlockDetail avec title & content (depuis description)", () => {
    render(
      <BlockRenderer
        block={mk("DETAIL", { title: "Article", description: "Texte..." })}
      />
    );
    expect(screen.getByTestId("BlockDetail").textContent).toBe(
      "Article::Texte..."
    );
  });

  it("CTA_BAR → rend BlockCtaBar avec title (ou 'Continuer' par défaut)", () => {
    const { rerender } = render(
      <BlockRenderer block={mk("CTA_BAR", { title: "Valider" })} />
    );
    expect(screen.getByTestId("BlockCtaBar")).toHaveTextContent("Valider");

    rerender(<BlockRenderer block={mk("CTA_BAR")} />);
    expect(screen.getByTestId("BlockCtaBar")).toHaveTextContent("Continuer");
  });

  it("Type inconnu → affiche le fallback avec le type et le JSON du block", () => {
    const block = {
      id: "1",
      type: "WAT_IS_THIS",
      title: "??",
      data: { abc: 1 },
    } as unknown as UIBlock;

    render(<BlockRenderer block={block} />);

    expect(screen.getByText(/Type inconnu:/i)).toBeInTheDocument();
    expect(screen.getByText("WAT_IS_THIS")).toBeInTheDocument();

    const pre = screen.getByText((content, node) => {
      return (
        node?.tagName.toLowerCase() === "pre" &&
        content.includes('"type": "WAT_IS_THIS"') &&
        content.includes('"abc": 1')
      );
    });
    expect(pre).toBeInTheDocument();
  });
});
