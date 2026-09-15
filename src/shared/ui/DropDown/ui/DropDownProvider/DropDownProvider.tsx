import { SetStateType } from '@/shared/utils/utilTypes';
import { createContext, useContext, useState } from 'react';

type DropDownContextType<T> = {
	selectedID: string;
	setSelectedID: SetStateType<string>;
	preview: string;
	setPreview: SetStateType<string>;
	data: T;
	setData: SetStateType<T>;
};

const DropDownContext = createContext<DropDownContextType<unknown> | undefined>(
	undefined,
);

export const useDropDownContext = <T,>() => {
	const context = useContext(DropDownContext) as DropDownContextType<T>;
	if (!context)
		throw new Error('useDropDownContext must be used within a DropDown');
	return context;
};

export const DropDownProvider = <T,>({
	children,
}: {
	children: React.ReactNode;
}) => {
	// TODO:
	// const value = useMemo(
	// 	() => ({ preview, setPreview, selectedID, setSelectedID }),
	// 	[preview, selectedID]
	//   );
	const [selectedID, setSelectedID] = useState<string>('');
	const [preview, setPreview] = useState<string>('');
	const [data, setData] = useState<T>(null!);

	const value: DropDownContextType<T> = {
		selectedID,
		setSelectedID,
		preview,
		setPreview,
		data,
		setData,
	};

	//TODO: use memo value
	return (
		<DropDownContext.Provider value={value as DropDownContextType<unknown>}>
			{children}
		</DropDownContext.Provider>
	);
};
