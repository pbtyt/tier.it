import { CardStatusType, CardTypeType, Status, Type } from './model/types';

export type {
	CardFormStateType,
	CardStatusType,
	CardTypeType,
	ICardResponse,
} from './model/types';

export const CARD_CONST_LABELS: Record<CardTypeType | CardStatusType, string> =
	{
		[Type.TV]: 'ТВ',
		[Type.FILM]: 'Фильм',
		[Status.FINISHED]: 'Завершен',
		[Status.ONGOING]: 'Выходит',
	};

export { useCardStore } from './store/card.store';
export { Card } from './ui/Card';
