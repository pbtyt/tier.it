import { SITE_ROUTES_BASE } from '@/shared/config/page-url.config';
import clsx from 'clsx';
import { Edit } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';
import styles from './EditCardButton.module.scss';

interface IEditCardButtonProps {
	cardId: string;
	className?: string;
}
export function EditCardButton({ cardId, className }: IEditCardButtonProps) {
	const { push } = useRouter();

	const handleOnEdit = useCallback(() => {
		push(`${SITE_ROUTES_BASE.EDIT_CARD}/${cardId}`);
	}, []);
	return (
		<button
			className={clsx(styles.editButton, className)}
			onClick={handleOnEdit}
		>
			<Edit size={30} />
		</button>
	);
}
