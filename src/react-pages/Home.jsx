import { useTranslation } from "react-i18next";
import {
  Download,
  Briefcase,
  Users,
  Wallet,
  Archive,
  ShieldCheck,
  CalendarDays,
  FileText,
  ArrowRight,
  Check,
  Lock,
} from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import HeroBackground from "../components/HeroBackground";
import "./Home.css";
import { downloads, fileUrl, release } from "../lib/downloads";
import useRecommendedDownload from "../hooks/useRecommendedDownload";
import useDarkTheme from "../hooks/useDarkTheme";

const FEATURE_ICONS = [Briefcase, CalendarDays, Users, Wallet, FileText, Archive];

export default function Home() {
  const { t, i18n } = useTranslation("Home");
  const screenshotLanguage = i18n.resolvedLanguage?.startsWith("en") ? "en" : "ar";
  const isDarkTheme = useDarkTheme();
  const dashboardImage = `/media/product/dashboard-${screenshotLanguage}${isDarkTheme ? "-dark" : ""}.webp`;

  const detected = useRecommendedDownload();
  const recommended = downloads.find((item) => item.id === detected);
  const downloadHref = recommended
    ? fileUrl(recommended.file, import.meta.env.PUBLIC_DOWNLOAD_BASE_URL)
    : "/download";
  const downloadLabel = recommended ? t(`quickDownload.${recommended.id}`) : t("hero.primary");
  const downloadHint = recommended
    ? t(`quickDownload.instructions.${recommended.id}`)
    : t(detected === "mobile" ? "quickDownload.mobile" : "quickDownload.unsupported");

  const features = t("features.items", { returnObjects: true });
  const steps = t("guide.steps", { returnObjects: true });
  const localPoints = t("local.points", { returnObjects: true });

  return (
    <div className="home">
      {/* ================= HERO ================= */}
      <section className="home-hero">
        <HeroBackground />

        <div className="home-hero__glow home-hero__glow--one" />
        <div className="home-hero__glow home-hero__glow--two" />

        <div className="home-hero__grid">
          <div className="home-hero__copy">
            {/* <Badge className="home-hero__badge hero-reveal hero-reveal--1">
              <Sparkles size={13} />
              {t("hero.badge")}
            </Badge> */}

            <h1 className="hero-reveal hero-reveal--2">{t("hero.title")}</h1>

            <p className="home-hero__subtitle hero-reveal hero-reveal--3">
              {t("hero.subtitle")}
            </p>

            <div className="home-hero__actions hero-reveal hero-reveal--4">
              <a className={buttonVariants({size: "lg"})} href={downloadHref}>
                  <Download size={18} />
                  {downloadLabel}
                  <ArrowRight size={17} />
                </a>

              <a className={buttonVariants({variant: "ghost", size: "lg"})} href="/how-to-use">
                  {t("hero.secondary")}
                  <ArrowRight size={17} />
                </a>
            </div>

            <div className="home-quick-download hero-reveal hero-reveal--5" aria-live="polite">
              <p>{downloadHint}</p>
              {recommended && <p>{t("quickDownload.recommended", { version: release.version, size: recommended.size })}</p>}
              <a href="/download">{t("quickDownload.all")}</a>
            </div>

            <div className="home-hero__trust hero-reveal hero-reveal--5">
              <div className="home-hero__trust-icon">
                <ShieldCheck size={17} />
              </div>

              <span>{t("hero.note")}</span>
            </div>
          </div>

          {/* Product visual */}
          <div className="home-product hero-product-reveal">
            <div className="home-product__glow" />

            <figure className="home-product__capture">
              <a className="home-product__preview" href={dashboardImage} target="_blank" rel="noopener noreferrer" aria-label={t("hero.capture.open")}>
                <img src={dashboardImage} alt={t("hero.capture.alt")} width="1440" height="1100" fetchPriority="high" />
              </a>
              <figcaption>
                <span>{t("hero.capture.caption")}</span>
                <a href="#product-demo">{t("hero.capture.watch")} <ArrowRight size={15} /></a>
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      <section id="product-demo" className="home-section home-demo" aria-labelledby="product-demo-title">
        <div className="home-section__heading">
          <Badge variant="secondary">{t("demo.badge")}</Badge>
          <h2 id="product-demo-title">{t("demo.title")}</h2>
          <p>{t("demo.description")}</p>
        </div>
        <figure className="home-demo__figure">
          <video key={screenshotLanguage} controls playsInline preload="none" poster="/media/product/case-with-hearing-ar.webp" width="1440" height="1000" aria-label={t("demo.videoLabel")} aria-describedby="product-demo-caption">
            <source src="/media/product/case-to-hearing-ar.mp4" type="video/mp4" />
            <track kind="captions" src="/media/product/demo-ar.vtt" srcLang="ar" label="العربية" default={screenshotLanguage === "ar"} />
            <track kind="captions" src="/media/product/demo-en.vtt" srcLang="en" label="English" default={screenshotLanguage === "en"} />
            <a href="/media/product/case-to-hearing-ar.mp4">{t("demo.download")}</a>
          </video>
          <figcaption id="product-demo-caption">{t("demo.caption")}</figcaption>
        </figure>
        <ol className="home-demo__steps">
          {t("demo.steps", { returnObjects: true }).map((step) => <li key={step}>{step}</li>)}
        </ol>
      </section>

      {/* ================= FEATURES ================= */}
      <section
        id="features"
        className="home-section home-features-section reveal"
      >
        <div className="home-section__heading">
          <Badge variant="secondary">{t("features.title")}</Badge>

          <h2>{t("features.lead")}</h2>
        </div>

        <div className="home-bento">
          {features.map((feature, index) => {
            const Icon = FEATURE_ICONS[index];

            return (
              <article
                key={index}
                className={`home-bento__item reveal reveal--stagger-${Math.min(
                  index + 1,
                  6,
                )} home-bento__item--${index + 1}`}
              >
                <div className="home-bento__icon">
                  <Icon size={21} />
                </div>

                <div>
                  <h3>{feature.title}</h3>
                  <p>{feature.desc}</p>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* ================= GUIDE ================= */}
      <section id="guide" className="home-workflow">
        <div className="home-workflow__header reveal">
          <Badge variant="secondary">{t("guide.title")}</Badge>

          <h2>{t("guide.lead")}</h2>
        </div>

        <div className="home-workflow__steps">
          {steps.map((step, index) => (
            <div
              className={`home-workflow__step reveal reveal--stagger-${Math.min(
                index + 1,
                6,
              )}`}
              key={index}
            >
              <div className="home-workflow__number">
                {String(index + 1).padStart(2, "0")}
              </div>

              <div>
                <h3>{step.title}</h3>
                <p>{step.desc}</p>
              </div>

              {index !== steps.length - 1 && (
                <div className="home-workflow__line" />
              )}
            </div>
          ))}
        </div>

        <div className="reveal reveal--stagger-4">
          <a className={buttonVariants({variant: "outline"})} href="/how-to-use">
              {t("guide.cta")}
              <ArrowRight size={17} />
            </a>
        </div>
      </section>

      {/* ================= LOCAL FIRST ================= */}
      <section className="home-privacy reveal">
        <div className="home-privacy__icon">
          <ShieldCheck size={26} />
        </div>

        <div className="home-privacy__content">
          <Badge variant="secondary">
            <Lock size={13} />
            {t("local.badge")}
          </Badge>

          <h2>{t("local.title")}</h2>
          <p>{t("local.desc")}</p>
        </div>

        <div className="home-privacy__checklist">
          {localPoints.map((point, index) => (
            <div key={index}>
              <Check size={16} />
              <span>{point}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ================= DOWNLOAD ================= */}
      <section id="download" className="home-download reveal">
        <HeroBackground />

        <div className="home-download__glow" />

        <div className="home-download__content">
          <Badge>
            <Download size={13} />
            {t("download.title")}
          </Badge>

          <h2>{t("download.desc")}</h2>

          <div className="home-download__buttons">
            <a href={downloadHref} className="home-download__button rounded-4xl">
              <Download size={18} />
              {recommended ? downloadLabel : t("download.cta")}
            </a>
          </div>

          <p>{downloadHint} <a href="/download">{t("quickDownload.all")}</a></p>
          <p>{t("download.note")}</p>
        </div>
      </section>
    </div>
  );
}
