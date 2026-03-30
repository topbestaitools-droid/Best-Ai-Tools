"use client";

import { useState } from "react";

export function Rating({ value = 0, onChange }: { value?: number; onChange?: (v: number) => void }) {
  const [hovered, setHovered] = useState(0);

  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          onClick={() => onChange?.(star)}
          onMouseEnter={() => setHovered(star)}
          onMouseLeave={() => setHovered(0)}
          className={`text-2xl transition ${
            (hovered || value) >= star ? "text-yellow-400" : "text-muted"
          }`}
        >
          ★
        </button>
      ))}
    </div>
  );
}
