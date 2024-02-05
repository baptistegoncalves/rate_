// middleware.ts ou un fichier spécifique dans votre dossier de middleware
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken'; // Assurez-vous d'installer et d'importer une bibliothèque de gestion JWT

export async function middleware(req: NextRequest) {
  const token = req.cookies.get('jwt')?.toString();

  try {
    if (token) {
      jwt.verify(token, process.env.JWT_SECRET ?? '');
      // Le JWT est valide, vous pouvez continuer la requête
      return NextResponse.next();
    }
  } catch (error) {
    // Le JWT est invalide ou absent, redirigez l'utilisateur vers la page de connexion ou retournez une erreur
    return NextResponse.redirect(new URL('/login', req.url));
  }

  // Pour les routes qui ne nécessitent pas d'authentification, vous pouvez simplement retourner NextResponse.next()
  return NextResponse.next();
}
