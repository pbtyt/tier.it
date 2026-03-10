import { axiosWithAuth } from '@/entities/auth';
import { type IUserResponse, type UserFormType } from '../model/types';

class UserService {
	private BASE_URL = '/user/profile';

	async getProfile(fields?: string) {
		const response = await axiosWithAuth.get<IUserResponse>(
			`${this.BASE_URL}?fields=${fields}`,
		);
		return response.data;
	}

	async update(data: UserFormType) {
		const response = await axiosWithAuth.put(this.BASE_URL, data);
		return response.data;
	}
}

export const userService = new UserService();
