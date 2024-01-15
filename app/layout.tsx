import type { Metadata } from 'next'
import { Plus_Jakarta_Sans } from 'next/font/google'
import './globals.css'
import { classNames } from './lib/functions'

const plus = Plus_Jakarta_Sans({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Kanban Board',
  description: 'coded by filecc',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className='dark'>
      <body className={classNames(plus.className, "bg-light-grey dark:bg-very-dark-grey")}>{children}</body>
    </html>
  )
}
