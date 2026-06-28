"use client";

import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { useMemo, useState } from "react";
import PublicHeader from "@/components/public/PublicHeader";
import { useSiteLanguage } from "@/components/public/useSiteLanguage";
import {
  type Locale,
  type LocalizedText,
  clientGroups,
  contactCards,
  firm,
  highlights,
  navLinks,
  practiceAreas,
  processSteps,
  uiText,
  values,
  whyChooseUs,
} from "@/lib/site-content";

type Copy = (typeof uiText)[Locale];
type Translator = (value: LocalizedText) => string;

function SectionHeading({
  eyebrow,
  title,
  children,
  align = "left",
}: {
  eyebrow: string;
  title: string;
  children?: ReactNode;
  align?: "left" | "center";
}) {
  return (
    <div className={`section-heading section-heading--${align}`}>
      <span className="eyebrow">{eyebrow}</span>
      <h2>{title}</h2>
      {children && <p>{children}</p>}
    </div>
  );
}

function Hero({ copy, t }: { copy: Copy; t: Translator }) {
  return (
    <section id="home" className="hero">
      <div className="hero-media" aria-hidden="true">
        <Image
          src="/assets/images/hero-law-lens-nepal.webp"
          alt=""
          fill
          priority
          sizes="100vw"
          className="hero-image"
        />
      </div>
      <div className="hero-overlay" aria-hidden="true" />
      <div className="container hero-inner">
        <div className="hero-copy reveal">
          <span className="eyebrow">{copy.heroEyebrow}</span>
          <h1>{copy.heroTitle}</h1>
          <p>{copy.heroBody}</p>
          <div className="hero-actions">
            <Link className="button button-primary" href="#contact">
              {copy.navCta}
            </Link>
            <Link className="button button-secondary" href="#services">
              {copy.viewServices}
            </Link>
          </div>
        </div>

        <aside className="hero-panel reveal" aria-label="Firm highlights">
          {highlights.map((item) => (
            <div key={t(item.label)}>
              <strong>{t(item.value)}</strong>
              <span>{t(item.label)}</span>
            </div>
          ))}
        </aside>
      </div>
    </section>
  );
}

