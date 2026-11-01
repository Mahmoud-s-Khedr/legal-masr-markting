import { useEffect, useState } from "react";
import { Check, ChevronRight, Copy, Palette, RotateCcw, X } from "lucide-react";

import "./ThemePlayground.css";

const STORAGE_KEY = "theme-playground-palette";

const palettes = {
  teal: {
    name: "Teal",
    description: "Clean and professional",
    colors: ["#0f766e", "#14b8a6", "#d8f5f1"],

    light: {
      background: "#f4f9f8",
      foreground: "#102a2a",

      card: "#ffffff",
      cardForeground: "#102a2a",

      popover: "#ffffff",
      popoverForeground: "#102a2a",

      primary: "#0f766e",
      primaryForeground: "#ffffff",

      secondary: "#e6f2f0",
      secondaryForeground: "#102a2a",

      muted: "#e6f2f0",
      mutedForeground: "#5b7271",

      accent: "#d8f5f1",
      accentForeground: "#102a2a",

      border: "#d2e3e0",
      input: "#d2e3e0",
      ring: "#0d9488",

      brandHover: "#0b5f59",
      accentStrong: "#14b8a6",
      accentSoft: "#d8f5f1",
      shadow: "rgba(15, 118, 110, 0.1)",
    },

    dark: {
      background: "#071918",
      foreground: "#e6f5f3",

      card: "#0e2422",
      cardForeground: "#e6f5f3",

      popover: "#0e2422",
      popoverForeground: "#e6f5f3",

      primary: "#2dd4bf",
      primaryForeground: "#06201e",

      secondary: "#153330",
      secondaryForeground: "#e6f5f3",

      muted: "#153330",
      mutedForeground: "#9bb8b5",

      accent: "#123b37",
      accentForeground: "#e6f5f3",

      border: "#284743",
      input: "#284743",
      ring: "#2dd4bf",

      brandHover: "#5eead4",
      accentStrong: "#14b8a6",
      accentSoft: "#123b37",
      shadow: "rgba(0, 0, 0, 0.45)",
    },
  },

  ocean: {
    name: "Ocean",
    description: "Modern SaaS blue",
    colors: ["#2563eb", "#06b6d4", "#dbeafe"],

    light: {
      background: "#f6f9ff",
      foreground: "#172554",

      card: "#ffffff",
      cardForeground: "#172554",

      popover: "#ffffff",
      popoverForeground: "#172554",

      primary: "#2563eb",
      primaryForeground: "#ffffff",

      secondary: "#e8f0ff",
      secondaryForeground: "#1e3a8a",

      muted: "#eaf2ff",
      mutedForeground: "#64748b",

      accent: "#dff7ff",
      accentForeground: "#164e63",

      border: "#dbe5f5",
      input: "#dbe5f5",
      ring: "#3b82f6",

      brandHover: "#1d4ed8",
      accentStrong: "#2563eb",
      accentSoft: "#eef2ff",
      shadow: "rgba(37, 99, 235, 0.1)",
    },

    dark: {
      background: "#07111f",
      foreground: "#e0f2fe",

      card: "#0d1b2e",
      cardForeground: "#e0f2fe",

      popover: "#0d1b2e",
      popoverForeground: "#e0f2fe",

      primary: "#60a5fa",
      primaryForeground: "#07111f",

      secondary: "#142743",
      secondaryForeground: "#dbeafe",

      muted: "#142743",
      mutedForeground: "#94a3b8",

      accent: "#10354a",
      accentForeground: "#cffafe",

      border: "#1f3a5a",
      input: "#1f3a5a",
      ring: "#60a5fa",

      brandHover: "#93c5fd",
      accentStrong: "#2563eb",
      accentSoft: "#0b3550",
      shadow: "rgba(0, 0, 0, 0.45)",
    },
  },

  emerald: {
    name: "Emerald",
    description: "Fresh and trustworthy",
    colors: ["#059669", "#10b981", "#d1fae5"],

    light: {
      background: "#f5fbf8",
      foreground: "#102a22",

      card: "#ffffff",
      cardForeground: "#102a22",

      popover: "#ffffff",
      popoverForeground: "#102a22",

      primary: "#059669",
      primaryForeground: "#ffffff",

      secondary: "#e4f7ee",
      secondaryForeground: "#064e3b",

      muted: "#e7f7ef",
      mutedForeground: "#607a70",

      accent: "#d1fae5",
      accentForeground: "#065f46",

      border: "#d3e9df",
      input: "#d3e9df",
      ring: "#10b981",

      brandHover: "#047857",
      accentStrong: "#10b981",
      accentSoft: "#d1fae5",
      shadow: "rgba(5, 150, 105, 0.1)",
    },

    dark: {
      background: "#071a14",
      foreground: "#e5f8ef",

      card: "#0d281f",
      cardForeground: "#e5f8ef",

      popover: "#0d281f",
      popoverForeground: "#e5f8ef",

      primary: "#34d399",
      primaryForeground: "#062016",

      secondary: "#143a2d",
      secondaryForeground: "#d1fae5",

      muted: "#143a2d",
      mutedForeground: "#91b7a8",

      accent: "#124333",
      accentForeground: "#d1fae5",

      border: "#285443",
      input: "#285443",
      ring: "#34d399",

      brandHover: "#6ee7b7",
      accentStrong: "#10b981",
      accentSoft: "#124333",
      shadow: "rgba(0, 0, 0, 0.45)",
    },
  },

  violet: {
    name: "Violet",
    description: "Premium and creative",
    colors: ["#7c3aed", "#a855f7", "#ede9fe"],

    light: {
      background: "#faf9ff",
      foreground: "#241638",

      card: "#ffffff",
      cardForeground: "#241638",

      popover: "#ffffff",
      popoverForeground: "#241638",

      primary: "#7c3aed",
      primaryForeground: "#ffffff",

      secondary: "#f0ebff",
      secondaryForeground: "#4c1d95",

      muted: "#f2effb",
      mutedForeground: "#706782",

      accent: "#ede9fe",
      accentForeground: "#4c1d95",

      border: "#e5def5",
      input: "#e5def5",
      ring: "#8b5cf6",

      brandHover: "#6d28d9",
      accentStrong: "#a855f7",
      accentSoft: "#ede9fe",
      shadow: "rgba(124, 58, 237, 0.1)",
    },

    dark: {
      background: "#110c1d",
      foreground: "#f5f3ff",

      card: "#1b122b",
      cardForeground: "#f5f3ff",

      popover: "#1b122b",
      popoverForeground: "#f5f3ff",

      primary: "#a78bfa",
      primaryForeground: "#160d25",

      secondary: "#2a1b40",
      secondaryForeground: "#ede9fe",

      muted: "#2a1b40",
      mutedForeground: "#b3a8c4",

      accent: "#352052",
      accentForeground: "#ede9fe",

      border: "#44305d",
      input: "#44305d",
      ring: "#a78bfa",

      brandHover: "#c4b5fd",
      accentStrong: "#c084fc",
      accentSoft: "#352052",
      shadow: "rgba(0, 0, 0, 0.5)",
    },
  },

  rose: {
    name: "Rose",
    description: "Bold and elegant",
    colors: ["#e11d48", "#f43f5e", "#ffe4e6"],

    light: {
      background: "#fff8f9",
      foreground: "#3b111c",

      card: "#ffffff",
      cardForeground: "#3b111c",

      popover: "#ffffff",
      popoverForeground: "#3b111c",

      primary: "#e11d48",
      primaryForeground: "#ffffff",

      secondary: "#ffe9ee",
      secondaryForeground: "#881337",

      muted: "#fceff2",
      mutedForeground: "#80636c",

      accent: "#ffe4e6",
      accentForeground: "#9f1239",

      border: "#f2d8de",
      input: "#f2d8de",
      ring: "#f43f5e",

      brandHover: "#be123c",
      accentStrong: "#f43f5e",
      accentSoft: "#ffe4e6",
      shadow: "rgba(225, 29, 72, 0.1)",
    },

    dark: {
      background: "#1c0b11",
      foreground: "#fff1f2",

      card: "#2a1019",
      cardForeground: "#fff1f2",

      popover: "#2a1019",
      popoverForeground: "#fff1f2",

      primary: "#fb7185",
      primaryForeground: "#2a0a12",

      secondary: "#401723",
      secondaryForeground: "#ffe4e6",

      muted: "#401723",
      mutedForeground: "#c8a0aa",

      accent: "#511b2a",
      accentForeground: "#ffe4e6",

      border: "#63303d",
      input: "#63303d",
      ring: "#fb7185",

      brandHover: "#fda4af",
      accentStrong: "#fb7185",
      accentSoft: "#511b2a",
      shadow: "rgba(0, 0, 0, 0.5)",
    },
  },

  amber: {
    name: "Amber",
    description: "Warm and energetic",
    colors: ["#d97706", "#f59e0b", "#fef3c7"],

    light: {
      background: "#fffcf5",
      foreground: "#33210a",

      card: "#ffffff",
      cardForeground: "#33210a",

      popover: "#ffffff",
      popoverForeground: "#33210a",

      primary: "#d97706",
      primaryForeground: "#ffffff",

      secondary: "#fff4dc",
      secondaryForeground: "#78350f",

      muted: "#faf1df",
      mutedForeground: "#796d5d",

      accent: "#fef3c7",
      accentForeground: "#78350f",

      border: "#eadfc9",
      input: "#eadfc9",
      ring: "#f59e0b",

      brandHover: "#b45309",
      accentStrong: "#f59e0b",
      accentSoft: "#fef3c7",
      shadow: "rgba(217, 119, 6, 0.1)",
    },

    dark: {
      background: "#1b1205",
      foreground: "#fff8e7",

      card: "#291b08",
      cardForeground: "#fff8e7",

      popover: "#291b08",
      popoverForeground: "#fff8e7",

      primary: "#fbbf24",
      primaryForeground: "#211302",

      secondary: "#3b280c",
      secondaryForeground: "#fef3c7",

      muted: "#3b280c",
      mutedForeground: "#c5ae82",

      accent: "#4b320c",
      accentForeground: "#fef3c7",

      border: "#604718",
      input: "#604718",
      ring: "#fbbf24",

      brandHover: "#fcd34d",
      accentStrong: "#f59e0b",
      accentSoft: "#4b320c",
      shadow: "rgba(0, 0, 0, 0.5)",
    },
  },

  slate: {
    name: "Slate",
    description: "Minimal and serious",
    colors: ["#475569", "#64748b", "#e2e8f0"],

    light: {
      background: "#f8fafc",
      foreground: "#172033",

      card: "#ffffff",
      cardForeground: "#172033",

      popover: "#ffffff",
      popoverForeground: "#172033",

      primary: "#475569",
      primaryForeground: "#ffffff",

      secondary: "#eef2f6",
      secondaryForeground: "#1e293b",

      muted: "#eef2f6",
      mutedForeground: "#64748b",

      accent: "#e2e8f0",
      accentForeground: "#1e293b",

      border: "#dce2e9",
      input: "#dce2e9",
      ring: "#64748b",

      brandHover: "#334155",
      accentStrong: "#64748b",
      accentSoft: "#e2e8f0",
      shadow: "rgba(71, 85, 105, 0.1)",
    },

    dark: {
      background: "#0b1018",
      foreground: "#e7edf5",

      card: "#151c27",
      cardForeground: "#e7edf5",

      popover: "#151c27",
      popoverForeground: "#e7edf5",

      primary: "#94a3b8",
      primaryForeground: "#0f172a",

      secondary: "#202936",
      secondaryForeground: "#e2e8f0",

      muted: "#202936",
      mutedForeground: "#9aa8ba",

      accent: "#293443",
      accentForeground: "#e2e8f0",

      border: "#354252",
      input: "#354252",
      ring: "#94a3b8",

      brandHover: "#cbd5e1",
      accentStrong: "#94a3b8",
      accentSoft: "#293443",
      shadow: "rgba(0, 0, 0, 0.5)",
    },
  },

  cyan: {
    name: "Cyan",
    description: "Sharp and futuristic",
    colors: ["#0891b2", "#06b6d4", "#cffafe"],

    light: {
      background: "#f4fcfd",
      foreground: "#0c2830",

      card: "#ffffff",
      cardForeground: "#0c2830",

      popover: "#ffffff",
      popoverForeground: "#0c2830",

      primary: "#0891b2",
      primaryForeground: "#ffffff",

      secondary: "#e0f7fa",
      secondaryForeground: "#164e63",

      muted: "#e5f6f8",
      mutedForeground: "#5d747a",

      accent: "#cffafe",
      accentForeground: "#155e75",

      border: "#d0e8eb",
      input: "#d0e8eb",
      ring: "#06b6d4",

      brandHover: "#0e7490",
      accentStrong: "#06b6d4",
      accentSoft: "#cffafe",
      shadow: "rgba(8, 145, 178, 0.1)",
    },

    dark: {
      background: "#06161a",
      foreground: "#e0faff",

      card: "#0b2329",
      cardForeground: "#e0faff",

      popover: "#0b2329",
      popoverForeground: "#e0faff",

      primary: "#22d3ee",
      primaryForeground: "#052026",

      secondary: "#12343c",
      secondaryForeground: "#cffafe",

      muted: "#12343c",
      mutedForeground: "#8eafb6",

      accent: "#164652",
      accentForeground: "#cffafe",

      border: "#28535d",
      input: "#28535d",
      ring: "#22d3ee",

      brandHover: "#67e8f9",
      accentStrong: "#06b6d4",
      accentSoft: "#164652",
      shadow: "rgba(0, 0, 0, 0.5)",
    },
  },
};

