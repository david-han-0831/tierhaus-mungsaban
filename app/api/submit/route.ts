import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const NOTION_SECRET = process.env.NOTION_SECRET
  const NOTION_DATABASE_ID = process.env.NOTION_DATABASE_ID

  console.log('로그 찍는다 ')
  console.log('🧪 NOTION_DATABASE_ID:', NOTION_DATABASE_ID)
  console.log('🧪 typeof ID:', typeof NOTION_DATABASE_ID)
  console.log('--------------------------------')
  if (!NOTION_SECRET || !NOTION_DATABASE_ID) {
    return NextResponse.json({ ok: false, message: '❌ Notion 환경변수 누락' }, { status: 500 })
  }

  let data
  try {
    data = await req.json()
  } catch {
    return NextResponse.json({ ok: false, message: '❌ 잘못된 JSON' }, { status: 400 })
  }

  const { customerInfo, products, totalProductPrice, shippingFee, totalPrice, timestamp } = data
  const { name, depositor, phone, address, message } = customerInfo || {}

  if (!name || !depositor || !phone || !address) {
    return NextResponse.json({ ok: false, message: '❌ 필수 정보 누락' }, { status: 400 })
  }

  try {
    for (let i = 0; i < products.length; i++) {
      const product = products[i]
      const isFirst = i === 0

      const properties: any = {
        '신청일시': {
          date: { start: timestamp || new Date().toISOString() },
        },
        '성함': {
            title: [{ text: { content: name } }],
        },
        '입금자명': {
            rich_text: [{ text: { content: depositor } }],
        },
        '연락처': {
            phone_number: phone,
        },
        '주소': {
            rich_text: [{ text: { content: address } }],
        },
        '배송메시지': {
            rich_text: [{ text: { content: message || '' } }],
        },
        '상품명': {
          rich_text: [{ text: { content: product.name } }],
        },
        '수량': { number: product.quantity },
        '단가': { number: product.groupPrice },
        '소계': { number: product.groupPrice * product.quantity },
      }

      // 첫 번째 상품에만 결제 요약 포함
      if (isFirst) {
        properties['상품총액'] = { number: totalProductPrice }
        properties['배송비'] = { number: shippingFee }
        properties['총결제금액'] = { number: totalPrice }
      }

      const notionRes = await fetch('https://api.notion.com/v1/pages', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${NOTION_SECRET}`,
          'Notion-Version': '2022-06-28',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          parent: {
            database_id: NOTION_DATABASE_ID,
          },
          properties,
        }),
      })

      if (!notionRes.ok) {
        const errorText = await notionRes.text()
        return NextResponse.json({ ok: false, message: errorText }, { status: 500 })
      }
    }

    return NextResponse.json({ ok: true })
  } catch (err: any) {
    return NextResponse.json({ ok: false, message: `❌ 서버 오류: ${err.message}` }, { status: 500 })
  }
}
