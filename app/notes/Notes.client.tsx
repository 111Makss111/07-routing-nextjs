'use client'

import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { startTransition, useEffect, useState } from 'react'

import Modal from '@/components/Modal/Modal'
import NoteForm from '@/components/NoteForm/NoteForm'
import NoteList from '@/components/NoteList/NoteList'
import Pagination from '@/components/Pagination/Pagination'
import SearchBox from '@/components/SearchBox/SearchBox'
import { fetchNotes, type FetchNotesResponse } from '@/lib/api'
import type { NoteTag } from '@/types/note'

import css from './page.module.css'

const PER_PAGE = 12

interface NotesClientProps {
  initialPage: number
  initialSearch: string
  initialTag?: NoteTag
}

function buildNotesHref(pathname: string, page: number, search: string) {
  const params = new URLSearchParams()

  if (page > 1) {
    params.set('page', String(page))
  }

  if (search) {
    params.set('search', search)
  }

  const query = params.toString()

  return query ? `${pathname}?${query}` : pathname
}

function getPageValue(value: string | null, fallback: number) {
  const parsedValue = Number(value)

  if (Number.isInteger(parsedValue) && parsedValue > 0) {
    return parsedValue
  }

  return fallback
}

export default function NotesClient({
  initialPage,
  initialSearch,
  initialTag,
}: NotesClientProps) {
  const pathname = usePathname()
  const router = useRouter()
  const searchParams = useSearchParams()

  const currentPage = getPageValue(searchParams.get('page'), initialPage)
  const currentSearch = searchParams.get('search')?.trim() ?? initialSearch

  const [searchValue, setSearchValue] = useState(currentSearch)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    setSearchValue(currentSearch)
  }, [currentSearch])

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      const trimmedValue = searchValue.trim()

      if (trimmedValue === currentSearch) {
        return
      }

      startTransition(() => {
        router.replace(buildNotesHref(pathname, 1, trimmedValue))
      })
    }, 500)

    return () => {
      window.clearTimeout(timeoutId)
    }
  }, [currentSearch, pathname, router, searchValue])

  const handlePageChange = (page: number) => {
    startTransition(() => {
      router.push(buildNotesHref(pathname, page, currentSearch))
    })
  }

  const { data, error, isError, isFetching, isLoading } = useQuery<
    FetchNotesResponse,
    Error
  >({
    queryKey: ['notes', currentPage, currentSearch, initialTag ?? 'all'],
    queryFn: () =>
      fetchNotes({
        page: currentPage,
        perPage: PER_PAGE,
        search: currentSearch || undefined,
        tag: initialTag,
      }),
    placeholderData: keepPreviousData,
  })

  const notes = data?.notes ?? []
  const totalPages = data?.totalPages ?? 0

  return (
    <main className={css.app}>
      <div className={css.toolbar}>
        <SearchBox value={searchValue} onChange={setSearchValue} />

        {totalPages > 1 ? (
          <Pagination
            pageCount={totalPages}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        ) : null}

        <button
          className={css.button}
          type="button"
          onClick={() => setIsModalOpen(true)}
        >
          Create note +
        </button>
      </div>

      {isLoading ? <p>Loading, please wait...</p> : null}
      {isError ? <p>{error.message}</p> : null}
      {!isLoading && !isError && notes.length > 0 ? (
        <NoteList notes={notes} />
      ) : null}
      {!isLoading && !isError && notes.length === 0 ? (
        <p>No notes found.</p>
      ) : null}
      {isFetching && !isLoading ? <p>Updating...</p> : null}

      {isModalOpen ? (
        <Modal onClose={() => setIsModalOpen(false)}>
          <NoteForm onClose={() => setIsModalOpen(false)} />
        </Modal>
      ) : null}
    </main>
  )
}
