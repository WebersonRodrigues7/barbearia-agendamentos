import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
export async function GET(req: NextRequest) {
  try {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    
    const res = await fetch('http://localhost:3001/appointments', {
      headers: { Authorization: `Bearer ${token?.accessToken}` },
    });

    const data = await res.json();
    console.log("data: ", data)

    return Response.json(data);
  } catch (err) {
    return Response.json({error: "Erro ao carregar API"}, {status: 500})
  }
}

export async function POST( req: NextRequest ) {
  try {
    
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET})
    
    const body = await req.json()
    const res = await fetch('http://localhost:3001/appointments/', {
      method: 'POST',
      headers: {Authorization: `Bearer ${token?.accessToken}`, 'Content-Type': 'application/json'},
      body: JSON.stringify({
        ...body,
        userId: token?.id
      })
    })
    if(!res.ok){
      console.error("Erro ao carregar API.", res.status)
    }
    
    const data = await res.json()
    return Response.json(data)

  } catch(err) { 
      console.error("Erro ao criar agendamento.", {status: 500})
  }
}


