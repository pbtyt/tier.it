'use client';

import { CardStatusType, CardTypeType } from '@/entities/card';
import { UploadPoster } from '@/features/uploadPoster';
import { Button } from '@/shared/ui/Button';
import { DropDown } from '@/shared/ui/DropDown';
import { Input } from '@/shared/ui/Input';
import clsx from 'clsx';
import { useAddNewCard } from '../hooks/useAddNewCard';
import styles from './AddNewCard.module.scss';

export function AddNewCard() {
	const {
		values,
		handleChange,
		handleSetBanner,
		handleSetPoster,
		onTypeSelect,
		onStatusSelect,
		handleOnSave,
	} = useAddNewCard();

	return (
		<div className={styles.wrapper}>
			<section className={clsx(styles.primaryInfoWrapper, styles.sectionBlock)}>
				<div className={styles.section}>
					<div className={styles.header}>
						<h4>Название</h4>
					</div>
					<Input
						name='title'
						required
						value={values.title}
						onChange={handleChange}
					/>
				</div>

				<div className={styles.section}>
					<div className={styles.header}>
						<h4>Описание</h4>
					</div>
					<textarea cols={70} rows={10} className={styles.textbox} />
				</div>

				<div className={styles.section}>
					<div className={styles.header}>
						<h4>Жанры</h4>
					</div>
					<Input />
				</div>
			</section>

			<section
				className={clsx(styles.secondaryInfoWrapper, styles.sectionBlock)}
			>
				<div
					style={{
						display: 'flex',
						gap: '2rem',
						alignItems: 'flex-start',
					}}
				>
					<div className={styles.section}>
						<div className={styles.header}>
							<h4>Тип</h4>
						</div>
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
					</div>

					<div className={styles.section}>
						<div className={styles.header}>
							<h4>Статус</h4>
						</div>
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
					</div>
				</div>

				<div className={styles.section}>
					<div className={styles.header}>
						<h4>Год выпуска</h4>
					</div>
					<Input />
				</div>

				<div className={styles.section}>
					<div className={styles.header}>
						<h4>Автор</h4>
					</div>
					<Input />
				</div>

				<div className={styles.section}>
					<div className={styles.header}>
						<h4>Альтернативные названия</h4>
					</div>
					<Input />
				</div>
			</section>

			<section className={styles.posterWrapper}>
				<div
					className={styles.sectionBlock}
					style={{ display: 'flex', flexDirection: 'row', gap: '1rem' }}
				>
					<div className={styles.section}>
						<div className={styles.header}>
							<h4>Постер</h4>
						</div>
						<UploadPoster
							setFile={handleSetPoster}
							className={styles.uploadPoster}
						/>
					</div>
					<div className={styles.section}>
						<div className={styles.header}>
							<h4>Баннер</h4>
						</div>
						<UploadPoster
							setFile={handleSetBanner}
							className={styles.uploadPoster}
						/>
					</div>
				</div>
			</section>

			<Button
				buttonColor='primary'
				buttonText='Save'
				size='md'
				onClick={handleOnSave}
			/>
		</div>
	);
}
