import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import React from "react";
import { Smartphone, Monitor, Columns } from "lucide-react";
import { SegmentControl } from "./SegmentControl";

const OPTIONS_BASIC = [
  { value: "mobile", label: "📱 Mobile" },
  { value: "desktop", label: "💻 Desktop" },
  { value: "both", label: "⬛ Les deux" },
] as const;

const OPTIONS_ICONS = [
  {
    value: "mobile",
    label: (
      <span className="inline-flex items-center gap-1">
        <Smartphone className="size-4" />
        Mobile
      </span>
    ),
  },
  {
    value: "desktop",
    label: (
      <span className="inline-flex items-center gap-1">
        <Monitor className="size-4" />
        Desktop
      </span>
    ),
  },
  {
    value: "both",
    label: (
      <span className="inline-flex items-center gap-1">
        <Columns className="size-4" />
        Les deux
      </span>
    ),
  },
] as const;

const meta: Meta<typeof SegmentControl> = {
  title: "Design System/SegmentControl",
  component: SegmentControl,
  parameters: { layout: "centered", controls: { expanded: true } },
  argTypes: {
    value: { control: "text" },
    options: { control: false },
    className: { control: "text" },
    onChange: { action: "changed" },
  },
};
export default meta;

type Story = StoryObj<typeof SegmentControl>;

export const Basic: Story = {
  args: {
    value: "both",
    options: OPTIONS_BASIC as unknown as {
      value: string;
      label: React.ReactNode;
    }[],
    className: "shadow-sm",
  },
};

export const WithIcons: Story = {
  args: {
    value: "mobile",
    options: OPTIONS_ICONS as unknown as {
      value: string;
      label: React.ReactNode;
    }[],
  },
};

export const ManyOptions: Story = {
  args: {
    value: "analytics",
    options: [
      { value: "overview", label: "Aperçu" },
      { value: "analytics", label: "Stats" },
      { value: "customers", label: "Clients" },
      { value: "settings", label: "Réglages" },
      { value: "billing", label: "Facturation" },
    ],
  },
};

export const CompactStyle: Story = {
  args: {
    value: "sm",
    options: [
      { value: "xs", label: "XS" },
      { value: "sm", label: "SM" },
      { value: "md", label: "MD" },
    ],
    className: "text-xs",
  },
};
