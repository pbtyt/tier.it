import Cookies from 'js-cookie';
import { EnumTokens } from '../model/types';

export const getAccessToken = () => {
	const accessToken = Cookies.get(EnumTokens.ACCESS_TOKEN);
	return accessToken || null;
};

export const saveTokenStorage = (accessToken: string) => {
	const isProd = process.env.NODE_ENV === 'production';
	Cookies.set(EnumTokens.ACCESS_TOKEN, accessToken, {
		domain: isProd ? '.myapp.com' : 'localhost',
		secure: isProd,
		sameSite: isProd ? 'lax' : 'strict',
		expires: 1,
	});
};

export const removeFromStorage = () => {
	Cookies.remove(EnumTokens.ACCESS_TOKEN);
};
