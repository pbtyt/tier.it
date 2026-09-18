import { NextResponse } from 'next/server';

export async function POST(request: Request) {
	const backendResponse = await fetch(
		`${process.env.NEXT_PUBLIC_API_URL}/api/auth/login/access-token`,
		{
			method: 'POST',
		},
	);

	const data = await backendResponse.json();
	const setCookie = backendResponse.headers.get('set-cookie');

	const response = NextResponse.json(data, { status: backendResponse.status });

	if (setCookie) {
		response.headers.set('set-cookie', setCookie);
	}

	return response;
}
