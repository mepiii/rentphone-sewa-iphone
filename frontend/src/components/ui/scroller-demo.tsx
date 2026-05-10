// Purpose: Demo composition for the Scroller component.
// Callers: Manual UI experiments.
// Deps: Scroller.
// API: VerticalWithButtonsDemo component.
// Side effects: none.
import { Scroller } from "@/components/ui/scroller-1";

export default function VerticalWithButtonsDemo() {
  return (
    <div className="flex items-center justify-center">
      <Scroller childrenContainerClassName="gap-4" height={220} overflow="y" withButtons>
        {...Array.from({ length: 4 }, (_, i) => (
          <div
            className="h-60 w-96 bg-[#171717] text-[#ededed] dark:bg-[#ededed] dark:text-[#171717]"
            key={i}
          />
        ))}
      </Scroller>
    </div>
  );
}
