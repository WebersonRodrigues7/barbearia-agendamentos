import NextAuth from "next-auth"
import { JWT } from "next-auth/jwt"

declare module "next-auth" {
  interface Session {
    accessToken: string
    id: string
    user: {
      id: string
      name?: string | null
      email?: string | null
      image?: string | null
    }
  }

  interface User {
    accessToken: string
    access_token: string
    id: string
}
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken: string
    id: string
  }
}