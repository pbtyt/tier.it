import type { CardStatusType, CardTypeType } from '@/entities/card';
import { useCreateCard } from '@/entities/card/hooks/useCreateCard';
import { type CardWithPosterFormStateType } from '@/entities/card/model/types';
import { SubmitHandler, useForm } from 'react-hook-form';

export function useAddNewCard() {
	const { createCard } = useCreateCard();

	const { register, handleSubmit, setValue, watch } =
		useForm<CardWithPosterFormStateType>({
			defaultValues: {
				title: '',
				episodesNumber: 0,
				status: 'ONGOING',
				type: 'TV',
				posterFile: null,
				bannerFile: null,
			},
		});

	const onTypeSelect = (ddId: string, preview: string, data: CardTypeType) => {
		setValue('type', data, { shouldValidate: true });
	};

	const onStatusSelect = (
		ddId: string,
		preview: string,
		data: CardStatusType,
	) => {
		setValue('status', data, { shouldValidate: true });
	};

	const handleSetPoster = (
		fileOrUpdater: File | null | ((prev: File | null) => File | null),
	) => {
		if (typeof fileOrUpdater === 'function') {
			setValue('posterFile', fileOrUpdater(watch('posterFile')), {
				shouldValidate: true,
			});
		} else {
			setValue('posterFile', fileOrUpdater, { shouldValidate: true });
		}
	};

	const handleSetBanner = (
		fileOrUpdater: File | null | ((prev: File | null) => File | null),
	) => {
		if (typeof fileOrUpdater === 'function') {
			setValue('bannerFile', fileOrUpdater(watch('bannerFile')), {
				shouldValidate: true,
			});
		} else {
			setValue('bannerFile', fileOrUpdater, { shouldValidate: true });
		}
	};

	const onSubmit: SubmitHandler<CardWithPosterFormStateType> = (
		data: CardWithPosterFormStateType,
	) => {
		createCard(data);
	};

	return {
		handleSetPoster,
		handleSetBanner,
		onTypeSelect,
		onStatusSelect,
		handleSubmit,
		onSubmit,
		register,
	};
}
