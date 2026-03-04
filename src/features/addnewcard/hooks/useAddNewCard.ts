import type { CardStatusType, CardTypeType } from '@/entities/card';
import { useCreateCard } from '@/entities/card/hooks/useCreateCard';
import { useForm } from '@/shared/hooks/useForm';

export function useAddNewCard() {
	const { createCard, createCardWithPoster } = useCreateCard();

	const { values, handleChange, setFieldValue, reset } = useForm({
		title: '',
		desc: '',
		status: 'ONGOING' as CardStatusType,
		type: 'TV' as CardTypeType,
		posterFile: null as File | null,
	});

	const onTypeSelect = (ddId: string, preview: string, data: CardTypeType) => {
		setFieldValue('type', data);
	};

	const onStatusSelect = (
		ddId: string,
		preview: string,
		data: CardStatusType,
	) => {
		setFieldValue('status', data);
	};

	const handleSetPoster = (
		fileOrUpdater: File | null | ((prev: File | null) => File | null),
	) => {
		setFieldValue('posterFile', fileOrUpdater);
	};

	const handleOnSave = () => {
		if (!values.title) {
			alert("Поле 'Название' пустое");
			return;
		}

		if (!values.posterFile) {
			console.log('default CreateCard');

			createCard({
				title: values.title,
				episodesNumber: 0,
				status: values.status,
				type: values.type,
				criteria: [],
			});
			return;
		}

		console.log('with poster CreateCard');
		createCardWithPoster({
			title: values.title,
			episodesNumber: 0,
			status: values.status,
			type: values.type,
			criteria: [],
			file: values.posterFile,
		});
	};

	return {
		values,
		handleSetPoster,
		handleChange,
		onTypeSelect,
		onStatusSelect,
		handleOnSave,
	};
}
