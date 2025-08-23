import React from "react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import MockUpCanvas from "./MockUpCanvas";
import type { UIBlock, BlockType } from "@/types/ui";
import { BlockRendererProps } from "../Block/BlockRenderer/BlockRenderer";
import { DeviceFrameProps } from "../Device/DeviceFrame/DeviceFrame";
import { DesktopFrameProps } from "../Device/DesktopFrame/DesktopFrame";
import { ButtonProps } from "@/design-system/Button/Button";

vi.mock("../Block/BlockRenderer/BlockRenderer", () => ({
  default: ({ block, compact }: BlockRendererProps) => (
    <div data-testid={`BR-${block.id}`} data-compact={String(!!compact)}>
      {block.type}:{block.title ?? ""}
    </div>
  ),
}));

vi.mock("../Device/DeviceFrame/DeviceFrame", () => ({
  default: ({ children }: DeviceFrameProps) => (
    <div data-testid="DeviceFrame">{children}</div>
  ),
}));

vi.mock("../Device/DesktopFrame/DesktopFrame", () => ({
  default: ({ children, chromeTitle }: DesktopFrameProps) => (
    <div data-testid={`DesktopFrame-${chromeTitle || "untitled"}`}>
      {children}
    </div>
  ),
}));

vi.mock("@/design-system/Button/Button", () => ({
  __esModule: true,
  default: ({ children, ...props }: ButtonProps) => (
    <button {...props}>{children}</button>
  ),
}));

function mk(
  id: string,
  type: BlockType,
  extra: Partial<UIBlock> = {}
): UIBlock {
  return { id, type, ...extra } as UIBlock;
}

beforeEach(() => {
  vi.restoreAllMocks();

  Object.defineProperty(Element.prototype, "scrollIntoView", {
    value: vi.fn(),
    writable: true,
  });
});

