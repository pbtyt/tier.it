import { IUser } from '@/entities/auth/model/types';

export interface IUserResponse {
	id: string;
	avatarUrl?: string;
	email: string;
	name: string;
}
export type UserFormType = Omit<IUser, 'id'> & { password?: string };
