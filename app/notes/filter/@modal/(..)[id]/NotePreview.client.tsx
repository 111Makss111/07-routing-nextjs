'use client'

import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'

import Modal from '@/components/Modal/Modal'
import { fetchNoteById } from '@/lib/api'
import type { Note } from '@/types/note'

import css from './NotePreview.module.css'

interface NotePreviewProps {
  noteId: string
}

function formatCreatedAt(dateValue: string) {
  return new Intl.DateTimeFormat('en-GB', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(dateValue))
}

export default function NotePreview({ noteId }: NotePreviewProps) {
  const router = useRouter()

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

  const handleClose = () => {
    router.back()
  }

  return (
    <Modal onClose={handleClose}>
      {isLoading ? (
        <p className={css.message}>Loading, please wait...</p>
      ) : null}
      {!isLoading && error ? (
        <p className={css.message}>Something went wrong.</p>
      ) : null}
      {!isLoading && !error && note ? (
        <div className={css.container}>
          <div className={css.item}>
            <div className={css.header}>
              <h2>{note.title}</h2>
            </div>
            <p className={css.tag}>{note.tag}</p>
            <p className={css.content}>{note.content}</p>
            <p className={css.date}>
              Created {formatCreatedAt(note.createdAt)}
            </p>
          </div>
        </div>
      ) : null}
    </Modal>
  )
}
