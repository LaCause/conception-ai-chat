import "@testing-library/jest-dom";
import { vi } from "vitest";

Object.defineProperty(Element.prototype, "scrollIntoView", {
  value: vi.fn(),
  writable: true,
});
