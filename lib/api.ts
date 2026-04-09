import type { AxiosResponse } from 'axios'

import notehubApi, { getAuthHeaders } from '@/lib/api/client'
import type { Note, NoteTag } from '@/types/note'

export interface FetchNotesParams {
  page: number
  perPage?: number
  search?: string
  tag?: NoteTag
}

export interface FetchNotesResponse {
  notes: Note[]
  totalPages: number
}

export interface CreateNotePayload {
  title: string
  content: string
  tag: NoteTag
}

export async function fetchNotes({
  page,
  perPage = 12,
  search,
  tag,
}: FetchNotesParams): Promise<FetchNotesResponse> {
  const response: AxiosResponse<FetchNotesResponse> = await notehubApi.get(
    '/notes',
    {
      params: {
        page,
        perPage,
        ...(search ? { search } : {}),
        ...(tag ? { tag } : {}),
      },
      headers: getAuthHeaders(),
    }
  )

  return response.data
}

export async function fetchNoteById(id: string): Promise<Note> {
  const response: AxiosResponse<Note> = await notehubApi.get(`/notes/${id}`, {
    headers: getAuthHeaders(),
  })

  return response.data
}

export async function createNote(payload: CreateNotePayload): Promise<Note> {
  const response: AxiosResponse<Note> = await notehubApi.post(
    '/notes',
    payload,
    {
      headers: getAuthHeaders(),
    }
  )

  return response.data
}

export async function deleteNote(id: string): Promise<Note> {
  const response: AxiosResponse<Note> = await notehubApi.delete(
    `/notes/${id}`,
    {
      headers: getAuthHeaders(),
    }
  )

  return response.data
}
