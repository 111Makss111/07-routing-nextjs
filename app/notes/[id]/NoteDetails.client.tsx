'use client'

import { useQuery } from '@tanstack/react-query'

import { fetchNoteById } from '@/lib/api'
import type { Note } from '@/types/note'

import NoteDetails from './NoteDetails'
import css from './page.module.css'

interface NoteDetailsClientProps {
  noteId: string
}

export default function NoteDetailsClient({ noteId }: NoteDetailsClientProps) {
  const {
    data: note,
    error,
    isLoading,
  } = useQuery<Note, Error>({
    queryKey: ['note', noteId],
    queryFn: () => fetchNoteById(noteId),
    enabled: Boolean(noteId),
    refetchOnMount: false,
  })

  if (isLoading) {
    return <p>Loading, please wait...</p>
  }

  if (error || !note) {
    return <p>Something went wrong.</p>
  }

  return (
    <main className={css.main}>
      <div className={css.container}>
        <NoteDetails note={note} />
      </div>
    </main>
  )
}
