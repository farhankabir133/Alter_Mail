import { useState, useLayoutEffect } from "react";
// FIX: Module '"wouter"' has no exported member 'LocationHook'. Replaced with BaseLocationHook.
import type { BaseLocationHook, Path } from "wouter";

const currentLoc = () => window.location.hash.replace(/^#/, "") || "/";

// FIX: Ensure navigate function returns void to match wouter's Navigate type.
const navigate = (to: Path) => {
  window.location.hash = to;
};

// FIX: Use BaseLocationHook type from wouter.
export const useHashLocation: BaseLocationHook = () => {
  const [loc, setLoc] = useState<Path>(currentLoc());

  useLayoutEffect(() => {
    const handler = () => setLoc(currentLoc());

    // subscribe on mount
    window.addEventListener("hashchange", handler);
    return () => window.removeEventListener("hashchange", handler);
  }, []);

  return [loc, navigate];
};
