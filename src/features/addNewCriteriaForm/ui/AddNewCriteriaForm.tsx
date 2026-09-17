'use client';

import { CriteriaFormStateType } from '@/entities/criteria';
import { useCreateCriteria } from '@/entities/criteria/hooks/useCreateCriteria';
import { Button } from '@/shared/ui/Button';
import { Field } from '@/shared/ui/Field';
import { Plus } from 'lucide-react';
import { SubmitHandler, useForm } from 'react-hook-form';
import styles from './AddNewCriteriaForm.module.scss';

interface IAddNewCriteriaForm {
	cardId: string;
}

export function AddNewCriteriaForm({ cardId }: IAddNewCriteriaForm) {
	const {
		register,
		handleSubmit,
		reset,
		formState: { isValid },
	} = useForm<CriteriaFormStateType>({ mode: 'onChange' });

	const { createCriteria } = useCreateCriteria({
		onSuccess() {
			reset();
		},
	});

	const onSubmit: SubmitHandler<CriteriaFormStateType> = data => {
		createCriteria({ cardId: cardId, data: data });
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)} className={styles.addCriteriaForm}>
			<Field
				className={styles.criteriaTitleField}
				id='criteria-title'
				placeholder='Название критерия: '
				label=''
				{...register('title')}
			/>
			<Field
				className={styles.criteriaWeightField}
				id='criteria-weight'
				placeholder='Вес критерия (ценность): '
				label=''
				{...register('weight', { valueAsNumber: true })}
			/>
			<Button buttonColor='transparent' disabled={!isValid}>
				<Plus />
			</Button>
		</form>
	);
}
