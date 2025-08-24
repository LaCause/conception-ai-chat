import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import HeaderBar from "./HeaderBar";
import { ButtonProps } from "@/design-system/Button/Button";
import { ToolbarProps } from "../../Toolbar/Toolbar";

vi.mock("@/design-system/Button/Button", () => ({
  __esModule: true,
  default: ({ children, ...props }: ButtonProps) => (
    <button {...props}>{children}</button>
  ),
}));

vi.mock("@/design-system/ThemeToggle/ThemeToggle", () => ({
  __esModule: true,
  default: () => <div data-testid="ThemeToggle" />,
}));

vi.mock("../ViewControls/ViewControls", () => ({
  __esModule: true,
  default: ({
    value,
    onChange,
  }: {
    value: "mobile" | "desktop" | "both";
    onChange: (v: "mobile" | "desktop" | "both") => void;
  }) => (
    <div data-testid="ViewControls">
      mode={value}
      <button onClick={() => onChange("desktop")} aria-label="set-desktop">
        to-desktop
      </button>
    </div>
  ),
}));

vi.mock("@/app/components/Toolbar/Toolbar", () => ({
  __esModule: true,
  default: ({ onRefine, onExportJSON, disabled }: ToolbarProps) => (
    <div data-testid="Toolbar" data-disabled={String(!!disabled)}>
      <button onClick={() => onRefine("refine")} aria-label="refine">
        refine
      </button>
      <button onClick={onExportJSON} aria-label="export-json">
        export
      </button>
    </div>
  ),
}));

function renderHeaderBar(p?: Partial<React.ComponentProps<typeof HeaderBar>>) {
  const props: React.ComponentProps<typeof HeaderBar> = {
    compact: false,
    hasResults: true,
    loading: false,
    onShare: vi.fn(),
    onReset: vi.fn(),
    onRefine: vi.fn(),
    onExport: vi.fn(),
    layoutMode: "both",
    onLayoutChange: vi.fn(),
    composer: <div data-testid="Composer" />,
    ...p,
  };
  const utils = render(<HeaderBar {...props} />);
  return { ...utils, props };
}

describe("HeaderBar", () => {
  it("rend le header non-compact avec libellés, ThemeToggle, Composer & Toolbar visibles", () => {
    const { container } = renderHeaderBar({
      compact: false,
      hasResults: true,
      loading: false,
    });

    expect(
      screen.getByRole("button", { name: /Partager/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Réinitialiser/i })
    ).toBeInTheDocument();

    expect(screen.getByTestId("ThemeToggle")).toBeInTheDocument();
    expect(screen.getByTestId("Composer")).toBeInTheDocument();

    expect(screen.getByTestId("ViewControls")).toBeInTheDocument();
    const toolbar = screen.getByTestId("Toolbar");
    expect(toolbar).toBeInTheDocument();
    expect(toolbar.getAttribute("data-disabled")).toBe("false");

    const header = container.querySelector("header")!;
    expect(header.className).toMatch(/py-3|sm:py-4/);
    expect(header.className).not.toMatch(/py-1/);
  });

  it("rend le header compact : boutons icône-only (avec aria-label), et zones masquées", () => {
    const { container } = renderHeaderBar({ compact: true });

    expect(
      screen.getByRole("button", { name: "Partager" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Réinitialiser" })
    ).toBeInTheDocument();

    const composerWrapper = container.querySelector(
      "div.transition-all.duration-300"
    );
    expect(composerWrapper?.className).toMatch(
      /pointer-events-none|max-h-0|opacity-0/
    );

    const sections = container.querySelectorAll(
      "div.transition-all.duration-300"
    );
    const viewControlsWrapper = sections[1] as HTMLElement | undefined;
    expect(viewControlsWrapper?.className).toMatch(
      /max-h-0|opacity-0|overflow-hidden/
    );

    const toolbarWrapper = Array.from(
      container.querySelectorAll("div.transition-all.duration-200")
    ).at(0);
    expect(toolbarWrapper?.className).toMatch(/opacity-0/);

    const header = container.querySelector("header")!;
    expect(header.className).toMatch(/py-1/);
  });

  it("appelle onShare et onReset au clic sur les boutons", async () => {
    const user = userEvent.setup();
    const { props } = renderHeaderBar({ compact: false });

    await user.click(screen.getByRole("button", { name: /Partager/i }));
    expect(props.onShare).toHaveBeenCalledTimes(1);

    await user.click(screen.getByRole("button", { name: /Réinitialiser/i }));
    expect(props.onReset).toHaveBeenCalledTimes(1);
  });

  it("propage layoutMode à ViewControls et déclenche onLayoutChange", async () => {
    const user = userEvent.setup();
    const { props } = renderHeaderBar({ layoutMode: "mobile" });

    expect(screen.getByTestId("ViewControls")).toHaveTextContent("mode=mobile");

    await user.click(screen.getByLabelText("set-desktop"));
    expect(props.onLayoutChange).toHaveBeenCalledWith("desktop");
  });

  it("Toolbar.disabled = true quand pas de résultats", () => {
    renderHeaderBar({ hasResults: false, loading: false });
    expect(screen.getByTestId("Toolbar").getAttribute("data-disabled")).toBe(
      "true"
    );
  });

  it("Toolbar.disabled = true quand loading = true", () => {
    renderHeaderBar({ hasResults: true, loading: true });
    expect(screen.getByTestId("Toolbar").getAttribute("data-disabled")).toBe(
      "true"
    );
  });

  it("clique export déclenche onExport", async () => {
    const user = userEvent.setup();
    const { props } = renderHeaderBar();
    await user.click(screen.getByLabelText("export-json"));
    expect(props.onExport).toHaveBeenCalledTimes(1);
  });

  it("clique refine déclenche onRefine", async () => {
    const user = userEvent.setup();
    const { props } = renderHeaderBar();
    await user.click(screen.getByLabelText("refine"));
    expect(props.onRefine).toHaveBeenCalledWith("refine");
  });
});
