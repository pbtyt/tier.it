import { type CriteriaType } from '@/entities/criteria';
import { type IEpisodeResponse } from '@/entities/episode';
import { TypeFrom } from '@/shared/utils/utilTypes';

//NOTE: Using only in store
export type CardType = {
	id: number;
	title: string;
	posterUrl?: string;

	criteria: CriteriaType[];
};
interface IGenreResponse {
	id: number;
	createdAt: string;
	updatedAt: string;
	name: string;
}
export interface ICardResponse {
	id: string;

	createdAt: string;
	updatedAt: string;

	title: string;
	posterUrl?: string;
	bannerUrl?: string;
	status: CardStatusType;
	type: CardTypeType;
	episodesNumber: number;
	totalCardRating: number;

	criteria?: CriteriaType[];
	episodes?: IEpisodeResponse[];
	genres?: IGenreResponse[];
}

export type IPosterUploadResponse = {
	id: number;
	filename: string;
	path: string;
};

export const Type = {
	TV: 'TV',
	FILM: 'FILM',
} as const;
export type CardTypeType = TypeFrom<typeof Type>;

export const Status = {
	ONGOING: 'ONGOING',
	FINISHED: 'FINISHED',
} as const;
export type CardStatusType = TypeFrom<typeof Status>;

export type CardFormStateType = Partial<
	Omit<ICardResponse, 'id' | 'updatedAt' | 'createdAt'>
>;