function About({ copy, t }: { copy: Copy; t: Translator }) {
  return (
    <section id="about" className="section section-light">
      <div className="container about-grid">
        <div className="reveal">
          <SectionHeading eyebrow={copy.aboutEyebrow} title={copy.aboutTitle}>
            {copy.aboutIntro}
          </SectionHeading>
          <p className="body-large">{copy.aboutBody}</p>
        </div>
        <div className="values-grid">
          {values.map((value) => {
            const Icon = value.icon;
            return (
              <article className="value-card reveal" key={value.title.en}>
                <Icon size={24} strokeWidth={1.7} aria-hidden="true" />
                <h3>{t(value.title)}</h3>
                <p>{t(value.description)}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Services({ copy, t }: { copy: Copy; t: Translator }) {
  return (
    <section id="services" className="section section-ink">
      <div className="container">
        <SectionHeading eyebrow={copy.servicesEyebrow} title={copy.servicesTitle} align="center">
          {copy.servicesIntro}
        </SectionHeading>
        <div className="services-grid">
          {practiceAreas.map((service) => {
            const Icon = service.icon;
            return (
              <article className="service-card reveal" key={service.title.en}>
                <span className="icon-badge" aria-hidden="true">
                  <Icon size={24} strokeWidth={1.7} />
                </span>
                <h3>{t(service.title)}</h3>
                <p>{t(service.description)}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function WhyChooseUs({ copy, t }: { copy: Copy; t: Translator }) {
  return (
    <section className="section section-white">
      <div className="container split-grid">
        <div className="reveal">
          <SectionHeading eyebrow={copy.whyEyebrow} title={copy.whyTitle}>
            {copy.whyIntro}
          </SectionHeading>
        </div>
        <div className="why-list">
          {whyChooseUs.map((item) => (
            <div className="why-item reveal" key={item.en}>
              <span aria-hidden="true">✓</span>
              <p>{t(item)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Process({ copy, t }: { copy: Copy; t: Translator }) {
  return (
    <section id="process" className="section section-light">
      <div className="container">
        <SectionHeading eyebrow={copy.processEyebrow} title={copy.processTitle} align="center">
          {copy.processIntro}
        </SectionHeading>
        <div className="process-grid">
          {processSteps.map((step, index) => (
            <article className="process-card reveal" key={step.title.en}>
              <span className="step-number">{String(index + 1).padStart(2, "0")}</span>
              <h3>{t(step.title)}</h3>
              <p>{t(step.description)}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ClientSupport({ copy, t }: { copy: Copy; t: Translator }) {
  return (
    <section className="section section-support">
      <div className="container support-grid">
        <div className="reveal">
          <SectionHeading eyebrow={copy.supportEyebrow} title={copy.supportTitle}>
            {copy.supportIntro}
          </SectionHeading>
        </div>
        <div className="client-tags" aria-label="Client groups supported">
          {clientGroups.map((group) => (
            <span className="client-tag reveal" key={group.en}>
              {t(group)}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactForm({ copy, t }: { copy: Copy; t: Translator }) {
  const [status, setStatus] = useState("");
  const issueTypes = useMemo(() => practiceAreas.map((area) => area.title), []);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus(copy.formStatus);
    event.currentTarget.reset();
  }

  return (
    <form className="contact-form reveal" onSubmit={handleSubmit}>
      <div className="form-row">
        <label>
          {copy.formName}
          <input name="name" type="text" autoComplete="name" required />
        </label>
        <label>
          {copy.formPhone}
          <input name="phone" type="tel" autoComplete="tel" required />
        </label>
      </div>
      <div className="form-row">
        <label>
          {copy.formEmail}
          <input name="email" type="email" autoComplete="email" required />
        </label>
        <label>
          {copy.formIssueType}
          <select name="issueType" required defaultValue="">
            <option value="" disabled>
              {copy.formIssuePlaceholder}
            </option>
            {issueTypes.map((type) => (
              <option key={type.en}>{t(type)}</option>
            ))}
          </select>
        </label>
      </div>
      <label>
        {copy.formMessage}
        <textarea name="message" rows={5} required />
      </label>
      <button className="button button-primary" type="submit">
        {copy.formSubmit}
      </button>
      <p className="form-status" aria-live="polite">
        {status}
      </p>
    </form>
  );
}

function Contact({ copy, t }: { copy: Copy; t: Translator }) {
  return (
    <section id="contact" className="section section-contact">
      <div className="container contact-grid">
        <div>
          <SectionHeading eyebrow={copy.contactEyebrow} title={copy.contactTitle}>
            {copy.contactIntro}
          </SectionHeading>
          <div className="contact-cards">
            {contactCards.map((card) => {
              const Icon = card.icon;
              return (
                <div className="contact-card reveal" key={card.label.en}>
                  <Icon size={22} strokeWidth={1.8} aria-hidden="true" />
                  <span>{t(card.label)}</span>
                  <strong>{t(card.value)}</strong>
                </div>
              );
            })}
          </div>
          <div className="map-placeholder reveal" aria-label="Google Maps placeholder for Maitighar, Kathmandu">
            {firm.mapEmbedUrl ? (
              <iframe
                title="Law Lens Nepal location"
                src={firm.mapEmbedUrl}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            ) : (
              <div>
                <strong>{copy.mapTitle}</strong>
                <span>{copy.mapPlaceholder}</span>
              </div>
            )}
          </div>
        </div>
        <ContactForm copy={copy} t={t} />
      </div>
    </section>
  );
}

function Footer({ copy, t }: { copy: Copy; t: Translator }) {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <Link className="brand brand-footer" href="#home" aria-label="Law Lens Nepal home">
            <span className="brand-mark" aria-hidden="true">
              <Image
                className="brand-logo"
                src="/assets/images/law-lens-nepal-logo.svg"
                alt=""
                width={42}
                height={42}
              />
            </span>
            <span>
              <strong>Law Lens Nepal</strong>
              <small>{t(firm.shortLocation)}</small>
            </span>
          </Link>
          <p>{copy.footerSummary}</p>
        </div>
        <div>
          <h2>{copy.footerQuickLinks}</h2>
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href}>
              {t(link.label)}
            </Link>
          ))}
        </div>
        <div>
          <h2>{copy.footerPracticeAreas}</h2>
          {practiceAreas.slice(0, 6).map((service) => (
            <Link key={service.title.en} href="#services">
              {t(service.title)}
            </Link>
          ))}
        </div>
        <div>
          <h2>{copy.footerContactInfo}</h2>
          <p>{t(firm.location)}</p>
          <p>{firm.phone}</p>
          <p>{firm.email}</p>
          <p>{t(firm.hours)}</p>
        </div>
      </div>
      <div className="container footer-bottom">
        <p>{copy.disclaimer}</p>
        <p>
          © {new Date().getFullYear()} Law Lens Nepal. {copy.rights}
        </p>
      </div>
    </footer>
  );
}

export default function MarketingSite() {
  const { language, setLanguage, t } = useSiteLanguage();
  const copy = uiText[language];

  return (
    <>
      <PublicHeader currentPage="home" language={language} setLanguage={setLanguage} t={t} />
      <main>
        <Hero copy={copy} t={t} />
        <About copy={copy} t={t} />
        <Services copy={copy} t={t} />
        <WhyChooseUs copy={copy} t={t} />
        <Process copy={copy} t={t} />
        <ClientSupport copy={copy} t={t} />
        <Contact copy={copy} t={t} />
      </main>
      <Footer copy={copy} t={t} />
    </>
  );
}
