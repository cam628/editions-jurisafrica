'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const nav = [
  { href: '/', label: 'Les Editions' },
  { href: '/penant', label: 'Le PENANT' },
  { href: '/ouvrages', label: 'Ouvrages' },
  { href: '/rjp', label: 'La R.J.P.' },
  { href: '/comite', label: 'Comité' },
  { href: '/contributeurs', label: 'Contributeurs' },
  { href: '/contact', label: 'Contact' },
];

export default function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const isActive = (href: string) => (href === '/' ? pathname === '/' : pathname?.startsWith(href));

  return (
    <header className="sticky top-0 z-50 bg-white text-[#063f0e] shadow border-b border-[#063f0e]">
      <div className="container-6xl py-2 grid grid-cols-[auto_1fr_auto] items-center gap-8 min-w-0">
        <Link href="/" className="col-start-1 justify-self-center">
          <Image
            src="/logo.png"
            alt="Éditions JurisAfrica"
            width={160}
            height={160}
            className="rounded w-16 sm:w-20 md:w-[12vw] lg:w-[10vw] h-auto"
            priority
          />
          <span className="sr-only">Éditions JurisAfrica</span>
        </Link>

        <nav className="col-start-3 site-nav hidden md:flex items-center gap-8 text-base font-medium justify-self-end justify-end whitespace-nowrap overflow-x-auto overflow-y-visible leading-relaxed min-w-0 no-scrollbar pb-1">
          {nav.map(i => (
            <Link
              key={i.href}
              href={i.href}
              className={`border-b-2 border-transparent hover:border-[#063f0e] transition-all duration-300 ${isActive(i.href) ? '!border-[#063f0e]' : ''}`}
            >
              {i.label}
            </Link>
          ))}
        </nav>

        {/* Mobile hamburger button */}
        <button
          type="button"
          aria-label="Ouvrir le menu"
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen(v => !v)}
          className="col-start-3 md:hidden justify-self-end inline-flex items-center justify-center p-2 rounded border border-[#063f0e] text-[#063f0e]"
        >
          <span className="sr-only">Menu</span>
          <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>
      </div>

      {/* Mobile dropdown menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-[#063f0e] bg-white">
          <nav className="container-6xl py-3 flex flex-col gap-3 text-sm">
            {nav.map(i => (
              <Link
                key={i.href}
                href={i.href}
                onClick={() => setMobileOpen(false)}
                className={`border-b-2 border-transparent hover:border-[#063f0e] transition-all duration-300 ${isActive(i.href) ? '!border-[#063f0e]' : ''}`}
              >
                {i.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
