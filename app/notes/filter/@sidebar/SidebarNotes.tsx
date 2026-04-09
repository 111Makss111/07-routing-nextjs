'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { noteTags } from '@/types/note'

import css from './SidebarNotes.module.css'

const sidebarLinks = [
  {
    href: '/notes/filter/all',
    label: 'All notes',
  },
  ...noteTags.map((tag) => ({
    href: `/notes/filter/${tag}`,
    label: tag,
  })),
]

export default function SidebarNotes() {
  const pathname = usePathname()

  return (
    <ul className={css.menuList}>
      {sidebarLinks.map(({ href, label }) => (
        <li key={href} className={css.menuItem}>
          <Link
            href={href}
            className={`${css.menuLink} ${pathname === href ? css.active : ''}`}
          >
            {label}
          </Link>
        </li>
      ))}
    </ul>
  )
}
