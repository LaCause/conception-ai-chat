import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Card, CardTitle, CardDescription } from "./Card";

const meta: Meta<typeof Card> = {
  title: "Design System/Card",
  component: Card,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    as: { control: false },
    className: { control: "text" },
  },
};
export default meta;

type Story = StoryObj<typeof Card>;

export const Basic: Story = {
  args: {
    children: (
      <div className="space-y-2">
        <div className="text-sm text-[var(--muted)]">Card basique</div>
        <div>Contenu libre dans un conteneur neutre.</div>
      </div>
    ),
    className: "w-80",
  },
};

export const WithTitleAndDescription: Story = {
  args: {
    children: (
      <>
        <CardTitle>Ma jolie carte</CardTitle>
        <CardDescription className="mt-1">
          Sous-texte descriptif cohérent avec le DS.
        </CardDescription>
        <div className="mt-4 text-sm">
          Tu peux mettre des actions, des inputs, etc.
        </div>
      </>
    ),
    className: "w-96",
  },
};

export const Actionable: Story = {
  render: (args) => (
    <button
      type="button"
      className="w-80 text-left transition hover:scale-[0.997] focus-visible:outline-none"
    >
      <Card {...args}>
        <CardTitle as="h2" className="text-lg">
          Carte cliquable
        </CardTitle>
        <CardDescription className="mt-1">
          Utilise-la comme item de liste/action.
        </CardDescription>
        <div className="mt-3 text-sm text-[var(--muted)]">
          Supporte le focus visible via l’élément parent.
        </div>
      </Card>
    </button>
  ),
  args: {
    className: "",
  },
};

export const Grid: Story = {
  render: () => (
    <div className="grid w-[720px] grid-cols-1 gap-4 sm:grid-cols-2">
      {[...Array(4)].map((_, i) => (
        <Card key={i}>
          <CardTitle>Carte {i + 1}</CardTitle>
          <CardDescription className="mt-1">
            Layout responsive en grille.
          </CardDescription>
          <div
            className="mt-3 h-16 rounded-md"
            style={{
              backgroundColor:
                "color-mix(in srgb, var(--primary) 10%, transparent)",
            }}
          />
        </Card>
      ))}
    </div>
  ),
};

export const Themed: Story = {
  render: () => (
    <div className="space-y-4">
      <Card className="w-80">
        <CardTitle>Thème courant</CardTitle>
        <CardDescription className="mt-1">
          Hérite de tes variables (—primary, —elev, …)
        </CardDescription>
        <div
          className="mt-3 h-16 rounded-md"
          style={{
            backgroundColor:
              "color-mix(in srgb, var(--primary) 10%, transparent)",
          }}
        />
      </Card>

      <Card className="w-80">
        <CardTitle>Override local</CardTitle>
        <CardDescription className="mt-1">
          Exemple : bordure teintée via style inline
        </CardDescription>
        <div
          className="mt-3 h-16 rounded-md"
          style={{
            backgroundColor:
              "color-mix(in srgb, var(--primary) 15%, transparent)",
          }}
        />
      </Card>
    </div>
  ),
};
