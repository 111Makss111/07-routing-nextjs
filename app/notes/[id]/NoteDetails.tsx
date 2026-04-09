import type { Note } from '@/types/note'

import css from './page.module.css'

interface NoteDetailsProps {
  note: Note
}

function formatCreatedAt(dateValue: string) {
  return new Intl.DateTimeFormat('en-GB', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(dateValue))
}

export default function NoteDetails({ note }: NoteDetailsProps) {
  return (
    <div className={css.item}>
      <div className={css.header}>
        <h2>{note.title}</h2>
      </div>
      <p className={css.tag}>{note.tag}</p>
      <p className={css.content}>{note.content}</p>
      <p className={css.date}>Created {formatCreatedAt(note.createdAt)}</p>
    </div>
  )
}
