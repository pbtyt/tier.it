'use client';

import { CardStatusType, CardTypeType } from '@/entities/card';
import { Button } from '@/shared/ui/Button';
import { DropDown } from '@/shared/ui/DropDown';
import { Input } from '@/shared/ui/Input';
import { Dispatch, memo, SetStateAction, useCallback } from 'react';
import { useAddNewCardContext } from '../../model/contexts/AddNewCardContext';
import styles from './AddCardStep.module.scss';

interface IAddCardStep {
	setNewStep: Dispatch<SetStateAction<number>>;
}

export const AddCardStep = memo(function AddCardStep({
	setNewStep,
}: IAddCardStep) {
	const { title, setTitle, setCardType, setCardStatus } =
		useAddNewCardContext();

	const onTypeSelect = (ddId: string, preview: string, data: CardTypeType) => {
		setCardType(data);

		console.log(`Card Type Update: ${data}`);
	};
	const onStatusSelect = (
		ddId: string,
		preview: string,
		data: CardStatusType,
	) => {
		setCardStatus(data);

		console.log(`Card Status Update: ${data}`);
	};

	const isNextStepDisabled = title.trim().length === 0;
	const handleNextStepClick = useCallback(() => {
		if (isNextStepDisabled) return;

		setNewStep(2);
	}, [title]);

	return (
		<>
			<section className={styles.section}>
				<h3 className={styles.sectionTitle}>Информация о тайтле</h3>

				<h4 className={styles.sectionSubTitle}>Название</h4>
				<Input
					placeholder='Оригинальное название'
					value={title}
					onChange={e => {
						setTitle(e.target.value);
						console.log(e.target.value);
					}}
				/>

				<h4 className={styles.sectionSubTitle}>Сведения</h4>

				<div className={styles.metadataWrapper}>
					{/* Тип */}
					<DropDown<CardTypeType>
						initialPreview='TV'
						initialData={'TV'}
						onSelect={onTypeSelect}
						menuTopOffset={5}
					>
						<DropDown.Item<CardTypeType>
							preview='TV'
							data={'TV'}
							ddId='ddid-tv'
						>
							TV
						</DropDown.Item>
						<DropDown.Item<CardTypeType>
							preview='Фильм'
							data={'FILM'}
							ddId='ddid-film'
						>
							Фильм
						</DropDown.Item>
					</DropDown>

					{/* Статус тайтла */}
					<DropDown<CardStatusType>
						initialPreview='Онгоинг'
						initialData={'ONGOING'}
						onSelect={onStatusSelect}
						menuTopOffset={5}
					>
						<DropDown.Item<CardStatusType>
							preview='Онгоинг'
							data={'ONGOING'}
							ddId='ddid-ongoing'
						>
							Онгоинг
						</DropDown.Item>
						<DropDown.Item<CardStatusType>
							preview='Завершен'
							data={'FINISHED'}
							ddId='ddid-complete'
						>
							Завершен
						</DropDown.Item>
					</DropDown>

					{/* Год Релиза */}
				</div>
			</section>

			<div className={styles.buttonsWrapper}>
				<Button
					buttonText='Далее'
					buttonColor='primary'
					className={styles.button}
					onClick={handleNextStepClick}
					disabled={isNextStepDisabled}
				/>
			</div>
		</>
	);
});
