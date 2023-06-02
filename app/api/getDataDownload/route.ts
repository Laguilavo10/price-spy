import { NextResponse } from 'next/server'
import { chromium } from 'playwright'

export async function POST(req: Request, res: Response) {
  const productSearch = await req.text()
  console.log(productSearch)

  const browser = await chromium.launch({ headless: true })
  const page = await browser.newPage()
  const pageToVisit = `https://www.google.com/search?q=${productSearch}&tbm=shop`
  await page.goto(pageToVisit)
  console.log('here')

  try {
    let prices = await page.$$('.a8Pemb')
    prices = prices.slice(0, 5)
    const arrayPrices = await Promise.all(
      prices.map(async (price) => await price.textContent())
    )
    console.log(arrayPrices)

    let names = await page.$$('.IuHnof')
    names = names.slice(0, 5)
    const arrayNames = await Promise.all(
      names.map(async (name) => await name.innerText())
    )
    console.log(arrayNames)

    let links = await page.$$('span.shntl a.shntl:first-child')
    links = links.slice(0, 5)
    const arrayLinks = await Promise.all(
      links.map(
        async (link) => `https://google.com${await link.getAttribute('href') as string}`
      )
    )
    const dataProduct = {
      names: arrayNames,
      prices: arrayPrices,
      links: arrayLinks
    }
    return NextResponse.json({ data: dataProduct })
  } catch (error) {
    console.log(error)
    return NextResponse.json({ html: 'hola' })
  }
}
