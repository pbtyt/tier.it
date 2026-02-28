'use client';

import clsx from 'clsx';
import { ListPlus, Settings2 } from 'lucide-react';
import styles from './Steps.module.scss';

export function Steps({ stepNumber }: { stepNumber: number }) {
	return (
		<ul className={styles.stepsWrapper}>
			<li className={clsx(styles.step, stepNumber === 1 && styles.active)}>
				<ListPlus size={26} strokeWidth={1} />
				Добавление тайтла
			</li>
			<li className={clsx(styles.step, stepNumber === 2 && styles.active)}>
				<Settings2 size={26} strokeWidth={1.5} />
				Редактирование критерий
			</li>
		</ul>
	);
}
