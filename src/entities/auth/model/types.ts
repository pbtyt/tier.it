export interface IAuthForm {
	email: string;
	password: string;
}

export interface IUser {
	id: string;
	name?: string;
	email: string;
}

export interface IAuthResponse {
	accessToken: string;
	user: IUser;
}

export enum EnumTokens {
	'ACCESS_TOKEN' = 'accessToken',
	'REFRESH_TOKEN' = 'refreshToken',
}

export interface ErrorResponse {
	statusCode: number;
	message: string | string[]; // массив при ошибках валидации ValidationPipe
	error: string;
}
