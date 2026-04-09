import { LucideIcon, Play, Square } from 'lucide-react';
import { ChangeEvent, CSSProperties, useId, useState } from 'react';
import styles from './ToggleButton.module.scss';

interface ToggleButtonProps {
	width?: number;
	height?: number;
	padding?: number;
	checked?: boolean;
	defaultChecked?: boolean;
	onChange?: (checked: boolean) => void;
	id?: string;
	iconRelativeSize?: number;
	IconOff?: LucideIcon;
	IconOn?: LucideIcon;
}

export function ToggleButton({
	width = 100,
	height = 50,
	padding = 3,
	iconRelativeSize = 55,
	IconOff = Play,
	IconOn = Square,
	checked: controlledChecked,
	defaultChecked = false,
	onChange,
	id: propsId,
}: ToggleButtonProps) {
	const generatedId = useId();
	const id = propsId ?? generatedId;

	const [internalChecked, setInternalChecked] = useState(defaultChecked);
	const isControlled = controlledChecked !== undefined;
	const checked = isControlled ? controlledChecked : internalChecked;

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const newChecked = e.target.checked;
		if (!isControlled) {
			setInternalChecked(newChecked);
		}
		onChange?.(newChecked);
	};

	const cssVars = {
		'--toggle-width': `${width}px`,
		'--toggle-height': `${height}px`,
		'--toggle-padding': `${padding}px`,
		'--toggle-icon-relative-size': `${iconRelativeSize}%`,
	} as CSSProperties;

	return (
		<div className={styles.toggleCont} style={cssVars}>
			<input
				className={styles.toggleInput}
				id={id}
				name='toggle'
				type='checkbox'
				checked={checked}
				onChange={handleChange}
			/>
			<label className={styles.toggleLabel} htmlFor={id}>
				<div className={styles.contLabel}>
					<IconOff className={`${styles.icon} ${styles.iconOff}`} />
					<IconOn className={`${styles.icon} ${styles.iconOn}`} />
				</div>
			</label>
		</div>
	);
}