describe("MockUpCanvas", () => {
  it("affiche l'état vide quand aucun block", () => {
    render(<MockUpCanvas blocks={[]} layoutMode="both" />);
    expect(
      screen.getByText(/Aucun mockup pour l’instant/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Décrivez votre idée puis cliquez sur « Générer »/i)
    ).toBeInTheDocument();
  });

  it("rend la section mobile (DeviceFrame) et passe compact=true aux BlockRenderer", () => {
    const blocks: UIBlock[] = [
      mk("a", "HEADER", { title: "T1" }),
      mk("b", "LIST", { title: "T2" }),
    ];
    render(<MockUpCanvas blocks={blocks} layoutMode="mobile" />);

    expect(screen.getByTestId("DeviceFrame")).toBeInTheDocument();
    expect(screen.getByTestId("BR-a")).toHaveAttribute("data-compact", "true");
    expect(screen.getByTestId("BR-b")).toHaveAttribute("data-compact", "true");

    expect(screen.queryByTestId(/DesktopFrame-/)).not.toBeInTheDocument();
    expect(document.querySelector('[data-block="a"]')).toBeInTheDocument();
    expect(document.querySelector('[data-block="b"]')).toBeInTheDocument();
  });

  it("rend la section desktop (DesktopFrame) sans compact", () => {
    const blocks: UIBlock[] = [
      mk("h", "HEADER", { title: "H" }),
      mk("l", "LIST", { title: "L" }),
    ];
    render(<MockUpCanvas blocks={blocks} layoutMode="desktop" />);

    expect(screen.getByTestId("DesktopFrame-mockup.local")).toBeInTheDocument();
    expect(screen.queryByTestId("DeviceFrame")).not.toBeInTheDocument();

    expect(screen.getByTestId("BR-h")).toHaveAttribute("data-compact", "false");
    expect(screen.getByTestId("BR-l")).toHaveAttribute("data-compact", "false");
  });

  it("applique un highlight (glow-outline) au block sélectionné (mobile)", () => {
    const blocks: UIBlock[] = [mk("x", "HEADER"), mk("y", "LIST")];
    render(<MockUpCanvas blocks={blocks} layoutMode="mobile" selectedId="x" />);
    const wrapperX = document.querySelector('[data-block="x"]') as HTMLElement;
    expect(wrapperX.className).toMatch(/glow-outline/);
  });

  it("déclenche scrollIntoView pour selectedId au mount", () => {
    const spy = vi.spyOn(Element.prototype, "scrollIntoView");
    const blocks: UIBlock[] = [mk("x1", "HEADER"), mk("x2", "LIST")];
    render(
      <MockUpCanvas blocks={blocks} layoutMode="mobile" selectedId="x2" />
    );
    expect(spy).toHaveBeenCalled();
  });

  it("onSelect est appelé quand on clique un block en desktop", async () => {
    const user = userEvent.setup();
    const onSelect = vi.fn();
    const blocks: UIBlock[] = [
      mk("aa", "LIST", { title: "A" }),
      mk("bb", "LIST", { title: "B" }),
    ];

    render(
      <MockUpCanvas blocks={blocks} layoutMode="desktop" onSelect={onSelect} />
    );

    await user.click(screen.getByTestId("BR-bb"));
    expect(onSelect).toHaveBeenCalledWith("bb");
  });

  it("les boutons Monter/Descendre réordonnent via onChange (scopés par block)", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    const blocks: UIBlock[] = [
      mk("b1", "LIST", { title: "B1" }),
      mk("b2", "LIST", { title: "B2" }),
      mk("b3", "LIST", { title: "B3" }),
    ];

    render(
      <MockUpCanvas blocks={blocks} layoutMode="desktop" onChange={onChange} />
    );

    const relB1 = screen
      .getByTestId("BR-b1")
      .closest(".relative") as HTMLElement;
    const controlsB1 = within(relB1);
    await user.click(controlsB1.getByRole("button", { name: /Descendre/i }));

    expect(onChange).toHaveBeenCalledTimes(1);
    const next1 = onChange.mock.calls[0][0] as UIBlock[];
    expect(next1.map((b) => b.id)).toEqual(["b2", "b1", "b3"]);

    onChange.mockClear();
    const relB2 = screen
      .getByTestId("BR-b2")
      .closest(".relative") as HTMLElement;
    const controlsB2 = within(relB2);
    await user.click(controlsB2.getByRole("button", { name: /Monter/i }));

    expect(onChange).toHaveBeenCalledTimes(1);
    const next2 = onChange.mock.calls[0][0] as UIBlock[];
    expect(next2.map((b) => b.id)).toEqual(["b2", "b1", "b3"]);
  });
  it("affiche mobile + desktop quand layoutMode='both'", () => {
    const blocks: UIBlock[] = [mk("m", "HEADER"), mk("d", "LIST")];
    render(<MockUpCanvas blocks={blocks} layoutMode="both" />);
    expect(screen.getByTestId("DeviceFrame")).toBeInTheDocument();
    expect(screen.getByTestId("DesktopFrame-mockup.local")).toBeInTheDocument();
  });

  it("desktop: md:col-span-12 pour HEADER et md:col-span-6 pour LIST (mapping par type)", () => {
    const blocks: UIBlock[] = [mk("h", "HEADER"), mk("l", "LIST")];
    const { container } = render(
      <MockUpCanvas blocks={blocks} layoutMode="desktop" />
    );

    const wrappers = Array.from(container.querySelectorAll(".relative"));
    const wHeader = wrappers.find((w) =>
      within(w as HTMLElement).queryByTestId("BR-h")
    ) as HTMLElement;
    const wList = wrappers.find((w) =>
      within(w as HTMLElement).queryByTestId("BR-l")
    ) as HTMLElement;

    expect(wHeader.className).toMatch(/md:col-span-12/);
    expect(wList.className).toMatch(/md:col-span-6/);
  });

  it("le bouton 'Sélection' porte aria-pressed=true pour le block sélectionné", () => {
    const blocks: UIBlock[] = [mk("s1", "LIST"), mk("s2", "LIST")];
    render(
      <MockUpCanvas
        blocks={blocks}
        layoutMode="desktop"
        selectedId="s2"
        onChange={() => {}}
        onSelect={() => {}}
      />
    );

    const relS1 = screen
      .getByTestId("BR-s1")
      .closest(".relative") as HTMLElement;
    const relS2 = screen
      .getByTestId("BR-s2")
      .closest(".relative") as HTMLElement;

    const btnSelS1 = within(relS1).getByRole("button", { name: "Sélection" });
    const btnSelS2 = within(relS2).getByRole("button", { name: "Sélection" });

    expect(btnSelS1).toHaveAttribute("aria-pressed", "false");
    expect(btnSelS2).toHaveAttribute("aria-pressed", "true");
  });
});
