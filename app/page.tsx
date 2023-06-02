'use client'
import { useRouter } from 'next/navigation'
import { type FormEvent } from 'react'

export default function Home() {
  const router = useRouter()
  const redirectSearch = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault()
    const product = (evt.currentTarget[0] as HTMLInputElement).value
    router.push(`/search?q=${product}`)
  }

  return (
    <main className='flex min-h-screen flex-col items-center justify-between bg-blue-950 p-24'>
      <form className='flex gap-4' onSubmit={redirectSearch}>
        <div className='flex items-center gap-2 rounded-md bg-gray-900 px-4 text-white outline-none'>
          <svg
            fill='none'
            height={20}
            width={20}
            stroke='currentColor'
            strokeWidth='1.5'
            viewBox='0 0 24 24'
            xmlns='http://www.w3.org/2000/svg'
            aria-hidden='true'>
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z'></path>
          </svg>
          <input
            type='text'
            className='h-4/5 bg-transparent text-lg outline-none'
          />
        </div>
        <button className='rounded-md bg-sky-500 p-4 text-white'>Buscar</button>
      </form>
    </main>
  )
}
