import { axiosWithAuth } from '@/shared/interceptors';
import {
	FranchiseFormStateType,
	FranchiseReleaseFormStateType,
	IFranchiseReleaseResponse,
	IFranchiseResponse,
} from '../model/types';

class FranchiseService {
	private readonly BASE_ROOT = '/franchise';
	private readonly BASE_ROOT_RELEASE = `${this.BASE_ROOT}/release`;

	async getAllByFranchiseIdFranchiseRelease(franchiseId: string) {
		const response = await axiosWithAuth.get<IFranchiseReleaseResponse[]>(
			`${this.BASE_ROOT_RELEASE}/${franchiseId}`,
		);

		return response;
	}

	async getByCardIdFranchiseRelease(cardId: string) {
		const response = await axiosWithAuth.get<IFranchiseReleaseResponse>(
			`${this.BASE_ROOT_RELEASE}/card/${cardId}`,
		);

		return response;
	}

	async createFranchiseRelease(data: FranchiseReleaseFormStateType) {
		const response = await axiosWithAuth.post<IFranchiseReleaseResponse>(
			this.BASE_ROOT_RELEASE,
			data,
		);

		return response;
	}

	async getAllFranchise() {
		const response = await axiosWithAuth.get<IFranchiseResponse[]>(
			this.BASE_ROOT,
		);

		return response;
	}

	async getByIdFranchise(id: string) {
		const response = await axiosWithAuth.get<IFranchiseResponse>(
			`${this.BASE_ROOT}/${id}`,
		);

		return response;
	}

	async getByCardIdFranchise(cardId: string) {
		const response = await axiosWithAuth.get<IFranchiseResponse>(
			`${this.BASE_ROOT}/card/${cardId}`,
		);

		return response;
	}

	async createFranchise(data: FranchiseFormStateType) {
		const response = await axiosWithAuth.post<IFranchiseReleaseResponse>(
			this.BASE_ROOT,
			data,
		);

		return response;
	}
}

export const franchiseService = new FranchiseService();
