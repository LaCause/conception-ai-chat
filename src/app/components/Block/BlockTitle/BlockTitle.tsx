"use client";

import React from "react";
import clsx from "clsx";

export default function BlockTitle({
  children,
  small,
  className,
}: {
  children: React.ReactNode;
  small?: boolean;
  className?: string;
}) {
  return (
    <h3
      className={clsx(
        "font-semibold tracking-tight",
        small ? "text-base" : "text-lg text-[var(--primary)]",
        className
      )}
    >
      {children}
    </h3>
  );
}
