import { getToken } from "next-auth/jwt";
import { IncomingMessage } from "http";
import { getSession } from "next-auth/react";
import { DEFAULT_LOGIN_REDIRECT, authRoutes, privateRoutes, publicRoutes } from "./route";
import { NextRequest } from "next/server";

export async function middleware(request:  NextRequest) {
    const user = await getToken({
        req: request,
        secret: process.env.JWT_SECRET,
    });

    const { nextUrl } = request;
    const { pathname } = nextUrl

    // const isPublicRoute = publicRoutes.includes(pathname)
    const isPrivateRoute = privateRoutes.includes(pathname)
    const isAuthRoute = authRoutes.includes(pathname)
    
    if (isAuthRoute) {
        if (user) {
            return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl))
        }
    }
    
    if (isPrivateRoute && !user) {
        return Response.redirect(new URL("auth/login", nextUrl))
    }

    return;
}