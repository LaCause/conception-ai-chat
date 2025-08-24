import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import SkeletonResults from "./SkeletonResults";

describe("SkeletonResults", () => {
  it("devrait se rendre correctement", () => {
    render(<SkeletonResults />);

    expect(screen.getByText("Génération du mockup…")).toBeInTheDocument();
  });

  it("devrait avoir la structure DOM attendue", () => {
    const { container } = render(<SkeletonResults />);

    const mainContainer = container.querySelector(".pro-surface");
    expect(mainContainer).toBeInTheDocument();

    const mockupContainer = container.querySelector(
      ".mx-auto.w-full.max-w-\\[380px\\]"
    );
    expect(mockupContainer).toBeInTheDocument();

    const skeletonElements = container.querySelectorAll(".skel");
    expect(skeletonElements.length).toBeGreaterThan(0);
  });

  it("devrait avoir les classes CSS appropriées", () => {
    const { container } = render(<SkeletonResults />);

    const roundedContainer = container.querySelector(".rounded-\\[2rem\\]");
    expect(roundedContainer).toBeInTheDocument();

    const aspectRatioContainer = container.querySelector(
      '[style*="aspect-ratio: 9/19.5"]'
    );
    expect(aspectRatioContainer).toBeInTheDocument();
  });
});
