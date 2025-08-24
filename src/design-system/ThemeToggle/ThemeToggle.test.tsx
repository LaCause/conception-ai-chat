import React from "react";
import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ThemeToggle from "./ThemeToggle";

function mockMatchMedia(dark: boolean) {
  const mql = {
    matches: dark,
    media: "(prefers-color-scheme: dark)",
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  } as unknown as MediaQueryList;

  vi.spyOn(window, "matchMedia").mockImplementation((query: string) => {
    if (query === "(prefers-color-scheme: dark)") return mql;
    return {
      ...mql,
      media: query,
      matches: false,
    } as unknown as MediaQueryList;
  });
}

beforeEach(() => {
  document.documentElement.classList.remove("dark");
  localStorage.clear();
  vi.restoreAllMocks();
});

describe("ThemeToggle", () => {
  it("s'initialise en 'dark' si localStorage = 'dark'", async () => {
    localStorage.setItem("theme", "dark");
    mockMatchMedia(false);

    render(<ThemeToggle />);

    await waitFor(() =>
      expect(document.documentElement.classList.contains("dark")).toBe(true)
    );

    const button = screen.getByRole("button", { name: /sombre/i });
    expect(button).toHaveAttribute("aria-pressed", "true");
    expect(button).toHaveAttribute("title", "Passer en clair");
  });

  it("s'initialise via prefers-color-scheme: dark si aucune préférence sauvegardée", async () => {
    mockMatchMedia(true);

    render(<ThemeToggle />);

    await waitFor(() =>
      expect(document.documentElement.classList.contains("dark")).toBe(true)
    );

    const button = screen.getByRole("button", { name: /sombre/i });
    expect(button).toHaveAttribute("aria-pressed", "true");
  });

  it("toggle: passe de dark -> light et sauvegarde dans localStorage", async () => {
    localStorage.setItem("theme", "dark");
    mockMatchMedia(false);
    const user = userEvent.setup();

    render(<ThemeToggle />);

    await waitFor(() =>
      expect(document.documentElement.classList.contains("dark")).toBe(true)
    );

    const button = screen.getByRole("button", { name: /sombre/i });
    await user.click(button);

    await waitFor(() =>
      expect(document.documentElement.classList.contains("dark")).toBe(false)
    );

    const lightBtn = screen.getByRole("button", { name: /clair/i });
    expect(lightBtn).toHaveAttribute("aria-pressed", "false");
    expect(lightBtn).toHaveAttribute("title", "Passer en sombre");

    expect(localStorage.getItem("theme")).toBe("light");
  });

  it("toggle: passe de light -> dark et sauvegarde dans localStorage", async () => {
    mockMatchMedia(false);
    const user = userEvent.setup();

    render(<ThemeToggle />);

    await waitFor(() =>
      expect(document.documentElement.classList.contains("dark")).toBe(false)
    );

    const button = screen.getByRole("button", { name: /clair/i });
    await user.click(button);

    await waitFor(() =>
      expect(document.documentElement.classList.contains("dark")).toBe(true)
    );

    const darkBtn = screen.getByRole("button", { name: /sombre/i });
    expect(darkBtn).toHaveAttribute("aria-pressed", "true");
    expect(localStorage.getItem("theme")).toBe("dark");
  });
});
