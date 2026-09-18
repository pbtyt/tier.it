import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
	const cookieStore = await cookies();

	const backendResponse = await fetch(
		`${process.env.NEXT_PUBLIC_API_URL}/api/auth/login/access-token`,
		{
			method: 'POST',
			headers: {
				cookie: cookieStore.toString(),
			},
		},
	);

	const data = await backendResponse.json();
	const response = NextResponse.json(data, { status: backendResponse.status });

	for (const cookie of backendResponse.headers.getSetCookie()) {
		response.headers.append('set-cookie', cookie);
	}

	return response;
}
