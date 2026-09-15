'use client';

import { UploadPoster } from '@/features/uploadPoster';
import { Button } from '@/shared/ui/Button';
import { Input } from '@/shared/ui/Input';
import { useAddNewFranchise } from '../hooks/useAddNewFranchise';
import styles from './AddNewFranchise.module.scss';

export function AddNewFranchise() {
	const { register, handleSubmit, handleSetPoster, onSubmit } =
		useAddNewFranchise();

	return (
		<form onSubmit={handleSubmit(onSubmit)} className={styles.wrapper}>
			<h1 className={styles.title}>Франшиза</h1>
			<div className={styles.info}>
				<div className={styles.left}>
					<div className={styles.section}>
						<div className={styles.header}>
							<h4 className={styles.title}>Название</h4>
						</div>
						<Input required {...register('title')} />
					</div>
					<div className={styles.section}>
						<div className={styles.header}>
							<h4 className={styles.title}>Описание</h4>
						</div>
						<textarea
							// {...register('desc')}
							cols={70}
							rows={10}
							className={styles.textbox}
						/>
					</div>
				</div>

				<div className={styles.right}>
					<div className={styles.section}>
						<div className={styles.header}>
							<h4 className={styles.title}>Постер</h4>
						</div>
						<UploadPoster
							className={styles.posterLoader}
							previewClassName={styles.posterPreview}
							setFile={handleSetPoster}
						/>
					</div>
				</div>
			</div>

			<div className={styles.controls}>
				<Button
					buttonColor='gray'
					buttonText='Отмена'
					size='md'
					className={styles.control}
				/>
				<Button
					buttonColor='primary'
					buttonText='Далее'
					size='md'
					type='submit'
					className={styles.control}
				/>
			</div>
		</form>
	);
}
