import Link from 'next/link'

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

export default function DefaultSidebar() {
  return (
    <ul className={css.menuList}>
      {sidebarLinks.map(({ href, label }) => (
        <li key={href} className={css.menuItem}>
          <Link href={href} className={css.menuLink}>
            {label}
          </Link>
        </li>
      ))}
    </ul>
  )
}
