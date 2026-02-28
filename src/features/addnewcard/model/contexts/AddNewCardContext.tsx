import { CardStatusType, CardTypeType } from '@/entities/card';
import { SetStateType } from '@/shared/utils/utilTypes';
import { createContext, useContext, useMemo, useState } from 'react';

type AddNewCardContextType = {
	title: string;
	setTitle: SetStateType<string>;
	cardStatus: CardStatusType;
	setCardStatus: SetStateType<CardStatusType>;
	cardType: CardTypeType;
	setCardType: SetStateType<CardTypeType>;
};

export const AddNewCardContext = createContext<
	AddNewCardContextType | undefined
>(undefined);

export const useAddNewCardContext = () => {
	const context = useContext(AddNewCardContext);
	if (!context)
		throw new Error('useAddNewCardContext must be used within a AddNewCard');
	return context;
};

export const AddNewCardProvider = ({
	children,
}: {
	children: React.ReactNode;
}) => {
	const [title, setTitle] = useState<string>('');
	const [cardStatus, setCardStatus] = useState<CardStatusType>('ONGOING');
	const [cardType, setCardType] = useState<CardTypeType>('TV');

	const value = useMemo(
		() => ({
			title,
			setTitle,
			cardStatus,
			setCardStatus,
			cardType,
			setCardType,
		}),
		[title, cardStatus, cardType],
	);

	return (
		<AddNewCardContext.Provider value={value}>
			{children}
		</AddNewCardContext.Provider>
	);
};
