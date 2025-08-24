import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import ViewControls from "./ViewControls";
import { SegmentControlProps } from "@/design-system/SegmentControl/SegmentControl";

vi.mock("@/design-system/SegmentControl/SegmentControl", () => ({
  SegmentControl: ({
    value,
    onChange,
    options,
  }: SegmentControlProps<"mobile" | "desktop" | "both">) => (
    <div data-testid="segment-control">
      {options.map((option) => (
        <button
          key={option.value}
          data-testid={`option-${option.value}`}
          onClick={() => onChange(option.value)}
          className={value === option.value ? "active" : ""}
        >
          {option.label}
        </button>
      ))}
    </div>
  ),
}));

describe("ViewControls", () => {
  const mockOnChange = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("devrait se rendre avec les trois options de vue", () => {
    render(<ViewControls value="mobile" onChange={mockOnChange} />);

    expect(screen.getByText("📱 Mobile")).toBeInTheDocument();
    expect(screen.getByText("💻 Desktop")).toBeInTheDocument();
    expect(screen.getByText("⬛ Les deux")).toBeInTheDocument();
  });

  it("devrait utiliser SegmentControl avec les bonnes props", () => {
    render(<ViewControls value="desktop" onChange={mockOnChange} />);

    const segmentControl = screen.getByTestId("segment-control");
    expect(segmentControl).toBeInTheDocument();
  });

  it("devrait passer la valeur actuelle au SegmentControl", () => {
    render(<ViewControls value="both" onChange={mockOnChange} />);

    const bothOption = screen.getByTestId("option-both");
    expect(bothOption).toHaveClass("active");
  });

  it("devrait appeler onChange avec la bonne valeur lors du clic sur une option", () => {
    render(<ViewControls value="mobile" onChange={mockOnChange} />);

    fireEvent.click(screen.getByText("💻 Desktop"));
    expect(mockOnChange).toHaveBeenCalledWith("desktop");
  });

  it("devrait avoir les classes CSS appropriées", () => {
    const { container } = render(
      <ViewControls value="mobile" onChange={mockOnChange} />
    );

    const mainContainer = container.querySelector(
      ".flex.items-center.justify-between"
    );
    expect(mainContainer).toBeInTheDocument();

    const scrollContainer = container.querySelector(
      ".flex.w-screen.items-center.overflow-x-auto"
    );
    expect(scrollContainer).toBeInTheDocument();
  });

  it("devrait avoir la responsivité appropriée", () => {
    const { container } = render(
      <ViewControls value="mobile" onChange={mockOnChange} />
    );

    const scrollContainer = container.querySelector(".px-4.sm\\:px-6");
    expect(scrollContainer).toBeInTheDocument();

    const innerContainer = container.querySelector(
      ".sm\\:mx-0.sm\\:w-auto.sm\\:overflow-visible"
    );
    expect(innerContainer).toBeInTheDocument();
  });

  it("devrait gérer tous les types de valeurs", () => {
    const values: Array<"mobile" | "desktop" | "both"> = [
      "mobile",
      "desktop",
      "both",
    ];

    values.forEach((value) => {
      const { unmount } = render(
        <ViewControls value={value} onChange={mockOnChange} />
      );

      const activeOption = screen.getByTestId(`option-${value}`);
      expect(activeOption).toHaveClass("active");

      unmount();
    });
  });

  it("devrait avoir la structure DOM appropriée", () => {
    const { container } = render(
      <ViewControls value="mobile" onChange={mockOnChange} />
    );

    const mainDiv = container.querySelector("div");
    expect(mainDiv).toBeInTheDocument();

    const innerDiv = mainDiv?.querySelector("div");
    expect(innerDiv).toBeInTheDocument();
  });
});
