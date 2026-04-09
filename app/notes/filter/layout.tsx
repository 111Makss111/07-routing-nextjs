import css from './layout.module.css'

interface FilterNotesLayoutProps {
  children: React.ReactNode
  modal: React.ReactNode
  sidebar: React.ReactNode
}

export default function FilterNotesLayout({
  children,
  modal,
  sidebar,
}: FilterNotesLayoutProps) {
  return (
    <>
      <main className={css.container}>
        <aside className={css.sidebar}>{sidebar}</aside>
        <section className={css.notesWrapper}>{children}</section>
      </main>
      {modal}
    </>
  )
}
