import { IUser } from '@/entities/auth/model/types';
import { ICardResponse } from '@/entities/card';
import { PickFields } from '@/shared/utils/utilTypes';

export interface IUserResponse {
	id: string;
	avatarUrl?: string;
	email: string;
	name: string;
}
export type UserFormType = Partial<Omit<IUser, 'id'> & { password?: string }>;

export interface IUserStatisticsResponse {
	statistic: {
		featured: {
			label: string;
			value: number;
		}[];
		topCards: PickFields<
			ICardResponse,
			'id,title,bannerUrl,posterUrl,episodesNumber,totalCardRating,episodes:totalEpisodeRating'
		>[];
	};
}
