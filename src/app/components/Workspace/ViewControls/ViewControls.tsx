"use client";

import { SegmentControl } from "@/design-system/SegmentControl/SegmentControl";

export default function ViewControls({
  value,
  onChange,
}: {
  value: "mobile" | "desktop" | "both";
  onChange: (v: "mobile" | "desktop" | "both") => void;
}) {
  return (
    <div className="flex items-center justify-between px-4 sm:px-6">
      <div className="-mx-4 flex w-screen items-center overflow-x-auto px-4 sm:mx-0 sm:w-auto sm:overflow-visible">
        <SegmentControl
          value={value}
          onChange={onChange}
          options={[
            { value: "mobile", label: "📱 Mobile" },
            { value: "desktop", label: "💻 Desktop" },
            { value: "both", label: "⬛ Les deux" },
          ]}
        />
      </div>
    </div>
  );
}
