'use client';

import clsx from 'clsx';
import {
	Children,
	cloneElement,
	isValidElement,
	PropsWithChildren,
	ReactElement,
} from 'react';
import { TabsProvider, useTabsContext } from '../model/context';
import styles from './Tabs.module.scss';

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
			className={clsx(styles.tab, isActive && styles.active, className)}
			onClick={() => setCurrentActiveTabIndex(index ?? currentActiveTabIndex)}
		>
			<span className={clsx(styles.tabText, isActive && styles.active)}>
				{title}
			</span>
		</div>
	);
}
Tab.displayName = 'Tab';

function Header({
	orientation = 'horizontal',
	className,
	children,
}: PropsWithChildren<{
	orientation: 'horizontal' | 'vertical';
	className?: string;
}>) {
	return (
		<div className={clsx(styles.tabs, styles[orientation], className)}>
			{Children.map(children, (child, index) => {
				if (!isValidElement(child)) return child;

				const isTab =
					(child.type as any).displayName === 'Tab' || child.type === Tab;

				if (isTab)
					return cloneElement(child as ReactElement<ITabProps>, {
						index,
					});

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

export function Tabs({
	orientation = 'horizontal',
	className,
	children,
}: PropsWithChildren<{
	orientation: 'horizontal' | 'vertical';
	className?: string;
}>) {
	return (
		<TabsProvider>
			<div
				className={clsx(styles.tabsMenuWrapper, styles[orientation], className)}
			>
				{children}
			</div>
		</TabsProvider>
	);
}
/*============TAB COMPONENTS============*/

// Tabs.Tab = Tab;
Tabs.Header = Header;
Tabs.Tab = Tab;
Tabs.Content = Content;
