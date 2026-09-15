import { type FranchiseWithPosterFormStateType } from '@/entities/franchise';
import { useCreateFranchise } from '@/entities/franchise/hooks/useCreateFranchise';
import { SubmitHandler, useForm } from 'react-hook-form';

export function useAddNewFranchise() {
	const {
		register,
		handleSubmit,
		control,
		setValue,
		watch,
		reset,
		formState: { errors },
	} = useForm<FranchiseWithPosterFormStateType>({
		defaultValues: {
			title: '',
			posterFile: null,
		},
	});

	const { createFranchise } = useCreateFranchise();

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

	const onSubmit: SubmitHandler<FranchiseWithPosterFormStateType> = (
		data: FranchiseWithPosterFormStateType,
	) => {
		createFranchise(data);
	};

	return {
		register,
		handleSubmit,
		handleSetPoster,
		onSubmit,
	};
}
