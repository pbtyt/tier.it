import { useDeleteCard } from '@/entities/card/hooks/useDeleteCard';
import { useModal } from '@/shared/hooks/useModal';
import { ConfirmPopup } from '@/shared/ui/Modal';
import clsx from 'clsx';
import { Trash2 } from 'lucide-react';
import { useCallback } from 'react';
import styles from './DeleteCardButton.module.scss';

interface IDeleteCardButtonProps {
	cardId: string;
	className?: string;
}
export function DeleteCardButton({
	cardId,
	className,
}: IDeleteCardButtonProps) {
	const { showModal } = useModal();

	const { deleteCard } = useDeleteCard();

	const handleOnDelete = useCallback(() => {
		deleteCard(cardId);
	}, []);

	return (
		<button
			className={clsx(styles.trashButton, className)}
			onClick={() => {
				showModal(<ConfirmPopup onConfirm={handleOnDelete} />);
			}}
		>
			<Trash2 size={30} />
		</button>
	);
}
