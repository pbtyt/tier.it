import { useCreateCard } from '@/entities/card/hooks/useCreateCard';
import { Button } from '@/shared/ui/Button';
import { useAddNewCardContext } from '../../model/contexts/AddNewCardContext';
import {
	EditingCriteriaProvider,
	useEditingCriteriaContext,
} from '../../model/contexts/EditingCriteriaContext';
import { CriteriaForm } from './criteriaForm/CriteriaForm';
import { CriteriaList } from './criteriaList/CriteriaList';
import styles from './EditingCriteriaStep.module.scss';

const CreateCardButton = () => {
	const { title, cardStatus, cardType } = useAddNewCardContext();
	const { criteria } = useEditingCriteriaContext();
	const { createCard } = useCreateCard();
	return (
		<div className={styles.buttonsWrapper}>
			<Button
				buttonText='Добавить'
				buttonColor='primary'
				className={styles.button}
				onClick={() =>
					createCard({
						title: title,
						episodesNumber: 0,
						status: cardStatus,
						type: cardType,
						criteria: criteria,
					})
				}
			/>
		</div>
	);
};

export const EditingCriteriaStep = () => {
	return (
		<EditingCriteriaProvider>
			<section className={styles.section}>
				<h3 className={styles.sectionTitle}>Добавить критерии</h3>

				<EditingCriteriaStep.CriteriaForm />
			</section>

			<section className={styles.section}>
				<h3 className={styles.sectionTitle}>Список критерий</h3>

				<EditingCriteriaStep.CriteriaList />
			</section>

			<CreateCardButton />
		</EditingCriteriaProvider>
	);
};

EditingCriteriaStep.CriteriaForm = CriteriaForm;
EditingCriteriaStep.CriteriaList = CriteriaList;
