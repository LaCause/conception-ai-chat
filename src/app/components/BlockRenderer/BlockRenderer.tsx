"use client";

import React from "react";
import type { UIBlock } from "@/types/ui";
import clsx from "clsx";
import {
  Search as SearchIcon,
  Star,
  Heart,
  User,
  Plus,
  ChevronRight,
  Image as ImageIcon,
  Calendar,
  CheckCircle,
  Settings,
  Bell,
} from "lucide-react";
import Button from "@/design-system/Button/Button";

/** Utilitaires */
const Title: React.FC<{ children: React.ReactNode; small?: boolean }> = ({
  children,
  small,
}) => (
  <h3
    className={clsx(
      "font-semibold tracking-tight",
      small ? "text-base" : "text-lg"
    )}
  >
    {children}
  </h3>
);

const Sub: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <p className="text-sm text-[--muted]">{children}</p>
);

const Pill: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className,
}) => (
  <span
    className={clsx(
      "inline-flex items-center gap-1 rounded-full border border-black/10 px-2 py-1 text-xs dark:border-white/10",
      className
    )}
  >
    {children}
  </span>
);

/** Composants de bloc */

function HeaderBlock({
  title = "App Name",
  subtitle = "Sous-titre ou statut",
}: {
  title?: string;
  subtitle?: string;
}) {
  return (
    <div className="rounded-xl border border-black/10 bg-white p-4 shadow-sm dark:border-white/10 dark:bg-white/10">
      <div className="flex items-center justify-between">
        <div>
          <Title>{title}</Title>
          <Sub>{subtitle}</Sub>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm">
            <Bell className="size-4" />
          </Button>
          <Button variant="ghost" size="sm">
            <Settings className="size-4" />
          </Button>
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-black/10 text-xs dark:bg-white/20">
            <User className="size-4" />
          </div>
        </div>
      </div>
    </div>
  );
}

function HeroBlock({
  title = "Bienvenue 👋",
  description = "Présentez votre proposition de valeur en une phrase.",
  cta = "Commencer",
}: {
  title?: string;
  description?: string;
  cta?: string;
}) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-black/10 p-6 shadow-sm dark:border-white/10">
      <div
        className="pointer-events-none absolute -inset-2 opacity-30 blur-2xl"
        style={{
          background:
            "linear-gradient(90deg,var(--grad-from),var(--grad-mid),var(--grad-to))",
          mask: "radial-gradient(60% 80% at 10% 10%, black, transparent 70%)",
        }}
      />
      <div className="relative">
        <h2 className="text-2xl font-bold gradient-text">{title}</h2>
        <p className="mt-2 text-[--muted]">{description}</p>
        <div className="mt-4 flex items-center gap-2">
          +{" "}
          <Button
            variant="primary"
            size="md"
            iconLeft={<Plus className="size-4" />}
          >
            {cta}
          </Button>
          <Button variant="secondary" size="md">
            En savoir plus
          </Button>
        </div>
      </div>
    </div>
  );
}

function SearchBlock({
  placeholder = "Rechercher…",
  hint = "Conseil : tapez un mot-clé ou scannez",
  compact,
}: {
  placeholder?: string;
  hint?: string;
  compact?: boolean;
}) {
  return (
    <div className="rounded-xl border border-black/10 bg-white p-4 shadow-sm dark:border-white/10 dark:bg-white/10">
      <div
        className={clsx(
          "flex items-center gap-2 rounded-lg border border-black/10 px-3 dark:border-white/10",
          compact ? "py-2" : "py-3"
        )}
      >
        <SearchIcon className="size-4 opacity-70" />
        <input
          placeholder={placeholder}
          className="w-full bg-transparent outline-none placeholder:text-[--muted]"
        />
        <Pill>⌘K</Pill>
      </div>
      {!compact && <p className="mt-2 text-xs text-[--muted]">{hint}</p>}
    </div>
  );
}

function ListBlock({
  title = "Liste",
  items = ["Élément 1", "Élément 2", "Élément 3"],
}: {
  title?: string;
  items?: string[];
}) {
  return (
    <div className="rounded-xl border border-black/10 bg-white p-3 shadow-sm dark:border-white/10 dark:bg-white/10">
      <Title small>{title}</Title>
      <ul className="mt-2 divide-y divide-black/10 dark:divide-white/10">
        {items.map((t, i) => (
          <li key={i} className="flex items-center justify-between py-2">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-md bg-black/10 text-xs dark:bg-white/20">
                <ImageIcon className="size-4" />
              </div>
              <span>{t}</span>
            </div>
            <ChevronRight className="size-4 opacity-60" />
          </li>
        ))}
      </ul>
    </div>
  );
}

