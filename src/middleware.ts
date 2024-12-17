import {NextResponse} from 'next/server'

export const middleware = (request: Request): NextResponse => {
  // eslint-disable-next-line no-process-env
  if (process.env.NODE_ENV === 'production') {
    return NextResponse.next()
  }

  const url = new URL(request.url)
  if (url.pathname.startsWith('/api')) {
    return NextResponse.rewrite('http://localhost:3001' + url.pathname)
  }

  return NextResponse.next()
}
