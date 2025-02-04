import {NextResponse} from 'next/server'

export const middleware = (request: Request): NextResponse => {
  // eslint-disable-next-line no-process-env
  if (process.env.NODE_ENV === 'production') {
    return NextResponse.next()
  }

  const url = new URL(request.url)
  if (url.pathname.startsWith('/api')) {
    return NextResponse.rewrite('http://192.168.1.102:9000' + url.pathname)
  }

  return NextResponse.next()
}
