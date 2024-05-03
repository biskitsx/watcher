import NextAuth from 'next-auth/next';
import { authOptions } from './authOption';
  
const handler = NextAuth(authOptions)
  
export { handler as GET, handler as POST }