'use client';

import clsx from 'clsx';
import { createContext, ReactElement, useContext, useState } from 'react';
import { usePopover } from '../../Popover';
import styles from './Select.module.scss';

interface ISelectContextType {
	selectedValue: string;
	onSelect: (value: string, preview: string) => void;
}
const SelectContext = createContext<ISelectContextType | null>(null);

interface ISelectItemProps {
	preview: string;
	value: string;
}
function SelectItem({ preview, value }: ISelectItemProps) {
	const context = useContext(SelectContext);

	if (!context) {
		throw new Error('SelectItem Need Use Inside Select Comp.');
	}

	return (
		<li
			className={clsx(styles.item)}
			onClick={() => context.onSelect(value, preview)}
		>
			{preview}
		</li>
	);
}

//TODO: Add default value and default preview for Select
//TODO: Add Generic For Strict Values Types
interface ISelectProps {
	placeholder: string;
	name?: string;
	onSelect?: (value: string) => void;
	children: ReactElement<ISelectItemProps> | ReactElement<ISelectItemProps>[];
}
export function Select({
	placeholder,
	name,
	onSelect,
	children,
}: ISelectProps) {
	const {
		ref: parentRef,
		openPopover,
		PopoverMarkup,
	} = usePopover<HTMLButtonElement>(
		<ul className={styles.menu}>{children}</ul>,
		{ size: 'parent', topOffset: 5 },
	);

	const [selected, setSelected] = useState<{ value: string; preview: string }>({
		value: '',
		preview: '',
	});

	const handleSelect = (newValue: string, newPreview: string) => {
		setSelected({ value: newValue, preview: newPreview });
		onSelect?.(newValue);
	};

	return (
		<SelectContext.Provider
			value={{ selectedValue: selected.value, onSelect: handleSelect }}
		>
			<button className={styles.button} ref={parentRef} onClick={openPopover}>
				{selected.preview || placeholder}
				{PopoverMarkup}
			</button>
			{/* {name && <input type='hidden' name={name} value={selected.value} />*/}
		</SelectContext.Provider>
	);
}

Select.Item = SelectItem;
