'use client';

import { useCriteria } from '@/entities/criteria/hooks/useCriteria';
import { AddNewCriteriaForm } from '@/features/addNewCriteriaForm';
import { CriteriaWithActions } from '@/widgets/criteriaWithActions';
import styles from './CriteriaTab.module.scss';

export function CriteriaTab({ cardId }: { cardId: string }) {
	const { criteria } = useCriteria({ cardId: cardId });
	console.log(criteria);

	return (
		<section className={styles.wrapper}>
			{criteria?.map(c => (
				<CriteriaWithActions
					id={c.id}
					title={c.title}
					weight={c.weight}
					key={c.id}
				/>
			))}
			<AddNewCriteriaForm cardId={cardId} />
		</section>
	);
}
