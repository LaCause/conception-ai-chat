"use client";

import clsx from "clsx";
import React from "react";

export function Card({
  className,
  children,
  as: Tag = "div",
}: {
  className?: string;
  children: React.ReactNode;
  as?: React.ElementType;
}) {
  return (
    <Tag className={clsx("rounded-2xl bg-[--elev] p-8 shadow-sm", className)}>
      {children}
    </Tag>
  );
}

export function CardTitle({
  children,
  className,
  as: Tag = "h1",
}: {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
}) {
  return (
    <Tag
      className={clsx(
        "text-balance text-2xl font-semibold md:text-3xl",
        className
      )}
    >
      {children}
    </Tag>
  );
}

export function CardDescription({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p
      className={clsx(
        "mx-auto max-w-md text-pretty text-sm text-[--color-muted] md:text-base",
        className
      )}
    >
      {children}
    </p>
  );
}
