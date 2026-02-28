'use client';

import { SetStateType } from '@/shared/utils/utilTypes';
import clsx from 'clsx';
import {
	Children,
	cloneElement,
	createContext,
	PropsWithChildren,
	ReactElement,
	useContext,
	useMemo,
	useState,
} from 'react';
import styles from './UpTabs.module.scss';

/*============TAB CONTEXT============*/
type TabsContextType = {
	currentActiveTabIndex: number;
	setCurrentActiveTabIndex: SetStateType<number>;
};
const TabsContext = createContext<TabsContextType | undefined>(undefined);

const useTabsContext = () => {
	const context = useContext(TabsContext);
	if (!context)
		throw new Error('useTabContext must be used within a TabsProvider');

	return context;
};

const TabsProvider = ({ children }: { children: React.ReactNode }) => {
	const [currentActiveTabIndex, setCurrentActiveTabIndex] = useState(0);
	const value = useMemo(
		() => ({ currentActiveTabIndex, setCurrentActiveTabIndex }),
		[currentActiveTabIndex],
	);

	return <TabsContext.Provider value={value}>{children}</TabsContext.Provider>;
};
/*============TAB CONTEXT============*/

/*============TAB COMPONENTS============*/

interface ITabProps {
	index?: number;
	title: string;
	className?: string;
}
function Tab({ index, title, className }: ITabProps) {
	const { currentActiveTabIndex, setCurrentActiveTabIndex } = useTabsContext();
	const isActive = index === currentActiveTabIndex;
	return (
		<div
			className={clsx(styles.tab, className)}
			onClick={() => setCurrentActiveTabIndex(index ?? currentActiveTabIndex)}
		>
			<span className={clsx(styles.tabText, isActive && styles.active)}>
				{title}
			</span>
		</div>
	);
}

function Header({
	className,
	children,
}: PropsWithChildren<{ className?: string }>) {
	return (
		<div className={styles.tabs}>
			{Children.map(children, (child, index) => {
				const item = child as ReactElement<PropsWithChildren<ITabProps>>;

				if (item.type === Tab) {
					return cloneElement(item, { ...item.props, index: index });
				}

				return child;
			})}
		</div>
	);
}

interface ITabContentProps {
	viewIndex: number;
	className?: string;
}
function Content({
	viewIndex,
	className,
	children,
}: PropsWithChildren<ITabContentProps>) {
	const { currentActiveTabIndex } = useTabsContext();
	const shouldRender = viewIndex === currentActiveTabIndex;
	return shouldRender && <div className={className}>{children}</div>;
}

export function UpTabs({
	className,
	children,
}: PropsWithChildren<{ className?: string }>) {
	return (
		<TabsProvider>
			<div className={clsx(styles.tabMenuWrapper, className)}>{children}</div>
		</TabsProvider>
	);
}
/*============TAB COMPONENTS============*/

// UpTabs.Tab = Tab;
UpTabs.Header = Header;
UpTabs.Tab = Tab;
UpTabs.Content = Content;
