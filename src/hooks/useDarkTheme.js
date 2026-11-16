import { useSyncExternalStore } from "react";

function subscribe(onChange) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["class"],
  });
  return () => observer.disconnect();
}

const getSnapshot = () => document.documentElement.classList.contains("dark");
const getServerSnapshot = () => false;

export default function useDarkTheme() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
