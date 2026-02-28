import { CustomProgressBar } from '@/shared/ui/CustomProgressBar';
import styles from './Criteria.module.scss';

interface ICriteriaProps {
	title: string;
	weight: number;
}

//TODO: MB REMOVE?
export function Criteria({ title, weight }: ICriteriaProps) {
	return (
		<div className={styles.wrapper}>
			<span className={styles.title}>{title}</span>
			<CustomProgressBar percentage={weight} />
		</div>
	);
}
