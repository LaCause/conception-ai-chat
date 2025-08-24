import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import ProgressBar from "./ProgressBar";

const meta: Meta<typeof ProgressBar> = {
  title: "Design System/ProgressBar",
  component: ProgressBar,

  argTypes: {
    value: { control: { type: "range", min: 0, max: 100, step: 1 } },
    max: { control: { type: "number", min: 1, max: 1000 } },
    label: { control: "text" },
    showPercent: { control: "boolean" },
  },
  args: {
    value: 50,
    max: 100,
    label: "Progression",
    showPercent: true,
  },
};
export default meta;

type Story = StoryObj<typeof ProgressBar>;

export const Half: Story = {
  name: "50% (par défaut)",
};

export const Quarter: Story = {
  args: {
    value: 25,
    label: "Téléchargement",
  },
};

export const Full: Story = {
  args: {
    value: 100,
    label: "Complété",
  },
};

export const WithoutPercent: Story = {
  args: {
    value: 65,
    showPercent: false,
    label: "Traitement en cours",
  },
};

export const Dynamic: Story = {
  render: (args) => (
    <div className="w-80 space-y-4">
      {[10, 35, 60, 85].map((val) => (
        <ProgressBar key={val} {...args} value={val} label={`Étape ${val}%`} />
      ))}
    </div>
  ),
  args: {
    showPercent: true,
  },
};
