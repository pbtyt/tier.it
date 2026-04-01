'use client';

import { Image } from '@/shared/ui/Image';
import { SetStateType } from '@/shared/utils/utilTypes';
import clsx from 'clsx';
import { ImageUp } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useUploadPosterForm } from '../hooks/useUploadPosterForm';
import styles from './UploadPoster.module.scss';
import { UploadPosterModal } from './UploadPosterModal/UploadPosterModal';

// interface IUploadPosterProps {
// 	entityData: UploadPosterParams;
// 	description?: string;
// 	className?: string;
// }

// export function UploadPoster({
// 	entityData,
// 	description,
// 	className,
// }: IUploadPosterProps) {
// 	const {
// 		watchFileSelected,
// 		reset,
// 		handleSubmit,
// 		onSubmit,
// 		handleOnPosterSelect,
// 		rest,
// 		formRef,
// 		inputRef,
// 		showModal,
// 	} = useUploadPosterForm({ entityData: entityData });

// 	useEffect(() => {
// 		if (watchFileSelected) {
// 			const reader = new FileReader();
// 			reader.readAsDataURL(watchFileSelected);
// 			reader.onload = () => {
// 				showModal(
// 					<UploadPosterModal
// 						preview={reader.result as string}
// 						onClose={() => reset()}
// 					/>,
// 				);
// 			};
// 		}
// 	}, [watchFileSelected]);

// 	return (
// 		<form id='upload-poster' onSubmit={handleSubmit(onSubmit)}>
// 			<div
// 				className={clsx(styles.posterLoaderWrapper, className)}
// 				onClick={handleOnPosterSelect}
// 				role='button'
// 			>
// 				<input
// 					hidden
// 					id='image'
// 					type='file'
// 					accept='image/*'
// 					{...rest}
// 					ref={e => {
// 						formRef(e);
// 						inputRef.current = e;
// 					}}
// 				/>

// 				<ImageUp size={48} strokeWidth={1} />
// 				<span>
// 					{description ? description : 'Нажмите или перетащите изображение'}
// 				</span>
// 			</div>
// 		</form>
// 	);
// }

interface IUploadPosterProps {
	setFile: SetStateType<File | null>;
	description?: string;
	previewClassName?: string;
	className?: string;
}

export function UploadPoster({
	setFile,
	description,
	previewClassName,
	className,
}: IUploadPosterProps) {
	const [preview, setPreview] = useState<string>('');

	const {
		watchFileSelected,
		reset,
		handleSubmit,
		onSubmit,
		handleOnPosterSelect,
		rest,
		formRef,
		inputRef,
		showModal,
		handleConfirm,
	} = useUploadPosterForm({ setFile: setFile, setPreview: setPreview });

	useEffect(() => {
		if (watchFileSelected) {
			const reader = new FileReader();
			reader.readAsDataURL(watchFileSelected);
			reader.onload = () => {
				showModal(
					<UploadPosterModal
						preview={reader.result as string}
						onConfirm={handleConfirm}
						onClose={() => reset()}
					/>,
				);
			};
		}

		return () => {
			URL.revokeObjectURL(preview);
		};
	}, [watchFileSelected]);

	return preview ? (
		<Image src={preview} className={clsx(styles.poster, previewClassName)} />
	) : (
		<form id='upload-poster' onSubmit={handleSubmit(onSubmit)}>
			<div
				className={clsx(styles.posterLoaderWrapper, className)}
				onClick={handleOnPosterSelect}
				role='button'
			>
				<input
					hidden
					id='image'
					type='file'
					accept='image/*'
					{...rest}
					ref={e => {
						formRef(e);
						inputRef.current = e;
					}}
				/>

				<ImageUp size={48} strokeWidth={1} />
				<span>
					{description ? description : 'Нажмите или перетащите изображение'}
				</span>
			</div>
		</form>
	);
}
