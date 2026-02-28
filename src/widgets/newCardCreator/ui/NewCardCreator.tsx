import { AddNewCard } from '@/features/addnewcard';
import styles from './NewCardCreator.module.scss';
import { Steps } from './steps/Steps';

export function NewCardCreator() {
	return (
		<div className={styles.wrapper}>
			<Steps stepNumber={1} />
			<main className={styles.main}>
				<AddNewCard />
			</main>
		</div>
	);
}
