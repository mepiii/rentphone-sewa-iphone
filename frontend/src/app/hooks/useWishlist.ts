// Purpose: Shared wishlist state hook.
// Callers: catalog and wishlist pages.
// Deps: mock transaction wishlist helpers.
// API: useWishlist hook.
// Side effects: reads localStorage and listens for wishlist updates.
import { useEffect, useState } from "react";
import { getWishlist, toggleWishlist as toggleSavedWishlist } from "../data/mockTransactions";

export function useWishlist() {
  const [wishlist, setWishlist] = useState<string[]>(() => getWishlist());

  useEffect(() => {
    const refresh = () => setWishlist(getWishlist());
    window.addEventListener("storage", refresh);
    window.addEventListener("rentphone:wishlist", refresh);
    return () => {
      window.removeEventListener("storage", refresh);
      window.removeEventListener("rentphone:wishlist", refresh);
    };
  }, []);

  const toggleWishlist = (productId: string) => {
    const next = toggleSavedWishlist(productId);
    // dispatch after state update so refresh reads correct value
    setTimeout(() => window.dispatchEvent(new Event("rentphone:wishlist")), 0);
    setWishlist(next);
  };

  return { wishlist, toggleWishlist };
}