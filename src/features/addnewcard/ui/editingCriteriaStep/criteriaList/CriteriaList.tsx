import { type CriteriaType } from '@/entities/criteria';
import { Trash } from 'lucide-react';
import { useEditingCriteriaContext } from '../../../model/contexts/EditingCriteriaContext';
import styles from './CriteriaList.module.scss';

interface ICriteriaProps {
	criteria: CriteriaType;
}

function Criteria({ criteria }: ICriteriaProps) {
	return (
		<div className={styles.wrapper}>
			<span>{criteria.title}</span>

			<div className={styles.weightWrapper}>
				<span>{criteria.weight}</span>
			</div>
		</div>
	);
}

function CriteriaWithDeleteAction({ criteria }: ICriteriaProps) {
	return (
		<li className={styles.criteria} key={criteria.id}>
			<Criteria criteria={criteria} />
			<button
				className={styles.trashButton}
				// onClick={() => handleDeleteClick(criteria.id)}
			>
				<Trash size={16} strokeWidth={2} />
				<span>Удалить</span>
			</button>
		</li>
	);
}

//SOLID ???
export function CriteriaList() {
	const { criteria, setCriteria } = useEditingCriteriaContext();

	return (
		<>
			{criteria.length > 0 && (
				<ul className={styles.container}>
					{criteria.map(c => (
						<CriteriaWithDeleteAction criteria={c} key={c.id} />
					))}
				</ul>
			)}
		</>
	);
}
