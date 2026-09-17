import { NextResponse } from 'next/server';

export async function POST(request: Request) {
	const backendResponse = await fetch(
		`${process.env.NEXT_PUBLIC_API_URL}/api/auth/logout`,
		{
			method: 'POST',
		},
	);

	const data = await backendResponse.text();
	const setCookie = backendResponse.headers.get('set-cookie');
	const isLoggedOut = data === 'true';

	const response = NextResponse.json(
		{ success: isLoggedOut },
		{ status: backendResponse.status },
	);

	if (setCookie) {
		response.headers.set('set-cookie', setCookie);
	}

	return response;
}
