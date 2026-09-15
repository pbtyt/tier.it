'use client';

import { useEffectAfterMount } from '@/shared/hooks/useEffectAfterMount';
import { useOutside } from '@/shared/hooks/useOutside';
import clsx from 'clsx';
import { CSSProperties, PropsWithChildren, useEffect } from 'react';
import { DropDownItem } from '../DropDownItem/DropDownItem';
import {
	DropDownProvider,
	useDropDownContext,
} from '../DropDownProvider/DropDownProvider';
import styles from './DropDown.module.scss';

interface IDropDownProps<T> {
	initialPreview: string;
	initialData: T;
	menuTopOffset?: number;
	//TODO: Maybe onSelect Func Need Only Data Param?
	onSelect?: (ddiD: string, preview: string, data: T) => void;
	className?: string;
}

function DropDownContent<T>({
	initialPreview,
	initialData,
	menuTopOffset,

	onSelect,
	className,
	children,
}: PropsWithChildren<IDropDownProps<T>>) {
	const {
		selectedID,
		preview,
		data: dropDownItemData,
		setData,
	} = useDropDownContext<T>();
	const { isShow, ref, setIsShow } = useOutside(false);

	const menuSettings = {
		'--dd-top-offset': `${menuTopOffset ?? 0}px`,
	} as CSSProperties;

	useEffect(() => {
		setData(initialData);
		//TODO: addInitialSelectedId????
		onSelect?.(selectedID, initialPreview, initialData);
	}, []); // First Component Mount

	useEffectAfterMount(() => {
		onSelect?.(selectedID, preview, dropDownItemData);
	}, [selectedID, dropDownItemData]); // Other Component Updates

	return (
		<div
			className={clsx(styles.wrapper, className)}
			onClick={() => setIsShow(true)}
			ref={ref}
		>
			<button type='button' className={styles.button}>
				{preview || initialPreview}
			</button>
			<ul
				style={menuSettings}
				className={clsx(styles.menu, isShow && styles.opened)}
			>
				{children}
			</ul>
		</div>
	);
}

//NOTE: DO NOT MODIFY THIS
export function DropDown<T>({
	initialPreview,
	initialData,
	menuTopOffset,
	onSelect,
	className,
	children,
}: PropsWithChildren<IDropDownProps<T>>) {
	return (
		<DropDownProvider<T>>
			<DropDownContent<T>
				initialPreview={initialPreview}
				initialData={initialData}
				menuTopOffset={menuTopOffset}
				onSelect={onSelect}
				className={className}
			>
				{children}
			</DropDownContent>
		</DropDownProvider>
	);
}

DropDown.Item = DropDownItem;
