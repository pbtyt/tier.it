import { axiosWithAuth } from '@/shared/interceptors';
import {
	EpisodeFormStateType,
	EpisodeUpdateType,
	IEpisodeResponse,
} from '../model/types';

class EpisodesService {
	private BASE_ROOT = '/card/episodes';

	async getEpisodes(cardId: string, fields?: string, filter?: string) {
		//TODO:
		const encodedFilter = encodeURIComponent(filter || '');
		const response = await axiosWithAuth.get<IEpisodeResponse[]>(
			`${this.BASE_ROOT}/${cardId}/all?fields=${fields}&filter=${encodedFilter}`,
		);

		return response;
	}

	async createEpisode(cardId: string, data: EpisodeFormStateType) {
		const response = await axiosWithAuth.post<IEpisodeResponse>(
			`${this.BASE_ROOT}/${cardId}`,
			data,
		);
		return response;
	}

	async updateEpisode(id: string, data: EpisodeUpdateType) {
		const response = await axiosWithAuth.put<IEpisodeResponse>(
			`${this.BASE_ROOT}/${id}`,
			data,
		);
		return response;
	}

	async deleteEpisode(id: string) {
		const response = await axiosWithAuth.delete<IEpisodeResponse>(
			`${this.BASE_ROOT}/${id}`,
		);
		return response;
	}
}

export const episodesService = new EpisodesService();
