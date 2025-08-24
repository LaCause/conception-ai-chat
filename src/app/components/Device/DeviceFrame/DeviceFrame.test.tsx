import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import DeviceFrame from "./DeviceFrame";

describe("DeviceFrame", () => {
  it("devrait se rendre avec le texte d'aperçu", () => {
    render(<DeviceFrame>Contenu du mockup</DeviceFrame>);

    expect(screen.getByText("Aperçu mobile")).toBeInTheDocument();
  });

  it("devrait afficher les enfants passés en props", () => {
    render(<DeviceFrame>Contenu personnalisé</DeviceFrame>);

    expect(screen.getByText("Contenu personnalisé")).toBeInTheDocument();
  });

  it("devrait avoir la structure DOM appropriée", () => {
    const { container } = render(<DeviceFrame>Contenu</DeviceFrame>);

    const mainContainer = container.querySelector(
      ".mx-auto.w-full.max-w-\\[380px\\]"
    );
    expect(mainContainer).toBeInTheDocument();

    const deviceFrame = container.querySelector(
      ".relative.rounded-\\[2\\.2rem\\]"
    );
    expect(deviceFrame).toBeInTheDocument();

    const notch = container.querySelector(".absolute.left-1\\/2.top-2.z-10");
    expect(notch).toBeInTheDocument();

    const contentContainer = container.querySelector("[data-mockup-root]");
    expect(contentContainer).toBeInTheDocument();
  });

  it("devrait avoir les classes CSS appropriées", () => {
    const { container } = render(<DeviceFrame>Contenu</DeviceFrame>);

    const roundedFrame = container.querySelector(".rounded-\\[2\\.2rem\\]");
    expect(roundedFrame).toBeInTheDocument();

    const shadowFrame = container.querySelector(".shadow-2xl");
    expect(shadowFrame).toBeInTheDocument();

    const bgFrame = container.querySelector(".bg-black\\/80");
    expect(bgFrame).toBeInTheDocument();
  });

  it("devrait avoir le style aspect-ratio approprié", () => {
    const { container } = render(<DeviceFrame>Contenu</DeviceFrame>);

    const contentContainer = container.querySelector("[data-mockup-root]");
    expect(contentContainer).toHaveStyle({ aspectRatio: "9/19.5" });
  });

  it("devrait avoir les classes de couleur appropriées", () => {
    const { container } = render(<DeviceFrame>Contenu</DeviceFrame>);

    const notch = container.querySelector(".bg-black\\/90");
    expect(notch).toBeInTheDocument();

    const innerFrame = container.querySelector(".bg-neutral-900");
    expect(innerFrame).toBeInTheDocument();

    const contentFrame = container.querySelector(
      ".bg-white.dark\\:bg-\\[--bg\\]"
    );
    expect(contentFrame).toBeInTheDocument();
  });

  it("devrait gérer les enfants React complexes", () => {
    render(
      <DeviceFrame>
        <div>
          <h1>Titre</h1>
          <p>Paragraphe</p>
          <button>Bouton</button>
        </div>
      </DeviceFrame>
    );

    expect(screen.getByText("Titre")).toBeInTheDocument();
    expect(screen.getByText("Paragraphe")).toBeInTheDocument();
    expect(screen.getByText("Bouton")).toBeInTheDocument();
  });

  it("devrait avoir la structure de positionnement appropriée", () => {
    const { container } = render(<DeviceFrame>Contenu</DeviceFrame>);

    const notch = container.querySelector(
      ".absolute.left-1\\/2.top-2.z-10.h-5.w-28.-translate-x-1\\/2"
    );
    expect(notch).toBeInTheDocument();

    const roundedNotch = container.querySelector(".rounded-b-2xl");
    expect(roundedNotch).toBeInTheDocument();
  });
});
