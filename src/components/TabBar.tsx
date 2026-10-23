"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LifeBuoy, PencilLine, Sunrise, Users, Wind, type LucideIcon } from "lucide-react";

type Tab = { href: string; label: string; Icon: LucideIcon; className?: string };

const TABS: Tab[] = [
  { href: "/", label: "Today", Icon: Sunrise },
  { href: "/check-in", label: "Check in", Icon: PencilLine },
  { href: "/tools", label: "Tools", Icon: Wind },
  { href: "/circles", label: "Circles", Icon: Users },
  { href: "/support", label: "Support", Icon: LifeBuoy, className: "tab-support" },
];

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);
}

export function TabBar() {
  const pathname = usePathname();

  return (
    <nav className="tabbar" aria-label="Main">
      <ul>
        {TABS.map(({ href, label, Icon, className }) => (
          <li key={href}>
            <Link
              href={href}
              className={className ? `tab ${className}` : "tab"}
              aria-current={isActive(pathname, href) ? "page" : undefined}
            >
              <Icon size={22} strokeWidth={1.75} aria-hidden="true" />
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
