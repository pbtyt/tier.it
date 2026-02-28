'use client';

import { CriteriaType } from '@/entities/card/model/types';
import {
	createContext,
	Dispatch,
	SetStateAction,
	useContext,
	useState,
} from 'react';

type EditingCriteriaContextType = {
	criteria: CriteriaType[];
	setCriteria: Dispatch<SetStateAction<CriteriaType[]>>;
};

const EditingCriteriaContext = createContext<
	EditingCriteriaContextType | undefined
>(undefined);

export const useEditingCriteriaContext = () => {
	const context = useContext(EditingCriteriaContext);
	if (!context)
		throw new Error(
			'useEditingCriteriaContext must be used within a EditingCriteriaProvider'
		);
	return context;
};

export const EditingCriteriaProvider = ({
	children,
}: {
	children: React.ReactNode;
}) => {
	const [criteria, setCriteria] = useState<CriteriaType[]>([]);
	return (
		<EditingCriteriaContext.Provider value={{ criteria, setCriteria }}>
			{children}
		</EditingCriteriaContext.Provider>
	);
};
