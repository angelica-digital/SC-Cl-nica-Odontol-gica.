"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { BOOKING_LINK, NAV_LINKS } from "@/lib/constants";

// Mesmo visual do WhatsAppCTA (variante primary), agora levando ao
// agendamento online.
const CTA_BASE =
  "focus-ring inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold tracking-wide transition-all duration-300 bg-deep text-ivory hover:bg-deep-dark active:bg-deep-dark shadow-soft";

export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  // Links de seção (#...) só existem na home. Em outras páginas
  // (ex.: /agendamento) apontam para "/#secao".
  const isHome = pathname === "/";
  const sectionHref = (href: string) => (isHome ? href : `/${href}`);
  const closeMenu = () => setMenuOpen(false);

  // Fecha o menu ao navegar para outra página ou seção.
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!menuOpen) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    // Ao chegar no breakpoint desktop o menu mobile deixa de existir.
    const desktop = window.matchMedia("(min-width: 1024px)");
    const onDesktop = () => desktop.matches && setMenuOpen(false);

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("hashchange", closeMenu);
    desktop.addEventListener("change", onDesktop);

    // Trava o scroll do conteúdo atrás do menu.
    const html = document.documentElement;
    const prevHtml = html.style.overflow;
    const prevBody = document.body.style.overflow;
    html.style.overflow = "hidden";
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("hashchange", closeMenu);
      desktop.removeEventListener("change", onDesktop);
      html.style.overflow = prevHtml;
      document.body.style.overflow = prevBody;
    };
  }, [menuOpen]);

  return (
    <>
      {/* Header no fluxo normal da página: rola junto com o conteúdo. */}
      <header className="relative z-40 w-full">
        <div className="container-page flex h-16 items-center justify-between gap-4 sm:h-[4.5rem] xl:gap-6">
          <a
            href={sectionHref("#inicio")}
            className="focus-ring shrink-0 whitespace-nowrap font-display text-lg tracking-tight text-deep sm:text-xl lg:text-lg xl:text-xl"
          >
            SC <span className="text-graphite">Clínica Odontológica</span>
          </a>

          <nav
            className="hidden items-center gap-4 lg:flex xl:gap-8"
            aria-label="Navegação principal"
          >
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={sectionHref(link.href)}
                className={`focus-ring whitespace-nowrap text-[0.85rem] font-medium text-graphite/80 transition-colors hover:text-deep xl:text-[0.9rem] ${
                  link.href === "#inicio" ? "hidden xl:inline" : ""
                }`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="hidden shrink-0 lg:block">
            <a
              href={BOOKING_LINK.href}
              data-location="header"
              aria-current={pathname === BOOKING_LINK.href ? "page" : undefined}
              className={`${CTA_BASE} whitespace-nowrap px-5 py-2.5 text-[0.8rem] xl:px-6 xl:text-[0.85rem]`}
            >
              {BOOKING_LINK.label}
            </a>
          </div>

          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-label="Abrir menu"
            aria-expanded={menuOpen}
            aria-controls="menu-mobile"
            className="focus-ring -mr-2 flex h-10 w-10 items-center justify-center rounded-full text-graphite lg:hidden"
          >
            <Menu className="h-6 w-6" strokeWidth={1.6} />
          </button>
        </div>
      </header>

      {/* Menu mobile/tablet — overlay fixo sobre a tela inteira. */}
      <div
        id="menu-mobile"
        className={`fixed inset-0 z-[60] transition-[visibility] duration-300 lg:hidden ${
          menuOpen ? "visible" : "invisible"
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Menu de navegação"
        aria-hidden={!menuOpen}
      >
        <div
          onClick={closeMenu}
          aria-hidden="true"
          className={`absolute inset-0 bg-graphite/30 transition-opacity duration-300 ${
            menuOpen ? "opacity-100" : "opacity-0"
          }`}
        />

        <div
          className={`relative ml-auto flex h-full w-full flex-col overflow-y-auto bg-ivory shadow-softer transition-transform duration-300 ease-out sm:max-w-sm ${
            menuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex h-16 shrink-0 items-center justify-between border-b border-graphite/10 px-5 sm:h-[4.5rem] sm:px-8">
            <span className="font-display text-lg text-deep">
              SC <span className="text-graphite">Clínica</span>
            </span>
            <button
              type="button"
              onClick={closeMenu}
              aria-label="Fechar menu"
              className="focus-ring -mr-2 flex h-10 w-10 items-center justify-center rounded-full text-graphite transition-colors hover:bg-graphite/5"
            >
              <X className="h-6 w-6" strokeWidth={1.6} />
            </button>
          </div>

          <nav
            className="flex flex-col px-5 pt-4 sm:px-8"
            aria-label="Navegação mobile"
          >
            {NAV_LINKS.map((link) => {
              const href = sectionHref(link.href);
              return (
                <a
                  key={link.href}
                  href={href}
                  onClick={closeMenu}
                  tabIndex={menuOpen ? undefined : -1}
                  className="focus-ring flex min-h-[3rem] items-center border-b border-graphite/10 py-3 font-display text-lg text-graphite transition-colors hover:text-deep"
                >
                  {link.label}
                </a>
              );
            })}
          </nav>

          <div className="mt-auto px-5 pb-8 pt-8 sm:px-8">
            <a
              href={BOOKING_LINK.href}
              data-location="header-mobile"
              className={`${CTA_BASE} w-full py-3`}
              onClick={closeMenu}
              tabIndex={menuOpen ? undefined : -1}
            >
              {BOOKING_LINK.label}
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
