import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Plus, ArrowRight } from "lucide-react";
import Button from "./Button";

const meta: Meta<typeof Button> = {
  title: "Design System/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "secondary", "ghost"],
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    onClick: { action: "clicked" },
  },
};
export default meta;

type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    children: "Bouton primaire",
    variant: "primary",
  },
};

export const Secondary: Story = {
  args: {
    children: "Bouton secondaire",
    variant: "secondary",
  },
};

export const Ghost: Story = {
  args: {
    children: "Bouton ghost",
    variant: "ghost",
  },
};

export const WithIconLeft: Story = {
  args: {
    children: "Ajouter",
    variant: "primary",
    iconLeft: <Plus className="size-4" />,
  },
};

export const WithIconRight: Story = {
  args: {
    children: "Continuer",
    variant: "primary",
    iconRight: <ArrowRight className="size-4" />,
  },
};

export const Disabled: Story = {
  args: {
    children: "Désactivé",
    variant: "primary",
    disabled: true,
  },
};
