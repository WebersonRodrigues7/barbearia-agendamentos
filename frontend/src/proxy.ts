import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

export async function proxy(req: NextRequest) {
  const user = await getToken({req})
  if (!user) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  return NextResponse.next();
  
}

export const config = { matcher: ['/landing/:path*', '/agendamentos/:path*'] };
