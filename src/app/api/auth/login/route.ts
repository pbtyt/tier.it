import { NextResponse } from 'next/server';

export async function POST(request: Request) {
	const body = await request.json();

	const backendResponse = await fetch(
		`${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`,
		{
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(body),
		},
	);

	const data = await backendResponse.json();
	const setCookie = backendResponse.headers.get('set-cookie');

	const response = NextResponse.json(data);

	if (setCookie) {
		response.headers.set('set-cookie', setCookie);
	}

	return response;
}
