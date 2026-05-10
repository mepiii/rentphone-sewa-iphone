// Purpose: Pass-through app wrapper kept for optional smooth-scroll wiring.
// Callers: App root.
// Deps: React.
// API: SmoothScrollProvider wrapper component.
// Side effects: none.
import { type ReactNode } from "react";

export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