const getThemeMode = () =>
  document.documentElement.classList.contains("dark") ? "dark" : "light";

const applyPalette = (paletteName) => {
  const palette = palettes[paletteName];

  if (!palette) return;

  const root = document.documentElement;
  const mode = getThemeMode();
  const colors = palette[mode];

  const variables = {
    "--background": colors.background,
    "--foreground": colors.foreground,

    "--card": colors.card,
    "--card-foreground": colors.cardForeground,

    "--popover": colors.popover,
    "--popover-foreground": colors.popoverForeground,

    "--primary": colors.primary,
    "--primary-foreground": colors.primaryForeground,

    "--secondary": colors.secondary,
    "--secondary-foreground": colors.secondaryForeground,

    "--muted": colors.muted,
    "--muted-foreground": colors.mutedForeground,

    "--accent": colors.accent,
    "--accent-foreground": colors.accentForeground,

    "--border": colors.border,
    "--input": colors.input,
    "--ring": colors.ring,

    /* Legacy aliases */
    "--color-bg": colors.background,
    "--color-surface": colors.card,
    "--color-surface-alt": colors.muted,

    "--color-text": colors.foreground,
    "--color-text-muted": colors.mutedForeground,

    "--color-border": colors.border,

    "--color-brand": colors.primary,
    "--color-brand-hover": colors.brandHover,
    "--color-on-brand": colors.primaryForeground,

    "--color-accent": colors.accentStrong,
    "--color-accent-soft": colors.accentSoft,

    "--color-focus": colors.ring,

    "--color-shadow": colors.shadow,
  };

  Object.entries(variables).forEach(([property, value]) => {
    root.style.setProperty(property, value);
  });

  localStorage.setItem(STORAGE_KEY, paletteName);
};

