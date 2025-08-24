"use client";

import React from "react";
import clsx from "clsx";

export interface BlockSubProps {
  children: React.ReactNode;
  className?: string;
}

export default function BlockSub({ children, className }: BlockSubProps) {
  return (
    <p className={clsx("text-sm text-[var(--muted)]", className)}>{children}</p>
  );
}
