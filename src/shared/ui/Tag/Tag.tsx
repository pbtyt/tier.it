import clsx from 'clsx';
import { CSSProperties } from 'react';
import styles from './Tag.module.scss';

interface ITagProps {
	title: string;
	color: string;
	isCinema?: boolean;
	className?: string;
}
export function Tag({ title, color, className, isCinema = false }: ITagProps) {
	const tagBackgroundColor = {
		'--bg-c': color,
	} as CSSProperties;

	return (
		<div
			className={clsx(styles.tag, isCinema && styles.cinema, className)}
			style={tagBackgroundColor}
		>
			<div className={styles.tagTitle}>{title}</div>
		</div>
	);
}