function CardGridBlock({
  title = "Cartes",
  cols = 2,
}: {
  title?: string;
  cols?: number;
}) {
  const gridCols = Math.max(1, Math.min(4, cols));
  return (
    <div className="rounded-xl border border-black/10 bg-white p-3 shadow-sm dark:border-white/10 dark:bg-white/10">
      <Title small>{title}</Title>
      <div
        className={clsx(
          "mt-3 grid gap-3",
          gridCols === 1 && "grid-cols-1",
          gridCols === 2 && "grid-cols-2",
          gridCols === 3 && "grid-cols-3",
          gridCols === 4 && "grid-cols-4"
        )}
      >
        {Array.from({ length: gridCols * 2 }).map((_, i) => (
          <div
            key={i}
            className="rounded-lg border border-black/10 p-3 dark:border-white/10"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-black/10 dark:bg-white/20">
                  <ImageIcon className="size-4" />
                </div>
                <div>
                  <div className="text-sm font-medium">Carte {i + 1}</div>
                  <div className="text-xs text-[--muted]">Sous-texte</div>
                </div>
              </div>
              <Star className="size-4 opacity-60" />
            </div>
            <div className="mt-3 h-20 rounded-md bg-black/5 dark:bg-white/10" />
            <div className="mt-3 flex items-center justify-between">
              <Button
                variant="secondary"
                size="sm"
                className="h-8 px-2 text-xs"
              >
                Détails
              </Button>
              <Button
                variant="primary"
                size="sm"
                className="h-8 px-2 text-xs"
                iconLeft={<Plus className="size-3" />}
              >
                Ajouter
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function FormBlock({
  title = "Formulaire",
  fields = ["Nom", "Email", "Mot de passe"],
}: {
  title?: string;
  fields?: string[];
}) {
  return (
    <div className="rounded-xl border border-black/10 bg-white p-4 shadow-sm dark:border-white/10 dark:bg-white/10">
      <Title small>{title}</Title>
      <div className="mt-3 grid gap-3">
        {fields.map((f, i) => (
          <div key={i} className="grid gap-1">
            <label className="text-xs text-[--muted]">{f}</label>
            <input className="h-10 rounded-lg border border-black/10 bg-transparent px-3 outline-none focus-visible:glow-outline dark:border-white/10" />
          </div>
        ))}
      </div>
      <div className="mt-4 flex items-center justify-end gap-2">
        <Button variant="ghost">Annuler</Button>
        <Button variant="primary" iconLeft={<CheckCircle className="size-4" />}>
          Valider
        </Button>
      </div>
    </div>
  );
}

function DetailBlock({
  title = "Titre du contenu",
  subtitle = "Infos clés et tags",
  content = "Voici un exemple de zone de détail avec texte, méta-informations et actions contextuelles.",
}: {
  title?: string;
  subtitle?: string;
  content?: string;
}) {
  return (
    <div className="rounded-xl border border-black/10 bg-white p-4 shadow-sm dark:border-white/10 dark:bg-white/10">
      <div className="flex items-start justify-between gap-4">
        <div>
          <Title>{title}</Title>
          <div className="mt-1 flex flex-wrap gap-2">
            <Pill>
              <Calendar className="size-3" />
              Aujourd’hui
            </Pill>
            <Pill>
              <Heart className="size-3" />
              124
            </Pill>
            <Pill>
              <Star className="size-3" />
              4.8
            </Pill>
          </div>
        </div>
        +{" "}
        <Button
          variant="secondary"
          size="sm"
          className="h-9 px-3"
          iconLeft={<Settings className="size-4" />}
        >
          Options
        </Button>
      </div>
      <p className="mt-3 text-sm leading-6 text-[--muted]">{content}</p>
      <div className="mt-4 h-32 rounded-lg bg-black/5 dark:bg-white/10" />
    </div>
  );
}

function CtaBarBlock({
  title = "Action principale",
  secondary = "Plus tard",
}: {
  title?: string;
  secondary?: string;
}) {
  return (
    <div className="sticky bottom-2 z-0 mt-2 rounded-xl border border-black/10 bg-white p-3 shadow-sm dark:border-white/10 dark:bg-white/10">
      <div className="flex items-center justify-between gap-3">
        <div className="text-sm text-[--muted]">Prêt à continuer ?</div>
        <div className="flex items-center gap-2">
          <Button variant="ghost">{secondary}</Button>
          <Button
            variant="primary"
            iconRight={<ChevronRight className="size-4" />}
          >
            {title}
          </Button>
        </div>
      </div>
    </div>
  );
}

/** RENDERER PRINCIPAL */
export default function BlockRenderer({
  block,
  compact,
  className,
}: {
  block: UIBlock;
  compact?: boolean;
  className?: string;
}) {
  const t = block.type;
  const title = block.title || undefined;
  const description = (block as any).description || undefined;

  return (
    <div className={clsx("w-full", className)}>
      {t === "HEADER" && <HeaderBlock title={title} subtitle="Sous-titre" />}
      {t === "HERO" && <HeroBlock title={title} description={description} />}
      {t === "SEARCH" && (
        <SearchBlock placeholder={title || "Rechercher…"} compact={compact} />
      )}
      {t === "LIST" && <ListBlock title={title} />}
      {t === "CARD_GRID" && (
        <CardGridBlock title={title} cols={(block as any).data?.cols ?? 2} />
      )}
      {t === "FORM" && <FormBlock title={title} />}
      {t === "DETAIL" && <DetailBlock title={title} content={description} />}
      {t === "CTA_BAR" && <CtaBarBlock title={title || "Continuer"} />}

      {![
        "HEADER",
        "HERO",
        "SEARCH",
        "LIST",
        "CARD_GRID",
        "FORM",
        "DETAIL",
        "CTA_BAR",
      ].includes(t) && (
        <div className="rounded-xl border border-dashed border-black/20 p-4 text-sm text-[--muted] dark:border-white/20">
          Type inconnu: <code className="text-xs">{t}</code>
          <pre className="mt-2 max-h-48 overflow-auto rounded-lg bg-black/5 p-2 text-xs dark:bg-white/10">
            {JSON.stringify(block, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}
