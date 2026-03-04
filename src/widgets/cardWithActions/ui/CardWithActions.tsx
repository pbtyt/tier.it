import { Card, ICardResponse } from '@/entities/card';
import { DeleteCardButton, EditCardButton } from '@/features/card';
import styles from './CardWithActions.module.scss';

interface ICardWithActionsProps {
	cardData: Pick<
		ICardResponse,
		'title' | 'posterUrl' | 'id' | 'totalCardRating'
	>;
}
export function CardWithActions({ cardData }: ICardWithActionsProps) {
	return (
		<div className={styles.wrapper}>
			<Card cardData={cardData} />
			<EditCardButton cardId={cardData.id} className={styles.editButton} />
			<DeleteCardButton cardId={cardData.id} className={styles.trashButton} />
		</div>
	);
}
