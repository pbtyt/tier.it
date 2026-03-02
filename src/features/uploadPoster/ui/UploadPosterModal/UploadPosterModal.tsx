'use client';

import { useModal } from '@/shared/hooks/useModal';
import { Button } from '@/shared/ui/Button';
import { Image } from '@/shared/ui/Image';
import { Modal } from '@/shared/ui/Modal';
import styles from './UploadPosterModal.module.scss';

interface IUploadPosterModalProps {
	onClose?: () => void;
	onConfirm?: () => void;
	preview: string;
}

export function UploadPosterModal({
	onClose,
	onConfirm,
	preview,
}: IUploadPosterModalProps) {
	const { hideModal } = useModal();

	const handleOnClose = () => {
		onClose?.();
		hideModal();
	};

	const handleOnConfirm = () => {
		onConfirm?.();
		hideModal();
	};

	return (
		<Modal modalWidth='450px' className={styles.modalWrapper}>
			<Modal.Header title='Загрузка постера' />
			<Image
				src={preview}
				className={styles.posterPreview}
				alt='poster_preview'
			/>
			<div className={styles.buttonsWrapper}>
				<Button
					buttonColor='gray'
					buttonText='Отмена'
					onClick={handleOnClose}
				/>
				<Button
					type='submit'
					form='upload-poster'
					buttonColor='primary'
					buttonText='Загрузить'
					onClick={handleOnConfirm}
				/>
			</div>
		</Modal>
	);
}
