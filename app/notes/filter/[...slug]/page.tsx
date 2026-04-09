import { HydrationBoundary, dehydrate } from '@tanstack/react-query'
import { notFound } from 'next/navigation'

import NotesClient from '@/app/notes/Notes.client'
import { fetchNotes } from '@/lib/api'
import { makeQueryClient } from '@/lib/queryClient'
import { noteTags, type NoteTag } from '@/types/note'

interface FilteredNotesPageProps {
  params: Promise<{
    slug: string[]
  }>
  searchParams: Promise<{
    page?: string
    search?: string
  }>
}

function getPageValue(value?: string) {
  const parsedValue = Number(value)

  if (Number.isInteger(parsedValue) && parsedValue > 0) {
    return parsedValue
  }

  return 1
}

function getTagValue(slug: string[]): NoteTag | undefined {
  if (slug.length !== 1) {
    notFound()
  }

  const [rawTag] = slug

  if (rawTag === 'all') {
    return undefined
  }

  if (noteTags.includes(rawTag as NoteTag)) {
    return rawTag as NoteTag
  }

  notFound()
}

export default async function FilteredNotesPage({
  params,
  searchParams,
}: FilteredNotesPageProps) {
  const { slug } = await params
  const { page, search } = await searchParams

  const currentPage = getPageValue(page)
  const currentSearch = search?.trim() ?? ''
  const currentTag = getTagValue(slug)
  const queryClient = makeQueryClient()

  await queryClient.prefetchQuery({
    queryKey: ['notes', currentPage, currentSearch, currentTag ?? 'all'],
    queryFn: () =>
      fetchNotes({
        page: currentPage,
        perPage: 12,
        search: currentSearch || undefined,
        tag: currentTag,
      }),
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient
        initialPage={currentPage}
        initialSearch={currentSearch}
        initialTag={currentTag}
      />
    </HydrationBoundary>
  )
}
