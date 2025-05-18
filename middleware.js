// middleware.js
import { NextResponse } from "next/server";

export function middleware(request) {
	const { pathname } = request.nextUrl;
	const sessionId = request.cookies.get("sessionId")?.value;

	// ✅ Skip middleware for login page (/Admin)
	if (pathname === "/Admin") {
		return NextResponse.next();
	}

	// 🔐 If no sessionId, redirect to login
	if (!sessionId) {
		return NextResponse.redirect(new URL("/Admin", request.url));
	}

	// ✅ Allow access
	return NextResponse.next();
}

export const config = {
	// Apply to all /Admin/* pages (but not /Admin exactly)
	matcher: ["/Admin/:path*"],
};
