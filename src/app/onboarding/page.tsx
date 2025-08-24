"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import ProgressBar from "@/design-system/ProgressBar/ProgressBar";
import { Card, CardDescription, CardTitle } from "@/design-system/Card/Card";
import Button from "@/design-system/Button/Button";

type Slide = { title: string; text: string; emoji: string };

const slides: Slide[] = [
  {
    title: "Bienvenue 👋",
    text: "Décris ton idée d’app en langage naturel. On transforme ton texte en une maquette interactive.",
    emoji: "✨",
  },
  {
    title: "Tape ton idée",
    text: "Explique simplement : fonctionnalités, public visé, écran d’accueil, liste, carte, formulaire… Pas besoin de jargon.",
    emoji: "📝",
  },
  {
    title: "Génère un mockup",
    text: "Clique sur “Générer”. Nous créons une structure d’écran (header, hero, listes, cartes, formulaires…).",
    emoji: "⚡",
  },
  {
    title: "Itère rapidement",
    text: "Affinage en un clic : ajoute une section, remplace une liste par un feed, mets l’emphase sur un grid de cartes, etc.",
    emoji: "🛠️",
  },
  {
    title: "Prêt à prototyper",
    text: "Aperçu responsive, thème clair/sombre et export JSON pour réutiliser ailleurs. Lance-toi !",
    emoji: "🚀",
  },
];

export default function OnboardingPage() {
  const [step, setStep] = useState(0);
  const router = useRouter();

  const isLast = step === slides.length - 1;
  const progress = useMemo(
    () => Math.round(((step + 1) / slides.length) * 100),
    [step]
  );

  async function markVisitedAndGoHome() {
    try {
      await fetch("/api/mark-visited", { method: "POST", cache: "no-store" });
      localStorage.setItem("hasOnboarded", "true");
    } catch (e) {
      console.error("mark-visited failed", e);
    } finally {
      router.push("/");
    }
  }

  const handleNext = () => {
    if (isLast) markVisitedAndGoHome();
    else setStep((prev) => prev + 1);
  };

  const handleSkip = () => {
    markVisitedAndGoHome();
  };

  const { title, text, emoji } = slides[step];

  return (
    <main
      className="relative flex min-h-dvh flex-col items-center justify-between gap-6 p-6"
      aria-labelledby="onboarding-title"
    >
      {/* Header / Progression */}
      <header className="mt-2 w-full" aria-label="Progression de l’onboarding">
        <ProgressBar value={progress} label="Progression de l’onboarding" />
      </header>

      {/* Slide courante */}
      <section
        className="flex w-full flex-1 items-center justify-center"
        aria-live="polite"
        aria-atomic="true"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.35 }}
            className="w-full max-w-xl"
          >
            <Card as="article" aria-labelledby="onboarding-title">
              <div className="text-6xl md:text-7xl" aria-hidden="true">
                {emoji}
              </div>
              <CardTitle className="mt-4">{title}</CardTitle>
              <CardDescription className="mt-2">{text}</CardDescription>
            </Card>
          </motion.div>
        </AnimatePresence>
      </section>

      {/* Actions */}
      <nav
        className="flex w-full items-center justify-between gap-3"
        aria-label="Actions d’onboarding"
      >
        <Button
          type="button"
          onClick={handleSkip}
          variant="secondary"
          size="sm"
          aria-label="Passer l’onboarding"
        >
          Passer
        </Button>

        <div className="flex items-center gap-2 text-xs text-[--color-muted]">
          <span>
            {step + 1} / {slides.length}
          </span>
        </div>

        <Button type="button" onClick={handleNext} variant="primary" size="md">
          {isLast ? "Commencer" : "Suivant"}
        </Button>
      </nav>
    </main>
  );
}
