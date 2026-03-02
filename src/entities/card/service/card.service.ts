import { axiosWithAuth } from '@/shared/interceptors';
import {
	CardFormStateType,
	ICardResponse,
	IPosterUploadResponse,
} from '../model/types';

class CardService {
	private BASE_ROOT = '/card';

	async getCardById(id: string, fields?: string) {
		const response = await axiosWithAuth.get<ICardResponse>(
			`${this.BASE_ROOT}/${id}?fields=${fields}`,
		);

		return response;
	}

	async getCards(fields?: string) {
		const response = await axiosWithAuth.get<ICardResponse[]>(
			`${this.BASE_ROOT}?fields=${fields}`,
		);

		return response;
	}

	async createCard(data: CardFormStateType) {
		const response = await axiosWithAuth.post<ICardResponse>(
			this.BASE_ROOT,
			data,
		);
		return response;
	}

	async updateCard(id: string, data: CardFormStateType) {
		const response = await axiosWithAuth.put<ICardResponse>(
			`${this.BASE_ROOT}/${id}`,
			data,
		);
		return response;
	}

	async deleteCard(id: string) {
		const response = await axiosWithAuth.delete<ICardResponse>(
			`${this.BASE_ROOT}/${id}`,
		);
		return response;
	}

	async uploadPoster(id: string, data: FormData) {
		const posterURL = `/card/${id}/poster`;

		const response = await axiosWithAuth.post<IPosterUploadResponse>(
			posterURL,
			data,
			{
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			},
		);
	}
}

export const cardService = new CardService();
