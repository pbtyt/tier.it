'use client';

import { Input } from '@/shared/ui/Input';
import { useCallback, useState } from 'react';
import { useEditingCriteriaContext } from '../../../model/contexts/EditingCriteriaContext';

import { Plus } from 'lucide-react';
import styles from './CriteriaForm.module.scss';

export interface CriteriaFormProps {
	disabled?: boolean;
}

export const CriteriaForm = ({ disabled }: CriteriaFormProps) => {
	const { setCriteria } = useEditingCriteriaContext();
	const [criteriaTitle, setCriteriaTitle] = useState('');
	const [criteriaWeight, setCriteriaWeight] = useState('0');

	const handleCriteriaAdd = useCallback(
		(e: React.FormEvent) => {
			e.preventDefault();

			const newCriterion = {
				id: String(Date.now()), //TODO: FIX
				title: criteriaTitle,
				weight: parseInt(criteriaWeight),
			};

			setCriteria(prev => [newCriterion, ...prev]);

			setCriteriaTitle('');
			setCriteriaWeight('');
		},
		[criteriaTitle, criteriaWeight, setCriteria],
	);

	return (
		<form onSubmit={handleCriteriaAdd} className={styles.criteriaForm}>
			<Input
				placeholder='Название критерия'
				className={styles.criteriaTitle}
				value={criteriaTitle}
				onChange={e => setCriteriaTitle(e.target.value)}
				disabled={disabled}
			/>
			<Input
				type='number'
				min={0}
				max={100}
				className={styles.criteriaWeight}
				value={criteriaWeight}
				onChange={e => setCriteriaWeight(e.target.value)}
				disabled={disabled}
			/>

			<button
				type='submit'
				className={styles.addButton}
				onClick={handleCriteriaAdd}
				aria-label='Добавить критерий'
			>
				<Plus size={36} />
			</button>
		</form>
	);
};

// <div className={styles.criteriaForm}>

{
	/* <button
	className={styles.addButton}
	onClick={handleAddButtonClick}
	aria-label='Добавить критерий'
>
	<Plus size={36} />
</button>; */
}
// </div>
