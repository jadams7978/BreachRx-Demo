'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header() {
  const pathname = usePathname();
  const linkBase =
    'px-4 py-2 text-sm rounded-md transition-colors text-brx-text-heading hover:text-brx-blue';
  const isActive = (href: string) =>
    pathname === href ? 'text-brx-blue font-medium' : '';

  return (
    <header className="sticky top-0 z-10 border-b border-gray-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-end py-4">
        <nav className="flex items-center gap-1">
          <Link href="/" className={`${linkBase} ${isActive('/')}`}>
            Home
          </Link>
          <Link href="/resume" className={`${linkBase} ${isActive('/resume')}`}>
            Resume
          </Link>
        </nav>
      </div>
    </header>
  );
}