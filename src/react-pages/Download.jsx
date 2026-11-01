import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Check,
  Copy,
  Download as DownloadIcon,
  Info,
  Laptop,
  Monitor,
  Package,
  Terminal,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import "./Download.css";

/* ------------------------------------------------------------------ *
 *  EDIT THIS SECTION WHEN YOU PUBLISH A NEW RELEASE
 * ------------------------------------------------------------------ */
const VERSION = "1.0.0";
const RELEASE_DATE = "2026-10-01"; // YYYY-MM-DD
const BASE_URL = "/downloads"; // folder or CDN/GitHub releases URL holding the files

/**
 * One entry per file. Delete the ones you don't ship.
 * `id` must match the keys in the "items" object of Download.json.
 * `command` (optional) is shown under the card with a copy button.
 */
const DOWNLOADS = [
  {
    id: "windows-installer",
    group: "windows",
    ext: ".exe",
    arch: "x64",
    size: "~90 MB",
    file: `LegalMasr-${VERSION}-setup.exe`,
  },
  {
    id: "windows-portable",
    group: "windows",
    ext: ".zip",
    arch: "x64",
    size: "~95 MB",
    file: `LegalMasr-${VERSION}-portable.zip`,
  },
  {
    id: "linux-deb",
    group: "linux",
    ext: ".deb",
    arch: "amd64",
    size: "~85 MB",
    file: `LegalMasr-${VERSION}-amd64.deb`,
    command: (file) => `sudo apt install ./${file}`,
  },
  {
    id: "linux-rpm",
    group: "linux",
    ext: ".rpm",
    arch: "x86_64",
    size: "~85 MB",
    file: `LegalMasr-${VERSION}-x86_64.rpm`,
    command: (file) => `sudo dnf install ./${file}`,
  },
  {
    id: "linux-appimage",
    group: "linux",
    ext: ".AppImage",
    arch: "x86_64",
    size: "~100 MB",
    file: `LegalMasr-${VERSION}-x86_64.AppImage`,
    command: (file) => `chmod +x ${file} && ./${file}`,
  },
  {
    id: "macos-dmg",
    group: "macos",
    ext: ".dmg",
    arch: "universal",
    size: "~95 MB",
    file: `LegalMasr-${VERSION}.dmg`,
  },
];
/* ------------------------------------------------------------------ */

const GROUP_ORDER = ["windows", "linux", "macos"];

const GROUP_ICONS = {
  windows: Monitor,
  linux: Terminal,
  macos: Laptop,
};

const fileUrl = (file) => `${BASE_URL}/${file}`;

/** Returns a download id, "mobile", or null when we can't tell. */
function detectRecommended() {
  const ua = navigator.userAgent.toLowerCase();

  if (/android|iphone|ipad|ipod/.test(ua)) return "mobile";
  if (ua.includes("windows")) return "windows-installer";
  if (ua.includes("mac")) return "macos-dmg";
  if (ua.includes("linux") || ua.includes("x11")) {
    if (/fedora|suse|red hat|centos/.test(ua)) return "linux-rpm";
    if (/ubuntu|debian|mint/.test(ua)) return "linux-deb";
    return "linux-appimage"; // works everywhere
  }
  return null;
}

function CopyCommand({ command, copyLabel, copiedLabel }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(command);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard blocked: the command is still selectable */
    }
  };

  return (
    <div className="dl-command" dir="ltr">
      <code>{command}</code>
      <button
        type="button"
        onClick={copy}
        aria-label={copied ? copiedLabel : copyLabel}
        title={copied ? copiedLabel : copyLabel}
      >
        {copied ? <Check size={14} /> : <Copy size={14} />}
      </button>
    </div>
  );
}

function DownloadLink({ item, label }) {
  return (
    <Button asChild>
      <a href={fileUrl(item.file)} download>
        <DownloadIcon size={16} />
        {label}
      </a>
    </Button>
  );
}

function Chips({ item }) {
  return (
    <ul className="dl-chips" dir="ltr">
      <li>{item.ext}</li>
      <li>{item.arch}</li>
      <li>{item.size}</li>
    </ul>
  );
}

export default function Download() {
  const { t, i18n } = useTranslation("Download");

  const meta = t("meta", { returnObjects: true });
  const actions = t("actions", { returnObjects: true });
  const groups = t("groups", { returnObjects: true });
  const items = t("items", { returnObjects: true });
  const help = t("help", { returnObjects: true });

  // Detected after mount so server HTML and first client render match.
  const [detected, setDetected] = useState(null);
  useEffect(() => setDetected(detectRecommended()), []);

  const recommended = DOWNLOADS.find((d) => d.id === detected);

  const releaseDate = new Intl.DateTimeFormat(i18n.language, {
    dateStyle: "long",
    timeZone: "UTC",
  }).format(new Date(RELEASE_DATE));

  return (
    <div className="dl">
      <header className="dl-hero">
        <Button asChild variant="ghost" size="sm">
          <Link to="/">
            <ArrowLeft size={16} />
            {meta.back}
          </Link>
        </Button>

        <Badge variant="secondary">
          <Package size={13} />
          {meta.badge}
        </Badge>

        <h1>{meta.title}</h1>
        <p className="dl-hero__subtitle">{meta.subtitle}</p>

        <p className="dl-hero__version">
          {t("meta.version", { version: VERSION })}
          <span aria-hidden="true">·</span>
          {t("meta.released", { date: releaseDate })}
        </p>
      </header>

      <main className="dl-main">
        {detected === "mobile" && (
          <div className="dl-callout">
            <Info size={16} />
            <p>{actions.mobile}</p>
          </div>
        )}

        {recommended && (
          <section className="dl-recommended" aria-labelledby="dl-rec-title">
            <div className="dl-recommended__text">
              <span className="dl-recommended__label" id="dl-rec-title">
                {actions.recommended}
              </span>
              <h2>{items[recommended.id].name}</h2>
              <p>{items[recommended.id].desc}</p>
              <Chips item={recommended} />
            </div>

            <DownloadLink item={recommended} label={actions.download} />
          </section>
        )}

        <h2 className="dl-all">{actions.all}</h2>

        {GROUP_ORDER.map((groupId) => {
          const list = DOWNLOADS.filter((d) => d.group === groupId);
          if (!list.length) return null;

          const Icon = GROUP_ICONS[groupId];
          const group = groups[groupId];

          return (
            <section key={groupId} className="dl-group">
              <div className="dl-group__head">
                <Icon size={20} />
                <h3>{group.title}</h3>
              </div>
              <p className="dl-group__desc">{group.desc}</p>

              <div className="dl-grid">
                {list.map((item) => (
                  <article
                    key={item.id}
                    className={`dl-card${
                      item.id === detected ? " is-recommended" : ""
                    }`}
                  >
                    <h4>{items[item.id].name}</h4>
                    <p>{items[item.id].desc}</p>
                    <Chips item={item} />

                    {item.command && (
                      <CopyCommand
                        command={item.command(item.file)}
                        copyLabel={actions.copy}
                        copiedLabel={actions.copied}
                      />
                    )}

                    <DownloadLink item={item} label={actions.download} />
                  </article>
                ))}
              </div>

              {group.note && (
                <div className="dl-callout">
                  <Info size={16} />
                  <p>{group.note}</p>
                </div>
              )}
            </section>
          );
        })}

        <p className="dl-help">
          {help.text} <Link to="/feedback">{help.link}</Link>
        </p>
      </main>
    </div>
  );
}