const clearPaletteOverrides = () => {
  const root = document.documentElement;

  const variables = [
    "--background",
    "--foreground",
    "--card",
    "--card-foreground",
    "--popover",
    "--popover-foreground",
    "--primary",
    "--primary-foreground",
    "--secondary",
    "--secondary-foreground",
    "--muted",
    "--muted-foreground",
    "--accent",
    "--accent-foreground",
    "--border",
    "--input",
    "--ring",

    "--color-bg",
    "--color-surface",
    "--color-surface-alt",
    "--color-text",
    "--color-text-muted",
    "--color-border",
    "--color-brand",
    "--color-brand-hover",
    "--color-on-brand",
    "--color-accent",
    "--color-accent-soft",
    "--color-focus",
    "--color-shadow",
  ];

  variables.forEach((property) => {
    root.style.removeProperty(property);
  });

  localStorage.removeItem(STORAGE_KEY);
};

const generateCss = (paletteName, mode) => {
  const colors = palettes[paletteName][mode];

  return `/* ${palettes[paletteName].name} - ${mode} */

:root {
  --background: ${colors.background};
  --foreground: ${colors.foreground};

  --card: ${colors.card};
  --card-foreground: ${colors.cardForeground};

  --popover: ${colors.popover};
  --popover-foreground: ${colors.popoverForeground};

  --primary: ${colors.primary};
  --primary-foreground: ${colors.primaryForeground};

  --secondary: ${colors.secondary};
  --secondary-foreground: ${colors.secondaryForeground};

  --muted: ${colors.muted};
  --muted-foreground: ${colors.mutedForeground};

  --accent: ${colors.accent};
  --accent-foreground: ${colors.accentForeground};

  --border: ${colors.border};
  --input: ${colors.input};
  --ring: ${colors.ring};

  --color-bg: ${colors.background};
  --color-surface: ${colors.card};
  --color-surface-alt: ${colors.muted};

  --color-text: ${colors.foreground};
  --color-text-muted: ${colors.mutedForeground};

  --color-border: ${colors.border};

  --color-brand: ${colors.primary};
  --color-brand-hover: ${colors.brandHover};
  --color-on-brand: ${colors.primaryForeground};

  --color-accent: ${colors.accentStrong};
  --color-accent-soft: ${colors.accentSoft};

  --color-focus: ${colors.ring};
  --color-shadow: ${colors.shadow};
}`;
};

