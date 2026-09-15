//WARN: DEPRECATED
export type CriteriaType = {
	id: string;
	title: string;
	weight: number;
};

export interface ICriteriaResponse {
	id: string;
	createdAt: string;
	updatedAt: string;

	cardId: string;
	title: string;
	weight: number;
}

export type CriteriaFormStateType = Partial<
	Pick<ICriteriaResponse, 'title' | 'weight'>
>;
