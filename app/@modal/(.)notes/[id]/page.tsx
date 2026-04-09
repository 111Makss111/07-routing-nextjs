import { HydrationBoundary, dehydrate } from '@tanstack/react-query'

import { fetchNoteById } from '@/lib/api'
import { makeQueryClient } from '@/lib/queryClient'

import NotePreview from './NotePreview.client'

interface NotePreviewPageProps {
  params: Promise<{
    id: string
  }>
}

export default async function NotePreviewPage({
  params,
}: NotePreviewPageProps) {
  const { id } = await params
  const queryClient = makeQueryClient()

  await queryClient.prefetchQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotePreview noteId={id} />
    </HydrationBoundary>
  )
}
