'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import Link from 'next/link'

import { deleteNote } from '@/lib/api'
import type { Note } from '@/types/note'

import css from './NoteList.module.css'

interface NoteListProps {
  notes: Note[]
}

export default function NoteList({ notes }: NoteListProps) {
  const queryClient = useQueryClient()

  const deleteNoteMutation = useMutation({
    mutationFn: deleteNote,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['notes'] })
    },
  })

  return (
    <ul className={css.list}>
      {notes.map((note) => {
        const isDeleting =
          deleteNoteMutation.isPending &&
          deleteNoteMutation.variables === note.id

        return (
          <li key={note.id} className={css.listItem}>
            <h2 className={css.title}>{note.title}</h2>
            <p className={css.content}>{note.content}</p>

            <div className={css.footer}>
              <span className={css.tag}>{note.tag}</span>

              <div className={css.actions}>
                <Link className={css.link} href={`/notes/${note.id}`}>
                  View details
                </Link>

                <button
                  className={css.button}
                  type="button"
                  onClick={() => deleteNoteMutation.mutate(note.id)}
                  disabled={isDeleting}
                >
                  Delete
                </button>
              </div>
            </div>
          </li>
        )
      })}
    </ul>
  )
}
