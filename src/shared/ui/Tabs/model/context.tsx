import { type SetStateType } from '@/shared/utils/utilTypes';
import { createContext, useContext, useMemo, useState } from 'react';

/*============TAB CONTEXT============*/
type TabsContextType = {
	currentActiveTabIndex: number;
	setCurrentActiveTabIndex: SetStateType<number>;
};
const TabsContext = createContext<TabsContextType | null>(null);

export const useTabsContext = () => {
	const context = useContext(TabsContext);
	if (!context)
		throw new Error('useTabContext must be used within a TabsProvider');

	return context;
};

export const TabsProvider = ({ children }: { children: React.ReactNode }) => {
	const [currentActiveTabIndex, setCurrentActiveTabIndex] = useState(0);
	const value = useMemo(
		() => ({ currentActiveTabIndex, setCurrentActiveTabIndex }),
		[currentActiveTabIndex],
	);

	return <TabsContext.Provider value={value}>{children}</TabsContext.Provider>;
};
/*============TAB CONTEXT============*/
