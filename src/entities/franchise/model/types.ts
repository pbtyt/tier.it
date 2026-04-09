import { ICardResponse } from '@/entities/card';

export interface IFranchiseReleaseResponse {
	id: string;

	order: number;
	releaseId: string;
	franchiseId: string;

	release: ICardResponse;
}

export interface IFranchiseResponse {
	id: string;

	createdAt: string;
	updatedAt: string;

	title: string;
	posterUrl?: string;
	bannerUrl?: string;
	totalRating: number;
	franchiseReleases: IFranchiseReleaseResponse[];
}

export type FranchiseReleaseFormStateType = Partial<
	Pick<IFranchiseReleaseResponse, 'releaseId' | 'franchiseId' | 'order'>
>;

export type FranchiseFormStateType = Partial<
	Pick<IFranchiseResponse, 'title' | 'posterUrl' | 'bannerUrl' | 'totalRating'>
>;
