import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      id: 'credentials',

      // passando oq se deve usar para validar
      credentials: {
        email: {
          label: 'email',
          type: 'email',
          placeholder: 'email@exemple.com',
        },
        password: { label: 'Password', type: 'password' },
      },

      // funcao q valida o login
      async authorize(credentials, req) {
        const response = await fetch('http://localhost:3001/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: credentials?.email,
            password: credentials?.password,
          }),
        });

        // se a resposta nao estiver ok retorna nulo
        if (!response.ok) {
          return null;
        }

        // converte a resposta em json e salva numa variavel
        const user = await response.json();

        return {
          id: user.id,
          email: user.email,
          username: user.username,
          accessToken: user.accessToken,
        };
      },
    }),
  ],

  callbacks: {
    // executado quando cria um jwt ou atualiza ele
    //@ts-ignore
    async jwt({ token, user }) {
      if (user) {
        // copia o acesstoken pra dentro do token jwt dentro do nextauth
        token.accessToken = user.accessToken;
        token.id = user.id;
        token.username = user.username;
      }

      // retorna o token q vai ser criptografado no cookie
      return token;
    },

    // executado quando vc usa getSession() ou useSession()
    //@ts-ignore
    async session({ session, token }) {
      session.accessToken = token.accessToken;
      session.id = token.id;
      session.username = token.username;

      // oque o useSession vai receber
      return session;
    },
  },

  session: {
    strategy: 'jwt',
  },
};

//@ts-ignore
const handler = NextAuth(authOptions)

export { handler as GET, handler as POST };