export default function ThemePlayground() {
  const [open, setOpen] = useState(false);
  const [palette, setPalette] = useState(
    () => localStorage.getItem(STORAGE_KEY) || "oceatn",
  );
  const [mode, setMode] = useState(getThemeMode);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    applyPalette(palette);
  }, [palette]);

  useEffect(() => {
    const observer = new MutationObserver(() => {
      const currentMode = getThemeMode();

      setMode(currentMode);
      applyPalette(palette);
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, [palette]);

  const handlePaletteChange = (name) => {
    setPalette(name);
    applyPalette(name);
  };

  const handleReset = () => {
    clearPaletteOverrides();

    setPalette("teal");

    window.location.reload();
  };

  const handleCopy = async () => {
    const css = generateCss(palette, mode);

    await navigator.clipboard.writeText(css);

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 1500);
  };

  return (
    <>
      <button
        type="button"
        className={`theme-playground-trigger ${
          open ? "theme-playground-trigger-open" : ""
        }`}
        onClick={() => setOpen((value) => !value)}
        aria-label="Open theme playground"
      >
        {open ? <X size={20} /> : <Palette size={20} />}
      </button>

      <aside
        className={`theme-playground ${open ? "theme-playground-open" : ""}`}
        aria-hidden={!open}
      >
        <div className="theme-playground-header">
          <div>
            <span className="theme-playground-eyebrow">Design system</span>

            <h2>Theme Playground</h2>

            <p>Choose a palette and compare it with your UI.</p>
          </div>

          <button
            type="button"
            className="theme-playground-close"
            onClick={() => setOpen(false)}
            aria-label="Close theme playground"
          >
            <X size={18} />
          </button>
        </div>

        <div className="theme-playground-mode">
          <span>Current mode</span>

          <div className="theme-playground-mode-value">
            <span
              className={`theme-playground-mode-dot ${
                mode === "dark" ? "dark" : ""
              }`}
            />

            {mode === "dark" ? "Dark" : "Light"}
          </div>
        </div>

        <div className="theme-playground-content">
          <div className="theme-playground-section-title">
            <span>Color palettes</span>
            <span>{Object.keys(palettes).length}</span>
          </div>

          <div className="theme-playground-palettes">
            {Object.entries(palettes).map(([key, item]) => {
              const selected = palette === key;

              return (
                <button
                  type="button"
                  key={key}
                  className={`theme-palette ${
                    selected ? "theme-palette-selected" : ""
                  }`}
                  onClick={() => handlePaletteChange(key)}
                >
                  <div className="theme-palette-preview">
                    {item.colors.map((color) => (
                      <span key={color} style={{ backgroundColor: color }} />
                    ))}
                  </div>

                  <div className="theme-palette-info">
                    <strong>{item.name}</strong>
                    <small>{item.description}</small>
                  </div>

                  <div className="theme-palette-check">
                    {selected && <Check size={16} />}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <div className="theme-playground-footer">
          <button
            type="button"
            className="theme-playground-action"
            onClick={handleReset}
          >
            <RotateCcw size={16} />
            Reset
          </button>

          <button
            type="button"
            className="theme-playground-action theme-playground-copy"
            onClick={handleCopy}
          >
            <Copy size={16} />
            {copied ? "Copied!" : "Copy CSS"}
          </button>
        </div>
      </aside>

      {open && (
        <button
          type="button"
          className="theme-playground-backdrop"
          onClick={() => setOpen(false)}
          aria-label="Close theme playground"
        />
      )}
    </>
  );
}
