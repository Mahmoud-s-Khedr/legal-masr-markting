import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { ArrowLeft, ExternalLink, MessageSquare } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import "./Feedback.css";

const GOOGLE_FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSf5-UHspbxbJpky5rgzz3DMdVDzqf_tG0Zp6TnK0ykcNDIaeQ/viewform";

export default function Feedback() {
  const { t, i18n } = useTranslation("Feedback");

  const meta = t("meta", { returnObjects: true });
  const form = t("form", { returnObjects: true });

  // Ask Google to render the form UI in the current site language.
  const hl = i18n.language?.startsWith("ar") ? "ar" : "en";
  const embedUrl = `${GOOGLE_FORM_URL}?embedded=true&hl=${hl}`;
  const openUrl = `${GOOGLE_FORM_URL}?hl=${hl}`;

  return (
    <div className="fb">
      <header className="fb-hero">
        <Link to="/" className={buttonVariants({ variant: "ghost", size: "sm" })}>
          <ArrowLeft size={16} />
          {meta.back}
        </Link>

        <Badge variant="secondary">
          <MessageSquare size={13} />
          {meta.badge}
        </Badge>

        <h1>{meta.title}</h1>
        <p className="fb-hero__subtitle">{meta.subtitle}</p>
      </header>

      <main className="fb-main">
        <p>{t("details")}</p>
        <p>{t("privacy")}</p>
        <div className="fb-embed">
          <span className="fb-embed__loading" aria-hidden="true">
            <span className="fb-spinner" />
            {form.loading}
          </span>

          <iframe
            className="fb-embed__frame"
            src={embedUrl}
            title={form.title}
            loading="lazy"
          >
            {form.loading}
          </iframe>
        </div>

        <p className="fb-fallback">
          {form.fallback}{" "}
          <a href={openUrl} target="_blank" rel="noopener noreferrer">
            {form.open}
            <ExternalLink size={13} />
          </a>
        </p>
      </main>
    </div>
  );
}
