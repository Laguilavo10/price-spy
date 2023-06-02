'use client'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

interface dataProduct {
  names: string[]
  prices: string[]
  links: string[]
}

export default function Search() {
  const [dataProduct, setDataProduct] = useState<dataProduct | null>(null)
  const searchData = async (product: string) => {
    try {
      const response = await fetch('/api/getDataDownload', {
        method: 'POST',
        body: product
      })
      console.log(response)
      const { data } = await response.json()
      console.log(data)
      setDataProduct(data)
    } catch (error) {
      console.log(error)
    }
  }

  const searchParams = useSearchParams()
  const productSearch = searchParams.get('q')

  useEffect(() => {
    (async () => {
      await searchData(productSearch as string)
    })()
  }, [productSearch])

  return (
    <main className='min-h-screen bg-blue-950'>
      <ul>
        {dataProduct?.names.map((name, index) => (
          <li key={index}>{name}</li>
        ))}
      </ul>
    </main>
  )
}
